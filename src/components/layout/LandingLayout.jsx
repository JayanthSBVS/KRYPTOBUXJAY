import { Outlet } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import ScrollToTop from '../scroll-to-top';
import Aoscompo from '@/lib/utils/aos';

// LandingLayout: used for public-facing pages (landing page, docs)
// Includes Header so visitors can click Sign In / Start Earning
export default function LandingLayout() {
  return (
    <Aoscompo>
      <Header />
      <Outlet />
      <Footer />
      <ScrollToTop />
    </Aoscompo>
  );
}
