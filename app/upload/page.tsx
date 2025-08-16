'use client';

<<<<<<< HEAD
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
=======
import { useState } from 'react';
import { Upload, FileText, X, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import Navigation from '../../components/Navigation';

export default function UploadPage() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const newFiles = Array.from(files).filter(file => 
      file.type === 'application/pdf' || 
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.type === 'text/plain'
    );
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (uploadedFiles.length === 0) return;
    
    setUploading(true);
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setUploading(false);
    
    // Navigate to processing page
    window.location.href = '/processing';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation currentStep={1} totalSteps={4} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Upload Your Document
          </h1>
          <p className="text-xl text-slate-600">
            Upload your legal document to get started with AI-powered analysis
          </p>
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-xl border-2 border-dashed border-slate-300 p-8 mb-8">
          <div
            className={`relative ${dragActive ? 'border-blue-500 bg-blue-50' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              multiple
              accept=".pdf,.docx,.txt"
              onChange={handleChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="text-center">
              <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Drop your files here or click to browse
              </h3>
              <p className="text-slate-600 mb-4">
                Supports PDF, DOCX, and TXT files up to 10MB each
              </p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Choose Files
              </button>
            </div>
          </div>
        </div>

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="bg-white rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Uploaded Files ({uploadedFiles.length})
            </h3>
            <div className="space-y-3">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-slate-900">{file.name}</p>
                      <p className="text-sm text-slate-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Button */}
        <div className="text-center">
          <button
            onClick={handleUpload}
            disabled={uploadedFiles.length === 0 || uploading}
            className={`px-8 py-4 rounded-lg text-lg font-semibold transition-colors flex items-center mx-auto ${
              uploadedFiles.length === 0 || uploading
                ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                Continue to Analysis
                <CheckCircle className="w-5 h-5 ml-2" />
              </>
            )}
          </button>
        </div>

        {/* Supported Formats */}
        <div className="mt-8 text-center">
          <h4 className="font-semibold text-slate-900 mb-2">Supported Formats</h4>
          <div className="flex justify-center space-x-6 text-sm text-slate-600">
            <div className="flex items-center">
              <FileText className="w-4 h-4 mr-1" />
              PDF Documents
            </div>
            <div className="flex items-center">
              <FileText className="w-4 h-4 mr-1" />
              Word Documents
            </div>
            <div className="flex items-center">
              <FileText className="w-4 h-4 mr-1" />
              Text Files
            </div>
          </div>
        </div>
      </div>
    </div>
>>>>>>> 62594c064dd62872b224bab74da57f2ca0c9f30b
  );
}
