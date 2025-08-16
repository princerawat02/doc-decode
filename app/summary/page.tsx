'use client';

import { useState } from 'react';
import { FileText, Download, Share2, MessageSquare, AlertTriangle, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Navigation from '../../components/Navigation';

export default function SummaryPage() {
  const [activeTab, setActiveTab] = useState('summary');

  // Mock data - in real app this would come from API
  const documentData = {
    title: 'Employment Agreement - John Smith',
    type: 'Employment Contract',
    summary: 'This is a standard employment agreement between Company XYZ and John Smith for the position of Senior Software Engineer. The contract includes standard terms for compensation, benefits, intellectual property rights, and termination clauses.',
    keyPoints: [
      '12-month contract with option to renew',
      'Annual salary of $120,000 with performance bonuses',
      'Standard benefits package including health insurance',
      'Non-compete clause for 12 months post-termination',
      'Intellectual property assignment to company'
    ],
    risks: [
      {
        level: 'high',
        title: 'Non-compete Clause',
        description: 'Restricts employment opportunities for 12 months after termination',
        clause: 'Section 8.2 - Non-Competition'
      },
      {
        level: 'medium',
        title: 'Intellectual Property Assignment',
        description: 'All work-related IP belongs to company, even if created outside work hours',
        clause: 'Section 6.1 - IP Assignment'
      }
    ],
    obligations: [
      {
        title: 'Confidentiality',
        description: 'Must maintain confidentiality of company information',
        deadline: 'Ongoing'
      },
      {
        title: 'Notice Period',
        description: '30 days notice required for resignation',
        deadline: 'Upon resignation'
      }
    ]
  };

  const tabs = [
    { id: 'summary', label: 'Summary', icon: FileText },
    { id: 'risks', label: 'Risks', icon: AlertTriangle },
    { id: 'obligations', label: 'Obligations', icon: CheckCircle }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation currentStep={3} totalSteps={4} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl p-6 mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                {documentData.title}
              </h1>
              <p className="text-slate-600">{documentData.type}</p>
            </div>
            <div className="flex space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                <Download className="w-4 h-4" />
                <span>Export PDF</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl">
              {/* Tabs */}
              <div className="border-b border-slate-200">
                <div className="flex space-x-8 px-6">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 py-4 border-b-2 font-medium transition-colors ${
                          activeTab === tab.id
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'summary' && (
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900 mb-4">Document Summary</h2>
                    <p className="text-slate-700 mb-6 leading-relaxed">
                      {documentData.summary}
                    </p>
                    
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">Key Points</h3>
                    <ul className="space-y-2 mb-6">
                      {documentData.keyPoints.map((point, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-slate-700">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'risks' && (
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900 mb-4">Risk Assessment</h2>
                    <div className="space-y-4">
                      {documentData.risks.map((risk, index) => (
                        <div key={index} className="border border-red-200 rounded-lg p-4 bg-red-50">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-red-900">{risk.title}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              risk.level === 'high' ? 'bg-red-100 text-red-800' :
                              risk.level === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {risk.level.toUpperCase()} RISK
                            </span>
                          </div>
                          <p className="text-red-700 mb-2">{risk.description}</p>
                          <p className="text-sm text-red-600">Clause: {risk.clause}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'obligations' && (
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900 mb-4">Your Obligations</h2>
                    <div className="space-y-4">
                      {documentData.obligations.map((obligation, index) => (
                        <div key={index} className="border border-green-200 rounded-lg p-4 bg-green-50">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-green-900">{obligation.title}</h3>
                            <div className="flex items-center space-x-1 text-sm text-green-600">
                              <Clock className="w-4 h-4" />
                              <span>{obligation.deadline}</span>
                            </div>
                          </div>
                          <p className="text-green-700">{obligation.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link href="/qna" className="flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-900">Ask Questions</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-blue-600" />
                </Link>
                <button className="w-full flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Download className="w-5 h-5 text-slate-600" />
                    <span className="font-medium text-slate-900">Download Report</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600" />
                </button>
              </div>
            </div>

            {/* Document Stats */}
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Document Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Pages</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Sections</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">High Risk Items</span>
                  <span className="font-medium text-red-600">2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Obligations</span>
                  <span className="font-medium text-green-600">3</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Step */}
        <div className="mt-8 text-center">
          <Link href="/qna" className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
            <MessageSquare className="w-5 h-5" />
            <span>Ask Questions About Your Document</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
