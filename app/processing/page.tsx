'use client';

import { useState, useEffect } from 'react';
import { FileText, Brain, Search, Shield, MessageSquare, CheckCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Navigation from '../../components/Navigation';

export default function ProcessingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const steps = [
    {
      title: 'Extracting Text',
      description: 'Reading and extracting text from your document',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      title: 'AI Analysis',
      description: 'Analyzing document structure and content',
      icon: Brain,
      color: 'text-purple-600'
    },
    {
      title: 'Identifying Clauses',
      description: 'Breaking down into sections and clauses',
      icon: Search,
      color: 'text-green-600'
    },
    {
      title: 'Risk Assessment',
      description: 'Evaluating risks and obligations',
      icon: Shield,
      color: 'text-red-600'
    },
    {
      title: 'Generating Insights',
      description: 'Creating summaries and explanations',
      icon: MessageSquare,
      color: 'text-orange-600'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setIsComplete(true);
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < steps.length - 1 && progress > (prev + 1) * 20) {
          return prev + 1;
        }
        return prev;
      });
    }, 500);

    return () => clearInterval(stepInterval);
  }, [progress, steps.length]);

  useEffect(() => {
    if (isComplete) {
      // Auto-navigate to summary page after 2 seconds
      const timer = setTimeout(() => {
        window.location.href = '/summary';
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation currentStep={2} totalSteps={4} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Analyzing Your Document
          </h1>
          <p className="text-xl text-slate-600">
            Our AI is processing your document to extract insights and generate analysis
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-8 mb-8">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-slate-700">Progress</span>
              <span className="text-sm font-medium text-slate-700">{progress}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Processing Steps */}
          <div className="space-y-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              const isPending = index > currentStep;

              return (
                <div 
                  key={index}
                  className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-300 ${
                    isActive ? 'bg-blue-50 border border-blue-200' : 
                    isCompleted ? 'bg-green-50 border border-green-200' :
                    'bg-slate-50 border border-slate-200'
                  }`}
                >
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    isActive ? 'bg-blue-600' :
                    isCompleted ? 'bg-green-600' :
                    'bg-slate-300'
                  }`}>
                    {isActive ? (
                      <Loader2 className="w-5 h-5 text-white animate-spin" />
                    ) : isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-white" />
                    ) : (
                      <Icon className={`w-5 h-5 ${step.color}`} />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${
                      isActive ? 'text-blue-900' :
                      isCompleted ? 'text-green-900' :
                      'text-slate-700'
                    }`}>
                      {step.title}
                    </h3>
                    <p className={`text-sm ${
                      isActive ? 'text-blue-700' :
                      isCompleted ? 'text-green-700' :
                      'text-slate-500'
                    }`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Status Message */}
        <div className="text-center">
          {isComplete ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-900 mb-2">
                Analysis Complete!
              </h3>
              <p className="text-green-700">
                Redirecting to your document summary...
              </p>
            </div>
          ) : (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <Loader2 className="w-8 h-8 text-blue-600 mx-auto mb-4 animate-spin" />
              <p className="text-blue-700">
                Please wait while we process your document. This usually takes 30-60 seconds.
              </p>
            </div>
          )}
        </div>

        {/* Estimated Time */}
        {!isComplete && (
          <div className="mt-8 text-center text-sm text-slate-500">
            <p>Estimated time remaining: {Math.max(0, Math.ceil((100 - progress) / 2))} seconds</p>
          </div>
        )}
      </div>
    </div>
  );
}
