import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorksSection from '../components/HowItWorksSection';
import CTASection from '../components/CTASection';
import Navigation from '../components/Navigation';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />

      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-4 text-center">
        <span>&copy; 2024 DocDecode. All rights reserved.</span>
      </footer>
    </div>
  );
}
