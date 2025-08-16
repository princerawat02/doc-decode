'use client';

import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function FileUploadBox() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [extracting, setExtracting] = useState(false);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExtractedText(null);
    setError(null);
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Only allow pdf, jpg, jpeg, png
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!allowedTypes.includes(selectedFile.type)) {
      alert('Only PDF, JPG, and PNG files are allowed.');
      return;
    }

    setFile(selectedFile);

    // Fake upload progress for demo
    let uploaded = 0;
    setProgress(0);
    const interval = setInterval(() => {
      uploaded += 10;
      if (uploaded >= 100) {
        setProgress(100);
        clearInterval(interval);
      } else {
        setProgress(uploaded);
      }
    }, 100);
  };

  const removeFile = () => {
    setFile(null);
    setProgress(0);
    setExtractedText(null);
    setError(null);
  };

  const handleExtract = async () => {
    if (!file) return;
    setExtracting(true);
    setExtractedText(null);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/extract', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to extract text');
      const data = await res.json();
      setExtractedText(data.text || 'No text found.');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Extraction failed');
      } else {
        setError('Extraction failed');
      }
    } finally {
      setExtracting(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto p-6 rounded-2xl shadow-lg">
      <CardContent>
        {!file ? (
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-10 cursor-pointer hover:border-blue-500 transition"
          >
            <Upload className="w-10 h-10 text-gray-400 mb-2" />
            <p className="text-gray-600">
              Drag and drop file here or{' '}
              <span className="text-blue-600 underline">Choose file</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Supported: PDF, JPG, PNG (max 25MB)
            </p>
            <input
              id="file-upload"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center border rounded-lg p-3 bg-gray-50">
              <div>
                <p className="font-medium text-gray-800">{file.name}</p>
                <p className="text-xs text-gray-500">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <button
                onClick={removeFile}
                className="text-gray-500 hover:text-red-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={removeFile}
                disabled={extracting}
              >
                Cancel
              </Button>
              <Button
                disabled={progress < 100 || extracting}
                onClick={handleExtract}
              >
                {extracting ? 'Extracting...' : 'Next'}
              </Button>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {extractedText && (
              <textarea
                className="w-full mt-4 border rounded p-2 text-sm"
                rows={8}
                value={extractedText}
                readOnly
              />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
