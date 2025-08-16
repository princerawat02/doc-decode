import {
  FileText,
  Search,
  Brain,
  MessageSquare,
  Shield,
  Download,
  ArrowRight,
} from 'lucide-react';

export default function FeaturesSection() {
  return (
    <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Everything You Need to Understand Legal Documents
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Our AI-powered platform provides comprehensive analysis tools to
            make legal documents accessible and understandable for everyone.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Document Summarization */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-100">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Document Summarization
            </h3>
            <p className="text-slate-600 mb-4">
              Get a concise, plain-language summary of entire legal documents in
              seconds.
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
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Clause-by-Clause Analysis
            </h3>
            <p className="text-slate-600 mb-4">
              Click any section to get an AI breakdown of what it means and its
              implications.
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
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Legal Jargon Dictionary
            </h3>
            <p className="text-slate-600 mb-4">
              Hover or click on legal terms for instant definitions and
              explanations.
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
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              AI-Powered Q&A
            </h3>
            <p className="text-slate-600 mb-4">
              Ask questions like &quot;What is my liability?&quot; and get
              answers directly from your document.
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
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Risk Assessment
            </h3>
            <p className="text-slate-600 mb-4">
              Color-coded clause flags (red/yellow/green) to quickly identify
              risks and obligations.
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
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Export & Share
            </h3>
            <p className="text-slate-600 mb-4">
              Save your analysis as PDF and share insights with your team or
              legal counsel.
            </p>
            <div className="flex items-center text-teal-600 font-medium">
              <span>Learn more</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
