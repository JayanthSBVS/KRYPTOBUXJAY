import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import TickerSection from '@/components/landing/TickerSection';
import HowItWorks from '@/components/landing/HowItWorks';
import StatsSection from '@/components/landing/StatsSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import DashboardPreview from '@/components/landing/DashboardPreview';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-body-bg text-white overflow-x-hidden font-sans">
      <Navbar />
      <HeroSection />
      <TickerSection />
      <HowItWorks />
      <StatsSection />
      <FeaturesSection />
      <DashboardPreview />
      <CTASection />
      <Footer />
    </div>
  );
}
