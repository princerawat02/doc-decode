'use client';

import { useEffect, useState } from 'react';

import Navigation from '../../components/Navigation';

export default function SummaryPage() {
  const [extractedText, setExtractedText] = useState<string | null>(null);

  useEffect(() => {
    const text = localStorage.getItem('extractedText');
    setExtractedText(text);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Extracted Text
          </h2>
          <div className="text-slate-700 mb-6 leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded border min-h-[120px]">
            {extractedText || 'No extracted text found.'}
          </div>
        </div>
      </div>
    </div>
  );
}
