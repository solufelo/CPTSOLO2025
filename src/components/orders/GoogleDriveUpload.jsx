/**
 * Google Drive Upload Component
 * Allows users to select files from Google Drive and upload them
 */

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { loadGooglePicker, openGooglePicker, downloadAndUploadFromDrive } from '../../lib/googleDrive';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const GoogleDriveUpload = ({ onFilesUploaded, maxFiles = 10 }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pickerLoaded, setPickerLoaded] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    if (GOOGLE_CLIENT_ID && GOOGLE_API_KEY) {
      loadGooglePicker(() => {
        setPickerLoaded(true);
      });
    }
  }, []);

  const handleGoogleAuth = async () => {
    try {
      setLoading(true);
      setError(null);

      // Use Google Identity Services for OAuth
      // This is the new recommended approach
      if (!window.google || !window.google.accounts) {
        // Load Google Identity Services
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.onload = () => {
          initializeGoogleAuth();
        };
        document.head.appendChild(script);
      } else {
        initializeGoogleAuth();
      }
    } catch (err) {
      console.error('Google auth error:', err);
      setError('Failed to authenticate with Google');
      setLoading(false);
    }
  };

  const initializeGoogleAuth = () => {
    window.google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: 'https://www.googleapis.com/auth/drive.readonly',
      callback: (tokenResponse) => {
        setAccessToken(tokenResponse.access_token);
        setLoading(false);
        openFilePicker();
      },
    }).requestAccessToken();
  };

  const openFilePicker = () => {
    if (!pickerLoaded) {
      setError('Google Picker not loaded. Please try again.');
      return;
    }

    if (!accessToken) {
      handleGoogleAuth();
      return;
    }

    openGooglePicker(async (file) => {
      try {
        setLoading(true);
        setError(null);

        // Download file from Drive and upload to Supabase
        const uploadedFile = await downloadAndUploadFromDrive(
          file.id,
          file.name,
          accessToken,
          supabase
        );

        const newFiles = [...uploadedFiles, uploadedFile];
        setUploadedFiles(newFiles);
        
        if (onFilesUploaded) {
          onFilesUploaded(newFiles);
        }

        setLoading(false);
      } catch (err) {
        console.error('Upload error:', err);
        setError(err.message || 'Failed to upload file from Google Drive');
        setLoading(false);
      }
    }, accessToken);
  };

  const removeFile = (index) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
    if (onFilesUploaded) {
      onFilesUploaded(newFiles);
    }
  };

  if (!GOOGLE_CLIENT_ID || !GOOGLE_API_KEY) {
    return (
      <div className="bg-SageGray/10 border border-SageGray/30 rounded p-4">
        <p className="text-sm text-SageGray">
          Google Drive integration not configured
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={openFilePicker}
        disabled={loading}
        className="w-full border-2 border-dashed border-SageGray/30 rounded-lg p-6 text-center
                 hover:border-gold transition-colors cursor-pointer
                 bg-primary/5 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gold"></div>
            <span className="text-primary">Uploading...</span>
          </div>
        ) : (
          <>
            <div className="text-4xl mb-2">☁️</div>
            <p className="text-primary font-medium mb-1">
              Upload from Google Drive
            </p>
            <p className="text-xs text-SageGray">
              Select files from your Google Drive
            </p>
          </>
        )}
      </button>

      {error && (
        <div className="bg-red-500/20 border border-red-500/50 text-red-400 rounded p-3 text-sm">
          {error}
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-primary font-medium">
            Files from Google Drive ({uploadedFiles.length}):
          </p>
          {uploadedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-primary/5 border border-SageGray/30 rounded p-3"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm text-primary truncate">{file.fileName}</p>
                <p className="text-xs text-SageGray">
                  {file.fileType} • {(file.fileSize / 1024).toFixed(2)} KB
                </p>
              </div>
              <button
                onClick={() => removeFile(index)}
                className="ml-4 text-red-400 hover:text-red-300 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GoogleDriveUpload;

