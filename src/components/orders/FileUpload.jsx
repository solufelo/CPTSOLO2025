/**
 * File Upload Component
 * Handles file uploads to Supabase Storage
 * Alternative: Can integrate Google Drive API here
 */

import { useState, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import GoogleDriveUpload from './GoogleDriveUpload';

const FileUpload = ({ onFilesUploaded, maxFiles = 10, maxSizeMB = 50, accept = '*/*' }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    
    // Validate file count
    if (files.length + selectedFiles.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed`);
      return;
    }

    // Validate file sizes
    const oversizedFiles = selectedFiles.filter(
      (file) => file.size > maxSizeMB * 1024 * 1024
    );

    if (oversizedFiles.length > 0) {
      setError(`Some files exceed ${maxSizeMB}MB limit`);
      return;
    }

    setFiles([...files, ...selectedFiles]);
    setError(null);
    if (onFilesUploaded) {
      onFilesUploaded([...files, ...selectedFiles]);
    }
  };

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    if (onFilesUploaded) {
      onFilesUploaded(newFiles);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-SageGray/30 rounded-lg p-8 text-center
                 hover:border-gold transition-colors cursor-pointer
                 bg-primary/5"
      >
          <input
            ref={fileInputRef}
            type="file"
            multiple={maxFiles > 1}
            onChange={handleFileSelect}
            className="hidden"
            accept={accept}
          />
        <div className="text-4xl mb-2">📁</div>
        <p className="text-primary font-medium mb-1">
          Click to upload files
        </p>
        <p className="text-xs text-SageGray">
          Max {maxFiles} files, {maxSizeMB}MB per file
        </p>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500/50 text-red-400 rounded p-3 text-sm">
          {error}
        </div>
      )}

      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-primary font-medium">
            Selected Files ({files.length}):
          </p>
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-primary/5 border border-SageGray/30 rounded p-3"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm text-primary truncate">{file.name}</p>
                <p className="text-xs text-SageGray">{formatFileSize(file.size)}</p>
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

      {/* Google Drive Integration Option */}
      <div className="mt-4 pt-4 border-t border-SageGray/30">
        <p className="text-xs text-SageGray mb-3 text-center">Or</p>
        <GoogleDriveUpload
          onFilesUploaded={(driveFiles) => {
            // Merge Google Drive files with regular files
            const allFiles = [...files, ...driveFiles.map(f => ({
              name: f.fileName,
              size: f.fileSize,
              type: f.fileType,
              url: f.fileUrl,
            }))];
            setFiles(allFiles);
            if (onFilesUploaded) {
              onFilesUploaded(allFiles);
            }
          }}
          maxFiles={maxFiles - files.length}
        />
      </div>
    </div>
  );
};

export default FileUpload;

