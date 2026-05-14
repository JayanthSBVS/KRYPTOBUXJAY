import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useAuthModalStore } from '@/store/useAuthModalStore';
import { Icon } from '@iconify/react';

const COINS = [
  { icon: 'ion:logo-bitcoin', color: '#F7931A', glow: 'rgba(247,147,26,0.5)', label: 'BTC', top: '12%', right: '8%', size: 'w-20 h-20', delay: 0 },
  { icon: 'ion:diamond', color: '#627EEA', glow: 'rgba(98,126,234,0.5)', label: 'ETH', top: '60%', right: '4%', size: 'w-16 h-16', delay: 1.2 },
  { icon: 'ion:flash', color: '#9945FF', glow: 'rgba(153,69,255,0.5)', label: 'SOL', top: '30%', left: '2%', size: 'w-14 h-14', delay: 0.6 },
  { icon: 'ion:cash', color: '#26A17B', glow: 'rgba(38,161,123,0.5)', label: 'USDT', bottom: '25%', left: '6%', size: 'w-16 h-16', delay: 1.8 },
];

const STATS = [
  { label: 'Total Paid Out', value: '$2.4M+', icon: 'ion:wallet-outline', color: '#bd24df' },
  { label: 'Active Users', value: '45K+', icon: 'ion:people-outline', color: '#2d6ade' },
  { label: 'Avg Withdrawal', value: '<5 min', icon: 'ion:flash-outline', color: '#F7931A' },
];

export default function HeroSection() {
  const { openModal } = useAuthModalStore();
  const [email, setEmail] = useState('');
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, -120]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const handle = (e) => {
      setMouse({ x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 });
    };
    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    openModal('REGISTER', email);
  };

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-body-bg">

      {/* --- Background layers --- */}
      <div className="absolute inset-0 bg-grid opacity-100 pointer-events-none" />
      <div className="absolute inset-0 hero-glow-bg pointer-events-none" />

      {/* Mouse-reactive glow orb */}
      <motion.div
        animate={{ x: mouse.x * 60, y: mouse.y * 60 }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(189,36,223,0.12) 0%, rgba(45,106,222,0.08) 50%, transparent 70%)' }}
      />

      {/* Pulse rings */}
      {[0, 0.8, 1.6].map((delay, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: 1.8, opacity: 0 }}
          transition={{ duration: 3, delay, repeat: Infinity, ease: 'easeOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-primary/20 pointer-events-none"
        />
      ))}

      {/* Floating coins */}
      {COINS.map((coin) => (
        <motion.div
          key={coin.label}
          animate={{ y: [-12, 12, -12], rotate: [-4, 4, -4] }}
          transition={{ duration: 5 + coin.delay, repeat: Infinity, ease: 'easeInOut', delay: coin.delay }}
          className={`absolute ${coin.size} hidden lg:flex items-center justify-center rounded-2xl glass-card z-10`}
          style={{ top: coin.top, right: coin.right, left: coin.left, bottom: coin.bottom, boxShadow: `0 0 30px ${coin.glow}` }}
        >
          <Icon icon={coin.icon} style={{ color: coin.color, fontSize: '2rem' }} />
        </motion.div>
      ))}

      {/* --- Main content --- */}
      <div className="container relative z-10 pt-28 pb-20">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-4xl mx-auto text-center">

          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 text-sm font-semibold text-primary mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            FaucetPay Integrated · Instant Withdrawals
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16,1,0.3,1] }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[1.05] mb-8"
          >
            Earn Crypto{' '}
            <span className="gradient-text block sm:inline">Smarter.</span>
            <br className="hidden sm:block" />
            <span className="text-white/90 text-4xl sm:text-5xl lg:text-6xl">Get Paid Faster.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-xl text-lightblue max-w-2xl mx-auto leading-relaxed mb-12"
          >
            The next-generation crypto rewards ecosystem. Complete tasks, earn points, withdraw
            instantly to your FaucetPay wallet or redeem premium gift cards.
          </motion.p>

          {/* CTA form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-8"
          >
            <div className="relative flex-1">
              <Icon icon="ion:mail-outline" className="absolute left-4 top-1/2 -translate-y-1/2 text-lightblue text-xl" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full pl-11 pr-4 py-4 rounded-2xl bg-darkmode/80 border border-border text-white placeholder-lightblue/60 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all text-sm"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(189,36,223,0.5)' }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="gradient-btn px-8 py-4 rounded-2xl font-bold text-white text-sm shadow-[0_0_25px_rgba(189,36,223,0.35)] whitespace-nowrap"
            >
              Start Earning Free →
            </motion.button>
          </motion.form>

          {/* Social proof line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-2 text-sm text-lightblue mb-20"
          >
            <div className="flex -space-x-2">
              {['#bd24df','#2d6ade','#F7931A','#26A17B','#9945FF'].map((c, i) => (
                <div key={i} className="w-7 h-7 rounded-full border-2 border-body-bg" style={{ background: c }} />
              ))}
            </div>
            <span><strong className="text-white">45,000+</strong> users already earning crypto daily</span>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                whileHover={{ scale: 1.03, y: -4 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="glass-card rounded-2xl p-5 flex items-center gap-4 text-left"
                style={{ borderColor: `${s.color}25` }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${s.color}20` }}>
                  <Icon icon={s.icon} style={{ color: s.color, fontSize: '1.5rem' }} />
                </div>
                <div>
                  <div className="text-2xl font-black text-white">{s.value}</div>
                  <div className="text-xs text-lightblue font-medium mt-0.5">{s.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-body-bg to-transparent pointer-events-none" />
    </section>
  );
}
