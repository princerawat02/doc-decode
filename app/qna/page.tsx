'use client';

import { useState } from 'react';
import { FileText, Send, MessageSquare, Lightbulb, ArrowLeft, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';
import Link from 'next/link';
import Navigation from '../../components/Navigation';

export default function QnaPage() {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Hello! I\'ve analyzed your employment agreement. I can help you understand any part of the document, explain specific clauses, assess risks, or answer questions about your obligations. What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // Suggested questions
  const suggestedQuestions = [
    'What are my main obligations in this contract?',
    'What happens if I want to terminate early?',
    'What are the non-compete restrictions?',
    'What intellectual property rights do I have?',
    'What is the notice period for resignation?',
    'What benefits am I entitled to?'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user' as const,
      content: question,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setQuestion('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: 'ai' as const,
        content: generateAIResponse(question),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (userQuestion: string) => {
    const responses = {
      'obligations': 'Based on your employment agreement, your main obligations include:\n\n1. **Confidentiality**: You must maintain confidentiality of company information during and after employment\n2. **Notice Period**: 30 days written notice required for resignation\n3. **Intellectual Property**: All work-related IP must be assigned to the company\n4. **Non-compete**: 12-month restriction on competing businesses after termination\n5. **Duties**: Perform assigned duties to the best of your ability',
      'termination': 'Regarding early termination:\n\n- **Employee-initiated**: 30 days written notice required\n- **Company-initiated**: Can terminate with cause immediately, or with 2 weeks notice without cause\n- **Severance**: No severance pay unless specified in company policy\n- **Final Pay**: All outstanding compensation paid within 30 days\n- **Return of Property**: Must return all company property and materials',
      'non-compete': 'The non-compete clause (Section 8.2) includes:\n\n- **Duration**: 12 months after termination\n- **Geographic Scope**: Within 50 miles of company locations\n- **Restricted Activities**: Cannot work for competing businesses or start competing business\n- **Penalties**: Legal action and damages for violations\n- **Exceptions**: May be unenforceable in some jurisdictions',
      'intellectual property': 'IP rights under your agreement:\n\n- **Assignment**: All work-related IP belongs to company\n- **Scope**: Includes inventions, software, processes created during employment\n- **Ownership**: Company owns IP even if created outside work hours if related to business\n- **Disclosure**: Must disclose all IP to company\n- **Compensation**: No additional compensation for IP assignment',
      'notice period': 'The notice period requirements:\n\n- **Duration**: 30 days written notice\n- **Format**: Must be in writing and delivered to HR\n- **Timing**: Notice period begins from date of delivery\n- **Duties**: Continue normal duties during notice period\n- **Consequences**: Failure to provide notice may affect references',
      'benefits': 'Your benefits package includes:\n\n- **Health Insurance**: Comprehensive medical, dental, vision coverage\n- **Retirement**: 401(k) with company match up to 4%\n- **PTO**: 20 days paid time off annually\n- **Holidays**: 10 paid holidays per year\n- **Professional Development**: $2,000 annual budget for courses/certifications'
    };

    const questionLower = userQuestion.toLowerCase();
    if (questionLower.includes('obligation')) return responses.obligations;
    if (questionLower.includes('terminat')) return responses.termination;
    if (questionLower.includes('non-compete') || questionLower.includes('compete')) return responses['non-compete'];
    if (questionLower.includes('intellectual') || questionLower.includes('ip')) return responses['intellectual property'];
    if (questionLower.includes('notice')) return responses['notice period'];
    if (questionLower.includes('benefit')) return responses.benefits;

    return 'I understand your question about the employment agreement. Let me provide you with a detailed analysis based on the specific clauses in your document. Could you please clarify which aspect you\'d like me to focus on?';
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation currentStep={4} totalSteps={4} showBackButton={true} backHref="/summary" backLabel="Back to Summary" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">Document Q&A</h2>
                    <p className="text-sm text-slate-600">Ask questions about your employment agreement</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-900'
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{message.content}</div>
                      <div className={`flex items-center justify-between mt-2 text-xs ${
                        message.type === 'user' ? 'text-blue-100' : 'text-slate-500'
                      }`}>
                        <span>{message.timestamp.toLocaleTimeString()}</span>
                        {message.type === 'ai' && (
                          <div className="flex items-center space-x-2">
                            <button className="hover:text-blue-600 transition-colors">
                              <ThumbsUp className="w-3 h-3" />
                            </button>
                            <button className="hover:text-red-600 transition-colors">
                              <ThumbsDown className="w-3 h-3" />
                            </button>
                            <button 
                              onClick={() => copyToClipboard(message.content)}
                              className="hover:text-blue-600 transition-colors"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-100 text-slate-900 p-4 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                        <span>AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Form */}
              <div className="p-6 border-t border-slate-200">
                <form onSubmit={handleSubmit} className="flex space-x-3">
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask a question about your document..."
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={!question.trim() || isLoading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Suggested Questions */}
            <div className="bg-white rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Lightbulb className="w-5 h-5 text-yellow-600" />
                <h3 className="text-lg font-semibold text-slate-900">Suggested Questions</h3>
              </div>
              <div className="space-y-2">
                {suggestedQuestions.map((suggestedQuestion, index) => (
                  <button
                    key={index}
                    onClick={() => setQuestion(suggestedQuestion)}
                    className="w-full text-left p-3 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    {suggestedQuestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Document Context */}
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Document Context</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Document Type</span>
                  <span className="font-medium">Employment Agreement</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Parties</span>
                  <span className="font-medium">Company XYZ & John Smith</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Position</span>
                  <span className="font-medium">Senior Software Engineer</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Duration</span>
                  <span className="font-medium">12 months</span>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 Tips</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• Ask specific questions about clauses</li>
                <li>• Request clarification on legal terms</li>
                <li>• Ask about your rights and obligations</li>
                <li>• Get explanations of complex sections</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
