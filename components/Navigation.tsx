import Link from 'next/link';
import { FileText } from 'lucide-react';

export default function Navigation() {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">DocDecode</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="text-slate-600 hover:text-blue-600 transition-colors font-semibold"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
