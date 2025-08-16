import Link from 'next/link';
import { FileText } from 'lucide-react';

<<<<<<< HEAD
export default function Navigation() {
=======
interface NavigationProps {
  currentStep?: number;
  totalSteps?: number;
  showBackButton?: boolean;
  backHref?: string;
  backLabel?: string;
}

export default function Navigation({ 
  currentStep, 
  totalSteps, 
  showBackButton = false, 
  backHref = '/', 
  backLabel = 'Back' 
}: NavigationProps) {
>>>>>>> 62594c064dd62872b224bab74da57f2ca0c9f30b
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
<<<<<<< HEAD
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
=======
          
                     <div className="hidden md:flex items-center space-x-8">
             <Link href="/upload" className="text-slate-600 hover:text-blue-600 transition-colors">Upload</Link>
             <Link href="/processing" className="text-slate-600 hover:text-blue-600 transition-colors">Processing</Link>
             <Link href="/summary" className="text-slate-600 hover:text-blue-600 transition-colors">Summary</Link>
             <Link href="/qna" className="text-slate-600 hover:text-blue-600 transition-colors">Q&A</Link>
           </div>
           
           <div className="flex items-center space-x-4">
             {showBackButton && (
               <Link href={backHref} className="flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-colors">
                 <span>{backLabel}</span>
               </Link>
             )}
             {currentStep && totalSteps && (
               <span className="text-slate-600">Step {currentStep} of {totalSteps}</span>
             )}
           </div>
>>>>>>> 62594c064dd62872b224bab74da57f2ca0c9f30b
        </div>
      </div>
    </nav>
  );
}
