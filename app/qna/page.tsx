'use client';

import { useState, useRef, useEffect } from 'react';
import { FileText, Send, MessageSquare, Lightbulb, ArrowLeft, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';
import Link from 'next/link';
import Navigation from '../../components/Navigation';

interface Message {
  id: number;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  isStreaming?: boolean; // New property to track streaming state
}

export default function QnaPage() {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'ai',
      content: 'Hello! I\'m your AI assistant powered by Google Cloud Vertex AI. I can help you understand your documents, answer questions, and provide insights. What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Ref to track if we're currently streaming
  const isStreamingRef = useRef(false);

  // Document context - this would come from your document processing
  const documentContext = `Employment Agreement between Company XYZ and John Smith
  Position: Senior Software Engineer
  Duration: 12 months
  Key terms include confidentiality clauses, non-compete restrictions, intellectual property assignment, and standard employment obligations.`;

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
    if (!question.trim() || isStreamingRef.current) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: question,
      timestamp: new Date()
    };

    // Add user message to chat
    setMessages(prev => [...prev, userMessage]);
    setQuestion('');
    setIsLoading(true);

    // Create initial AI message placeholder for streaming
    const aiMessageId = messages.length + 2;
    const initialAiMessage: Message = {
      id: aiMessageId,
      type: 'ai',
      content: '',
      timestamp: new Date(),
      isStreaming: true
    };

    // Add AI message placeholder
    setMessages(prev => [...prev, initialAiMessage]);

    try {
      // Start streaming request
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: question,
          documentContext: documentContext,
          chatHistory: messages.slice(-5) // Send last 5 messages for context
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Check if response is streamable
      if (!response.body) {
        throw new Error('Response body is not available for streaming');
      }

      // Set streaming flag
      isStreamingRef.current = true;

      // Get the reader from the response body
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedContent = '';

      try {
        while (true) {
          const { done, value } = await reader.read();
          
          if (done) {
            break;
          }

          // Decode the chunk and process it
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6); // Remove 'data: ' prefix
              
              if (data === '[DONE]') {
                // Streaming completed
                break;
              }

              try {
                const parsed = JSON.parse(data);
                
                if (parsed.error) {
                  throw new Error(parsed.error);
                }

                if (parsed.chunk) {
                  // Accumulate the content
                  accumulatedContent += parsed.chunk;
                  
                  // Update the AI message with accumulated content
                  setMessages(prev => prev.map(msg => 
                    msg.id === aiMessageId 
                      ? { ...msg, content: accumulatedContent }
                      : msg
                  ));
                }
              } catch (parseError) {
                console.warn('Failed to parse chunk:', parseError);
              }
            }
          }
        }
      } finally {
        reader.releaseLock();
      }

      // Mark streaming as complete
      setMessages(prev => prev.map(msg => 
        msg.id === aiMessageId 
          ? { ...msg, isStreaming: false }
          : msg
      ));

    } catch (error) {
      console.error('Chat API Error:', error);
      
      // Remove the streaming message and add error message
      setMessages(prev => prev.filter(msg => msg.id !== aiMessageId));
      
      const fallbackResponse: Message = {
        id: aiMessageId,
        type: 'ai',
        content: 'I apologize, but I\'m experiencing technical difficulties right now. Please try again in a moment, or contact support if the issue persists.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, fallbackResponse]);
    } finally {
      setIsLoading(false);
      isStreamingRef.current = false;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // Auto-scroll to bottom when new messages arrive
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />

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
                    <h2 className="text-lg font-semibold text-slate-900">AI Document Assistant</h2>
                    <p className="text-sm text-slate-600">Powered by Google Cloud Vertex AI (Streaming)</p>
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
                      <div className="whitespace-pre-wrap">
                        {message.content}
                        {/* Show typing indicator for streaming messages */}
                        {message.isStreaming && (
                          <span className="inline-block w-2 h-4 bg-blue-500 ml-1 animate-pulse"></span>
                        )}
                      </div>
                      <div className={`flex items-center justify-between mt-2 text-xs ${
                        message.type === 'user' ? 'text-blue-100' : 'text-slate-500'
                      }`}>
                        <span>{message.timestamp.toLocaleTimeString()}</span>
                        {message.type === 'ai' && !message.isStreaming && (
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
                
                {/* Loading indicator for initial request */}
                {isLoading && !messages.some(msg => msg.isStreaming) && (
                  <div className="flex justify-start">
                    <div className="bg-slate-100 text-slate-900 p-4 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                        <span>AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Invisible div for auto-scrolling */}
                <div ref={messagesEndRef} />
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
                    disabled={isLoading || isStreamingRef.current}
                  />
                  <button
                    type="submit"
                    disabled={!question.trim() || isLoading || isStreamingRef.current}
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
                    disabled={isStreamingRef.current}
                    className="w-full text-left p-3 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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

            {/* AI Status */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-3">🤖 AI Status</h3>
              <div className="space-y-2 text-sm text-green-800">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Vertex AI Connected</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Gemini 1.5 Pro Active</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Streaming Enabled</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Document Context Loaded</span>
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
                <li>• Watch responses appear in real-time!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
