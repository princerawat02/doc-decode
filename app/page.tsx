<<<<<<< HEAD
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorksSection from '../components/HowItWorksSection';
import CTASection from '../components/CTASection';
import Navigation from '../components/Navigation';
=======
import { 
  FileText, 
  Brain, 
  Search, 
  Shield, 
  Upload, 
  Eye, 
  MessageSquare, 
  Download,
  CheckCircle,
  ArrowRight,
  Star,
  Users,
  Zap
} from 'lucide-react';
import Link from 'next/link';
>>>>>>> 62594c064dd62872b224bab74da57f2ca0c9f30b

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
<<<<<<< HEAD
      <Navigation />

      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
=======
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">DocDecode</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#how-it-works" className="text-slate-600 hover:text-blue-600 transition-colors">How it Works</a>
              <Link href="/upload" className="text-slate-600 hover:text-blue-600 transition-colors">Upload</Link>
              <Link href="/processing" className="text-slate-600 hover:text-blue-600 transition-colors">Processing</Link>
              <Link href="/summary" className="text-slate-600 hover:text-blue-600 transition-colors">Summary</Link>
              <Link href="/qna" className="text-slate-600 hover:text-blue-600 transition-colors">Q&A</Link>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-slate-600 hover:text-blue-600 transition-colors">Sign In</button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
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
            Transform complex legal documents into clear, understandable insights. Get instant summaries, 
            clause explanations, risk assessments, and AI-powered Q&A for any legal document.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/upload" className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center">
              Upload Document
              <Upload className="w-5 h-5 ml-2" />
            </Link>
            <button className="border border-slate-300 text-slate-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-slate-50 transition-colors flex items-center">
              Watch Demo
              <Eye className="w-5 h-5 ml-2" />
            </button>
          </div>
          
          {/* Trust Indicators */}
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

      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Everything You Need to Understand Legal Documents
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our AI-powered platform provides comprehensive analysis tools to make legal documents 
              accessible and understandable for everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Document Summarization */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-100">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Document Summarization</h3>
              <p className="text-slate-600 mb-4">
                Get a concise, plain-language summary of entire legal documents in seconds.
              </p>
              <div className="flex items-center text-blue-600 font-medium">
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>

            {/* Clause-by-Clause Explanation */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-xl border border-green-100">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-6">
                <Search className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Clause-by-Clause Analysis</h3>
              <p className="text-slate-600 mb-4">
                Click any section to get an AI breakdown of what it means and its implications.
              </p>
              <div className="flex items-center text-green-600 font-medium">
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>

            {/* Legal Jargon Dictionary */}
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-8 rounded-xl border border-purple-100">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-6">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Legal Jargon Dictionary</h3>
              <p className="text-slate-600 mb-4">
                Hover or click on legal terms for instant definitions and explanations.
              </p>
              <div className="flex items-center text-purple-600 font-medium">
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>

            {/* AI-Powered Q&A */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-8 rounded-xl border border-orange-100">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-6">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">AI-Powered Q&A</h3>
              <p className="text-slate-600 mb-4">
                Ask questions like "What is my liability?" and get answers directly from your document.
              </p>
              <div className="flex items-center text-orange-600 font-medium">
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>

            {/* Risk & Obligation Highlighting */}
            <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-xl border border-red-100">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Risk Assessment</h3>
              <p className="text-slate-600 mb-4">
                Color-coded clause flags (red/yellow/green) to quickly identify risks and obligations.
              </p>
              <div className="flex items-center text-red-600 font-medium">
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>

            {/* Export as PDF */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-8 rounded-xl border border-teal-100">
              <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mb-6">
                <Download className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Export & Share</h3>
              <p className="text-slate-600 mb-4">
                Save your analysis as PDF and share insights with your team or legal counsel.
              </p>
              <div className="flex items-center text-teal-600 font-medium">
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Upload Your Document</h3>
              <p className="text-slate-600">
                Upload any legal document in PDF, DOCX, or TXT format. Our OCR technology handles scanned documents too.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">AI Analysis</h3>
              <p className="text-slate-600">
                Our AI processes your document, breaking it down into sections and identifying key terms and clauses.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Get Insights</h3>
              <p className="text-slate-600">
                Receive instant summaries, explanations, and risk assessments. Ask questions and get answers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Decode Your Legal Documents?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who trust DocDecode to understand their legal documents.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/upload" className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-slate-100 transition-colors">
              Start Free Trial
            </Link>
            <button className="border border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>
>>>>>>> 62594c064dd62872b224bab74da57f2ca0c9f30b

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-4 text-center">
        <span>&copy; 2024 DocDecode. All rights reserved.</span>
      </footer>
    </div>
  );
}
