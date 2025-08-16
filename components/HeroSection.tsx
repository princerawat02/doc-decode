import Link from 'next/link';
import { Zap, Upload, Eye, CheckCircle } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-8">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
            <Zap className="w-4 h-4 mr-2" />
            AI-Powered Legal Analysis
          </span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
          Decode Legal Documents
          <span className="text-blue-600 block">in Seconds</span>
        </h1>
        <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
          Transform complex legal documents into clear, understandable insights.
          Get instant summaries, clause explanations, risk assessments, and
          AI-powered Q&A for any legal document.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link
            href="/upload"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center"
          >
            Upload Document
            <Upload className="w-5 h-5 ml-2" />
          </Link>
          <button className="border border-slate-300 text-slate-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-slate-50 transition-colors flex items-center">
            Watch Demo
            <Eye className="w-5 h-5 ml-2" />
          </button>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-slate-500">
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
            Secure & Confidential
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
            Supports PDF, DOCX, TXT
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
            Instant Results
          </div>
        </div>
      </div>
    </section>
  );
}
