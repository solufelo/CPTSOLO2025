/**
 * Google Drive API Integration
 * Handles file uploads to Google Drive
 * 
 * Setup:
 * 1. Google Cloud Console: Enable Google Drive API
 * 2. Create OAuth 2.0 credentials
 * 3. Add credentials to .env.local
 * 4. Set authorized redirect URIs
 * 
 * NOTE: This uses client-side Google APIs only (no Node.js packages)
 */

// Client-side only - no Node.js packages
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

/**
 * Initialize Google Auth
 */
export const initGoogleAuth = () => {
  if (!GOOGLE_CLIENT_ID || !GOOGLE_API_KEY) {
    console.warn('Google Drive API credentials not configured');
    return null;
  }

  return {
    clientId: GOOGLE_CLIENT_ID,
    apiKey: GOOGLE_API_KEY,
  };
};

/**
 * Google Picker API - Let users select files from their Google Drive
 * This is the recommended approach for file selection
 */
export const loadGooglePicker = (callback) => {
  if (window.gapi && window.google && window.google.picker) {
    callback();
    return;
  }

  // Load Google APIs
  const script = document.createElement('script');
  script.src = 'https://apis.google.com/js/api.js';
  script.onload = () => {
    window.gapi.load('picker', callback);
  };
  document.head.appendChild(script);
};

/**
 * Open Google Picker to select files
 */
export const openGooglePicker = (onPicked, accessToken) => {
  if (!window.google || !window.google.picker) {
    console.error('Google Picker not loaded');
    return;
  }

  const picker = new window.google.picker.PickerBuilder()
    .addView(window.google.picker.ViewId.DOCS)
    .addView(window.google.picker.ViewId.DOCS_IMAGES)
    .addView(window.google.picker.ViewId.VIDEOS)
    .addView(window.google.picker.ViewId.AUDIO)
    .setOAuthToken(accessToken)
    .setCallback((data) => {
      if (data[window.google.picker.Response.ACTION] === window.google.picker.Action.PICKED) {
        const file = data[window.google.picker.Response.DOCUMENTS][0];
        onPicked(file);
      }
    })
    .build();
  
  picker.setVisible(true);
};

/**
 * Download file from Google Drive and upload to Supabase
 * This converts Google Drive files to Supabase storage
 */
export const downloadAndUploadFromDrive = async (fileId, fileName, accessToken, supabaseClient) => {
  try {
    // Download file from Google Drive
    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to download file from Google Drive');
    }

    const blob = await response.blob();
    const file = new File([blob], fileName, { type: blob.type });

    // Upload to Supabase Storage
    const userId = (await supabaseClient.auth.getUser()).data.user?.id;
    if (!userId) {
      throw new Error('User not authenticated');
    }

    const filePath = `${userId}/${Date.now()}-${fileName}`;
    const { data, error } = await supabaseClient.storage
      .from('order-files')
      .upload(filePath, file);

    if (error) {
      throw error;
    }

    // Get public URL
    const { data: { publicUrl } } = supabaseClient.storage
      .from('order-files')
      .getPublicUrl(filePath);

    return {
      fileName,
      fileUrl: publicUrl,
      fileType: blob.type,
      fileSize: blob.size,
    };
  } catch (error) {
    console.error('Error downloading from Google Drive:', error);
    throw error;
  }
};

/**
 * Get file metadata from Google Drive
 */
export const getDriveFileMetadata = async (fileId, accessToken) => {
  const response = await fetch(
    `https://www.googleapis.com/drive/v3/files/${fileId}?fields=id,name,mimeType,size,webViewLink`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to get file metadata');
  }

  return await response.json();
};

/**
 * Alternative: Direct upload to Google Drive (requires service account)
 * This would upload files directly to your Google Drive folder
 */
export const uploadToGoogleDrive = async (file, folderId, accessToken) => {
  const metadata = {
    name: file.name,
    parents: folderId ? [folderId] : [],
  };

  const form = new FormData();
  form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
  form.append('file', file);

  const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: form,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to upload to Google Drive');
  }

  return await response.json();
};

export default {
  initGoogleAuth,
  loadGooglePicker,
  openGooglePicker,
  downloadAndUploadFromDrive,
  getDriveFileMetadata,
  uploadToGoogleDrive,
};

