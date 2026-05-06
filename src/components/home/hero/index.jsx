import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAuthModalStore } from "@/store/useAuthModalStore";
import { getImagePath } from "@/lib/utils/imagePath";

// Floating coin component
const FloatingCoin = ({ src, alt, size, style, delay = 0 }) => (
  <motion.div
    style={style}
    animate={{ y: [0, -18, 0], rotate: [0, 5, -5, 0] }}
    transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    className="absolute"
  >
    <img src={src} alt={alt} width={size} height={size} className="drop-shadow-2xl" />
  </motion.div>
);

// Stat item for the stats strip
const StatItem = ({ end, suffix, prefix, label, icon, inView }) => (
  <div className="flex flex-col items-center gap-1 px-6 py-4 relative group">
    <div className="flex items-center gap-2 mb-1">
      <Icon icon={icon} className="text-primary text-xl" />
      <span className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        {inView ? (
          <CountUp start={0} end={end} duration={2.5} separator="," prefix={prefix || ""} suffix={suffix || ""} />
        ) : (
          <span>{prefix}{0}{suffix}</span>
        )}
      </span>
    </div>
    <span className="text-lightblue text-sm font-medium text-center">{label}</span>
    {/* Divider (not on last) */}
    <div className="absolute right-0 top-1/4 h-1/2 w-px bg-border hidden md:block last:hidden" />
  </div>
);

