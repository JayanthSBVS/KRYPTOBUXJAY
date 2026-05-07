import React, { useState, useEffect, useRef } from 'react';
import { useAuthModalStore } from '@/store/useAuthModalStore';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { Icon } from '@iconify/react';
import Marquee from 'react-fast-marquee';
import Tilt from 'react-parallax-tilt';

// --- MAGNETIC BUTTON COMPONENT ---
const MagneticButton = ({ children, className, onClick, type = "button" }) => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = buttonRef.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.button>
  );
};

// --- DYNAMIC CURSOR BLOB HOOK ---
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  useEffect(() => {
    const updateMousePosition = ev => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);
  return mousePosition;
};

// --- MOCK PAYOUT DATA ---
const MOCK_PAYOUTS = [
  { id: 1, user: 'a***@gmail.com', amount: '0.005 BTC', time: 'Just now', icon: 'ion:logo-bitcoin', color: 'text-yellow-400' },
  { id: 2, user: 'j***@yahoo.com', amount: '50.00 USDT', time: '2 mins ago', icon: 'ion:cash-outline', color: 'text-green-400' },
  { id: 3, user: 'k***@proton.me', amount: '1.2 SOL', time: '5 mins ago', icon: 'ion:flash-outline', color: 'text-purple-400' },
  { id: 4, user: 'm***@gmail.com', amount: '$10 Amazon', time: '12 mins ago', icon: 'ion:gift', color: 'text-orange-400' },
  { id: 5, user: 'z***@hotmail.com', amount: '0.1 ETH', time: '15 mins ago', icon: 'ion:diamond', color: 'text-blue-400' },
];

