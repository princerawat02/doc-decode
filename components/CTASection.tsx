import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          Ready to Decode Your Legal Documents?
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Join thousands of professionals who trust DocDecode to understand
          their legal documents.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/upload"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-slate-100 transition-colors"
          >
            Start Free Trial
          </Link>
          <button className="border border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
            Schedule Demo
          </button>
        </div>
      </div>
    </section>
  );
}
