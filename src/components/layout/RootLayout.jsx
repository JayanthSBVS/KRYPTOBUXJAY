import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../layout/header';
import Footer from '../layout/footer';
import ScrollToTop from '../scroll-to-top';
import Aoscompo from '@/lib/utils/aos';

export default function RootLayout() {
  return (
    <Aoscompo>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </Aoscompo>
  );
}