const LandingPage = () => {
  const { openModal } = useAuthModalStore();
  const [emailInput, setEmailInput] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mousePosition = useMousePosition();

  const handleClaim = (e) => {
    e.preventDefault();
    openModal('REGISTER', emailInput);
  };

  const { ref: statsRef, inView: statsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Parallax Scroll Hooks
  const { scrollY } = useScroll();
  const heroTextY = useTransform(scrollY, [0, 500], [0, -100]);
  const heroVisualsY = useTransform(scrollY, [0, 500], [0, -50]);

  return (
    <div className="min-h-screen bg-body-bg font-sans overflow-x-hidden text-white relative selection:bg-primary selection:text-white">
      
      {/* Dynamic Cursor Blob */}
      {mousePosition.x !== null && mousePosition.y !== null && (
        <motion.div
          animate={{ x: mousePosition.x - 200, y: mousePosition.y - 200 }}
          transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
          className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px] pointer-events-none z-0"
        />
      )}

      {/* 1. Sticky Navbar */}
      <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-body-bg/80 border-b border-border/50 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div 
              className="flex items-center gap-2 cursor-pointer z-10 group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="w-10 h-10 bg-gradient-to-tr from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform duration-300">
                <Icon icon="ion:diamond-outline" className="text-2xl text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white group-hover:text-primary transition-colors duration-300">
                KRYPTO<span className="text-primary group-hover:text-white transition-colors">BUX</span>
              </span>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-4 z-10">
              <div className="hidden md:flex items-center gap-4">
                <MagneticButton 
                  onClick={() => openModal('LOGIN')}
                  className="px-6 py-2.5 rounded-lg text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/5 transition border border-transparent hover:border-white/10"
                >
                  Sign In
                </MagneticButton>
                <MagneticButton 
                  onClick={() => openModal('REGISTER')}
                  className="px-6 py-2.5 rounded-lg text-sm font-bold text-white bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(189,36,223,0.3)] hover:shadow-[0_0_25px_rgba(189,36,223,0.5)] transition-all"
                >
                  Start Earning
                </MagneticButton>
              </div>

              {/* Mobile Menu Toggle */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-white hover:text-primary transition-colors"
              >
                <Icon icon={isMobileMenuOpen ? "ion:close" : "ion:menu"} className="text-3xl" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-20 left-0 w-full bg-body-bg border-b border-border p-6 flex flex-col gap-4 md:hidden shadow-2xl z-50"
            >
              <button 
                onClick={() => { openModal('LOGIN'); setIsMobileMenuOpen(false); }}
                className="w-full py-4 rounded-xl text-center font-bold border border-border hover:bg-white/5 transition"
              >
                Sign In
              </button>
              <button 
                onClick={() => { openModal('REGISTER'); setIsMobileMenuOpen(false); }}
                className="w-full py-4 rounded-xl text-center font-bold bg-primary text-white shadow-lg shadow-primary/20"
              >
                Start Earning
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 2. Hero Section */}
      <main className="relative pt-20 pb-20 sm:pt-32 sm:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
            
            {/* Left Content (Parallaxed) */}
            <motion.div 
              style={{ y: heroTextY }}
              className="lg:col-span-6 text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <span className="inline-flex items-center gap-2 py-1.5 px-3 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-primary mb-6">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Instant FaucetPay Integration
                </span>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-8 leading-[1.1]">
                  Turn Your Time Into <br className="hidden sm:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary">
                    Crypto & Vouchers
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Earn points by completing surveys, playing games, and testing apps. Withdraw instantly to FaucetPay or as premium gift cards.
                </p>

                {/* Lead Capture */}
                <form onSubmit={handleClaim} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto lg:mx-0">
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Icon icon="ion:mail-outline" className="text-gray-400 text-xl" />
                    </div>
                    <input
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      required
                      placeholder="Enter your email address"
                      className="block w-full pl-11 pr-4 py-4 rounded-xl bg-darkmode/50 border border-border backdrop-blur-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition shadow-inner"
                    />
                  </div>
                  <MagneticButton
                    type="submit"
                    className="flex-shrink-0 px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-primary to-purple-600 hover:from-primary hover:to-purple-500 transition-all shadow-lg hover:shadow-primary/25 whitespace-nowrap"
                  >
                    Claim Account
                  </MagneticButton>
                </form>

              </motion.div>
            </motion.div>

            {/* Right Visuals - Floating Elements (Parallaxed) */}
            <motion.div 
              style={{ y: heroVisualsY }}
              className="hidden lg:block lg:col-span-6 relative h-[600px] w-full mt-16 lg:mt-0"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Main Abstract Shape */}
                <motion.div 
                  animate={{ y: [-15, 15, -15], rotate: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  className="relative w-80 h-80 z-20"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-[3rem] rotate-12 opacity-80 blur-md"></div>
                  <div className="absolute inset-0 bg-darkmode border border-white/10 rounded-[3rem] rotate-12 flex items-center justify-center shadow-2xl backdrop-blur-xl">
                    <Icon icon="ion:wallet" className="text-8xl text-white opacity-90" />
                  </div>
                </motion.div>

                {/* Floating Coin 1 */}
                <motion.div 
                  animate={{ y: [-10, 20, -10], x: [-5, 10, -5], rotate: [0, 180, 360] }}
                  transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                  className="absolute top-[15%] right-[10%] w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full border-4 border-yellow-200 shadow-[0_0_30px_rgba(250,204,21,0.5)] z-30 flex items-center justify-center"
                >
                  <Icon icon="ion:logo-bitcoin" className="text-5xl text-white" />
                </motion.div>

                {/* Floating Gift Box */}
                <motion.div 
                  animate={{ y: [15, -15, 15], rotate: [-10, 10, -10] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-[20%] left-[5%] w-28 h-28 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl border border-white/20 shadow-[0_0_30px_rgba(168,85,247,0.4)] z-30 flex items-center justify-center"
                >
                  <Icon icon="ion:gift" className="text-5xl text-white" />
                </motion.div>
                
                {/* Floating Tether */}
                <motion.div 
                  animate={{ y: [-20, 10, -20] }}
                  transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 0.5 }}
                  className="absolute bottom-[10%] right-[20%] w-20 h-20 bg-green-500 rounded-full border-2 border-green-300 shadow-[0_0_20px_rgba(34,197,94,0.4)] z-10 flex items-center justify-center"
                >
                  <span className="text-3xl font-bold text-white">₮</span>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </main>

      {/* 3. Interactive Payment Proofs (Live Ticker) */}
      <section className="py-10 border-y border-border/50 bg-body-bg overflow-hidden relative z-10">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-body-bg to-transparent z-20 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-body-bg to-transparent z-20 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <h3 className="text-sm font-bold text-gray-400 tracking-wider uppercase">Live Payouts</h3>
        </div>

        <Marquee pauseOnHover={true} speed={40} gradient={false} className="py-4">
          {MOCK_PAYOUTS.map((payout, idx) => (
            <Tilt key={`${payout.id}-${idx}`} scale={1.05} transitionSpeed={2500} tiltMaxAngleX={15} tiltMaxAngleY={15}>
              <div className="mx-4 bg-darkmode border border-border rounded-xl p-4 flex items-center gap-4 min-w-[250px] shadow-lg cursor-pointer hover:border-primary/50 transition-colors">
                <div className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center ${payout.color}`}>
                  <Icon icon={payout.icon} className="text-2xl" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white flex items-center gap-2">
                    <span className="animate-pulse drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">{payout.amount}</span>
                  </p>
                  <p className="text-xs text-gray-500">{payout.user} • {payout.time}</p>
                </div>
              </div>
            </Tilt>
          ))}
          {/* Duplicate for seamless infinite feel */}
          {MOCK_PAYOUTS.map((payout, idx) => (
            <Tilt key={`dup-${payout.id}-${idx}`} scale={1.05} transitionSpeed={2500} tiltMaxAngleX={15} tiltMaxAngleY={15}>
              <div className="mx-4 bg-darkmode border border-border rounded-xl p-4 flex items-center gap-4 min-w-[250px] shadow-lg cursor-pointer hover:border-primary/50 transition-colors">
                <div className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center ${payout.color}`}>
                  <Icon icon={payout.icon} className="text-2xl" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white flex items-center gap-2">
                    <span className="animate-pulse drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">{payout.amount}</span>
                  </p>
                  <p className="text-xs text-gray-500">{payout.user} • {payout.time}</p>
                </div>
              </div>
            </Tilt>
          ))}
        </Marquee>
      </section>

      {/* 4. The "How It Works" Loop (Staggered Grid) */}
      <section className="py-32 bg-darkmode/30 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">Three Steps To Earnings</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">Get started in under a minute. No complex verifications, just pure rewards.</p>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.2 } }
            }}
            className="grid md:grid-cols-3 gap-8"
          >
            {/* Card 1 */}
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
              className="bg-body-bg border border-border p-8 rounded-2xl transition-all duration-300 hover:border-primary/50 hover:shadow-[0_20px_50px_-20px_rgba(189,36,223,0.3)] group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition group-hover:scale-110 duration-300">
                  <Icon icon="ion:person-add-outline" className="text-3xl text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">1. Register Free</h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Create a free account in seconds. No KYC required to start earning immediately.
                </p>
                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-in-out">
                  <div className="overflow-hidden">
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 pt-4">
                      <button onClick={() => openModal('REGISTER')} className="text-primary font-bold flex items-center gap-2 hover:text-white transition">
                        Create Account <Icon icon="ion:arrow-forward" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
              className="bg-body-bg border border-border p-8 rounded-2xl transition-all duration-300 hover:border-secondary/50 hover:shadow-[0_20px_50px_-20px_rgba(45,106,222,0.3)] group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-primary to-secondary text-xs font-bold px-3 py-1 rounded-full shadow-lg z-20">
                Most Popular
              </div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition group-hover:scale-110 duration-300">
                  <Icon icon="ion:game-controller-outline" className="text-3xl text-secondary" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">2. Earn Points</h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Access top offerwalls. Complete surveys, watch videos, and download apps to earn internal Bux points.
                </p>
                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-in-out">
                  <div className="overflow-hidden">
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 pt-4">
                      <button onClick={() => openModal('REGISTER')} className="text-secondary font-bold flex items-center gap-2 hover:text-white transition">
                        View Offers <Icon icon="ion:arrow-forward" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
              className="bg-body-bg border border-border p-8 rounded-2xl transition-all duration-300 hover:border-green-500/50 hover:shadow-[0_20px_50px_-20px_rgba(34,197,94,0.3)] group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-500/20 transition group-hover:scale-110 duration-300">
                  <Icon icon="ion:card-outline" className="text-3xl text-green-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">3. Redeem Instantly</h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Convert points to Crypto via FaucetPay or choose from hundreds of premium Vouchers instantly.
                </p>
                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-in-out">
                  <div className="overflow-hidden">
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 pt-4">
                      <button onClick={() => openModal('REGISTER')} className="text-green-400 font-bold flex items-center gap-2 hover:text-white transition">
                        View Rewards <Icon icon="ion:arrow-forward" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 5. Live Platform Stats */}
      <section ref={statsRef} className="py-24 relative overflow-hidden z-10 border-t border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-border">
            
            <div className="py-6 md:py-0 px-4">
              <div className="text-4xl md:text-5xl font-black text-white mb-2 font-mono flex justify-center items-center">
                {statsInView ? <CountUp end={1240} duration={2.5} separator="," /> : '0'}
                <span className="text-primary ml-1">+</span>
              </div>
              <p className="text-gray-400 font-medium tracking-wide uppercase text-sm">Tasks Available</p>
            </div>

            <div className="py-6 md:py-0 px-4">
              <div className="text-4xl md:text-5xl font-black text-white mb-2 font-mono flex justify-center items-center">
                {statsInView ? <CountUp end={45892} duration={2.5} separator="," /> : '0'}
                <span className="text-secondary ml-1">+</span>
              </div>
              <p className="text-gray-400 font-medium tracking-wide uppercase text-sm">Total Registered Users</p>
            </div>

            <div className="py-6 md:py-0 px-4">
              <div className="text-4xl md:text-5xl font-black text-white mb-2 font-mono flex justify-center items-center">
                <span className="text-green-400 mr-2">{"<"}</span>
                {statsInView ? <CountUp end={5} duration={2.5} /> : '0'}
              </div>
              <p className="text-gray-400 font-medium tracking-wide uppercase text-sm">Average Withdrawal (Mins)</p>
            </div>

          </div>
        </div>
      </section>

      {/* Footer Minimal */}
      <footer className="py-8 border-t border-border text-center text-gray-500 text-sm bg-body-bg relative z-10">
        <p>&copy; {new Date().getFullYear()} KRYPTOBUX. All rights reserved.</p>
      </footer>

    </div>
  );
};

export default LandingPage;
