import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useAuthModalStore } from '@/store/useAuthModalStore';
import { Icon } from '@iconify/react';

export default function Navbar() {
  const { openModal } = useAuthModalStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 50));

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={scrolled ? {
        background: 'rgba(4, 13, 38, 0.85)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(9, 25, 69, 0.8)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      } : {}}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 rounded-xl blur-sm opacity-70" style={{ background: 'linear-gradient(135deg, #bd24df, #2d6ade)' }} />
              <div className="relative w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #bd24df, #2d6ade)' }}>
                <Icon icon="ion:diamond" className="text-white text-lg" />
              </div>
            </div>
            <span className="text-xl font-black tracking-tight text-white">
              KRYPTO<span className="gradient-text">BUX</span>
            </span>
          </motion.div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openModal('LOGIN')}
              className="px-5 py-2.5 text-sm font-semibold text-lightblue hover:text-white transition-colors rounded-xl border border-transparent hover:border-border hover:bg-white/5"
            >
              Sign In
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(189,36,223,0.55)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => openModal('REGISTER')}
              className="px-5 py-2.5 text-sm font-bold text-white rounded-xl transition-all"
              style={{ background: 'linear-gradient(135deg, #bd24df, #2d6ade)', boxShadow: '0 0 20px rgba(189,36,223,0.3)' }}
            >
              Start Earning →
            </motion.button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobile(!mobile)}
            className="md:hidden p-2 text-lightblue hover:text-white transition-colors"
          >
            <Icon icon={mobile ? 'ion:close' : 'ion:menu'} className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden"
            style={{ background: 'rgba(4, 13, 38, 0.98)', backdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(9,25,69,0.8)' }}
          >
            <div className="px-4 py-6 flex flex-col gap-3">
              <button
                onClick={() => { openModal('LOGIN'); setMobile(false); }}
                className="w-full py-4 rounded-2xl font-bold border border-border text-lightblue hover:text-white hover:bg-white/5 transition"
              >
                Sign In
              </button>
              <button
                onClick={() => { openModal('REGISTER'); setMobile(false); }}
                className="w-full py-4 rounded-2xl font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #bd24df, #2d6ade)', boxShadow: '0 0 24px rgba(189,36,223,0.35)' }}
              >
                Start Earning →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
