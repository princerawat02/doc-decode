export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50"
    >
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
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Upload Your Document
            </h3>
            <p className="text-slate-600">
              Upload any legal document in PDF, DOCX, or TXT format. Our OCR
              technology handles scanned documents too.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-white">2</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              AI Analysis
            </h3>
            <p className="text-slate-600">
              Our AI processes your document, breaking it down into sections and
              identifying key terms and clauses.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-white">3</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Get Insights
            </h3>
            <p className="text-slate-600">
              Receive instant summaries, explanations, and risk assessments. Ask
              questions and get answers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