const LandingHero = () => {
  const [heroEmail, setHeroEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { openRegister, openLogin } = useAuthModalStore();
  const controls = useAnimation();
  const { ref: statsRef, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const handleHeroSubmit = (e) => {
    e.preventDefault();
    if (!heroEmail || !/\S+@\S+\.\S+/.test(heroEmail)) {
      setEmailError("Enter a valid email address.");
      return;
    }
    setEmailError("");
    setSubmitted(true);
    openRegister(heroEmail);
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  const tickerWords = ["Bitcoin", "Ethereum", "Solana", "XRP", "Cardano", "Avalanche", "Polygon", "Chainlink"];

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-0" id="home-section">
        {/* Animated background blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.18, 0.28, 0.18] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-primary blur-[140px]"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.12, 0.22, 0.12] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[10%] right-[-5%] w-[420px] h-[420px] rounded-full bg-secondary blur-[120px]"
          />
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.08, 0.15, 0.08] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            className="absolute top-[40%] left-[40%] w-[300px] h-[300px] rounded-full bg-primary blur-[100px]"
          />
        </div>

        {/* Scrolling ticker */}
        <div className="absolute top-[88px] left-0 right-0 overflow-hidden border-y border-white/5 py-2 bg-white/[0.02] backdrop-blur-sm">
          <motion.div
            animate={{ x: [0, -1200] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex gap-8 whitespace-nowrap"
          >
            {[...tickerWords, ...tickerWords, ...tickerWords].map((w, i) => (
              <span key={i} className="flex items-center gap-2 text-white/30 text-xs font-mono uppercase tracking-widest">
                <span className="text-primary">◆</span> {w}
              </span>
            ))}
          </motion.div>
        </div>

        <div className="container relative z-10 mt-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-6"
          >
            {/* LEFT COLUMN */}
            <div className="lg:col-span-6 flex flex-col">
              {/* Badge */}
              <motion.div variants={itemVariants} className="mb-6 inline-flex">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  #1 Crypto Earning Platform
                  <Icon icon="tabler:arrow-up-right" className="text-base" />
                </span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-6 tracking-tight">
                Earn Real{" "}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-primary via-purple-400 to-secondary bg-clip-text text-transparent">
                    Rewards.
                  </span>
                  <motion.span
                    className="absolute -bottom-2 left-0 h-[3px] bg-gradient-to-r from-primary to-secondary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.9, duration: 0.7 }}
                  />
                </span>
                <br />
                <span className="text-white">Zero Investment.</span>
              </motion.h1>

              {/* Sub-headline */}
              <motion.p variants={itemVariants} className="text-lightblue text-lg leading-relaxed mb-8 max-w-lg">
                Trade, earn, and grow your crypto portfolio on the fastest, most secure platform.
                Join <span className="text-white font-semibold">124,000+</span> active earners today — 100% free to start.
              </motion.p>

              {/* Email capture */}
              <motion.form
                variants={itemVariants}
                onSubmit={handleHeroSubmit}
                className="flex flex-col sm:flex-row gap-3 mb-4 max-w-lg"
              >
                <div className="flex-1 relative">
                  <Icon icon="tabler:mail" className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-lg pointer-events-none" />
                  <input
                    type="email"
                    placeholder="Enter your email — it's free"
                    value={heroEmail}
                    onChange={(e) => { setHeroEmail(e.target.value); setEmailError(""); setSubmitted(false); }}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-white/20 bg-white/5 text-white placeholder:text-white/40 outline-none focus:border-primary focus:bg-white/10 transition-all text-sm backdrop-blur-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="whitespace-nowrap px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-primary/50 cursor-pointer flex items-center gap-2"
                >
                  <Icon icon="tabler:rocket" className="text-lg" />
                  Start Earning
                </button>
              </motion.form>

              {emailError && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-xs mb-3 -mt-2">
                  {emailError}
                </motion.p>
              )}

              <AnimatePresence>
                {submitted && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-green-400 text-xs mb-3 -mt-2 flex items-center gap-1"
                  >
                    <Icon icon="tabler:circle-check" /> Opening registration with your email...
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Trust row */}
              <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-5 text-sm text-white/50">
                <div className="flex items-center gap-1.5">
                  <Icon icon="tabler:shield-check" className="text-green-400 text-base" />
                  <span>Bank-grade Security</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Icon icon="tabler:lock" className="text-primary text-base" />
                  <span>No credit card needed</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Icon icon="tabler:bolt" className="text-yellow-400 text-base" />
                  <span>Instant withdrawals</span>
                </div>
              </motion.div>
            </div>

            {/* RIGHT COLUMN — Floating 3D Assets */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-6 relative flex items-center justify-center"
              style={{ minHeight: 420 }}
            >
              {/* Glowing ring behind */}
              <div className="absolute w-[320px] h-[320px] rounded-full border border-primary/20 animate-spin" style={{ animationDuration: "20s" }} />
              <div className="absolute w-[400px] h-[400px] rounded-full border border-secondary/10 animate-spin" style={{ animationDuration: "30s", animationDirection: "reverse" }} />

              {/* Main banner image with float */}
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <img
                  src={getImagePath("/images/banner/banner.png")}
                  alt="crypto dashboard"
                  width={500}
                  height={400}
                  className="drop-shadow-2xl w-full max-w-[440px]"
                />
              </motion.div>

              {/* Floating coins */}
              <FloatingCoin
                src={getImagePath("/images/table/bitcoin.svg")}
                alt="Bitcoin"
                size={64}
                style={{ top: "8%", left: "5%" }}
                delay={0}
              />
              <FloatingCoin
                src={getImagePath("/images/table/cryptoone.svg")}
                alt="Crypto"
                size={52}
                style={{ top: "15%", right: "8%" }}
                delay={1}
              />
              <FloatingCoin
                src={getImagePath("/images/table/cryptotwo.svg")}
                alt="Crypto"
                size={48}
                style={{ bottom: "20%", left: "8%" }}
                delay={1.5}
              />
              <FloatingCoin
                src={getImagePath("/images/table/cryptothree.svg")}
                alt="Crypto"
                size={44}
                style={{ bottom: "10%", right: "6%" }}
                delay={0.7}
              />

              {/* Floating Stats Card - Live Price */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-6 right-0 bg-darkmode/90 border border-border backdrop-blur-md rounded-xl px-4 py-3 shadow-xl z-20"
              >
                <div className="flex items-center gap-3">
                  <img src={getImagePath("/images/table/bitcoin.svg")} alt="btc" width={28} height={28} />
                  <div>
                    <p className="text-xs text-white/50 leading-none">BTC / USD</p>
                    <p className="text-base font-bold text-white leading-tight">$67,842</p>
                  </div>
                  <span className="text-xs text-green-400 font-semibold bg-green-400/10 px-2 py-0.5 rounded-full ml-1">+4.2%</span>
                </div>
              </motion.div>

              {/* Floating Earn Card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                className="absolute bottom-12 left-0 bg-darkmode/90 border border-border backdrop-blur-md rounded-xl px-4 py-3 shadow-xl z-20"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-400/10 flex items-center justify-center">
                    <Icon icon="tabler:trending-up" className="text-green-400 text-base" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 leading-none">Today&apos;s Earnings</p>
                    <p className="text-sm font-bold text-green-400">+ $248.50</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span className="text-white/20 text-xs">Scroll to explore</span>
          <Icon icon="tabler:chevron-down" className="text-white/20 text-xl" />
        </motion.div>
      </section>

      {/* LIVE STATS STRIP */}
      <section ref={statsRef} className="relative py-2 border-y border-border bg-darkmode/60 backdrop-blur-sm">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            <StatItem end={124850} prefix="" suffix="+" label="Active Earners" icon="tabler:users" inView={inView} />
            <StatItem end={8400000} prefix="$" suffix="" label="Total Paid Out" icon="tabler:moneybag" inView={inView} />
            <StatItem end={3700000} prefix="" suffix="+" label="Tasks Completed" icon="tabler:check" inView={inView} />
            <StatItem end={99.9} prefix="" suffix="%" label="Uptime Guarantee" icon="tabler:server" inView={inView} />
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingHero;