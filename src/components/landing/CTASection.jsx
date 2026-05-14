import { motion } from 'framer-motion';
import { useAuthModalStore } from '@/store/useAuthModalStore';
import { Icon } from '@iconify/react';

export default function CTASection() {
  const { openModal } = useAuthModalStore();

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 90% 70% at 50% 50%, rgba(189,36,223,0.1) 0%, rgba(45,106,222,0.07) 40%, transparent 70%)' }} />

      <div className="container relative z-10 text-center">
        {/* Orbiting icons */}
        <div className="relative w-48 h-48 mx-auto mb-12 hidden md:block">
          <div className="absolute inset-0 rounded-full border border-primary/10" />
          <div className="absolute inset-6 rounded-full border border-secondary/10" />
          {/* Center diamond */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-3xl glass-card flex items-center justify-center glow-primary" style={{ border: '1px solid rgba(189,36,223,0.3)' }}>
              <Icon icon="ion:diamond" className="text-4xl" style={{ color: '#bd24df' }} />
            </div>
          </div>
          {/* Orbiting coins */}
          {[
            { icon: 'ion:logo-bitcoin', color: '#F7931A', duration: 6, radius: '88px' },
            { icon: 'ion:flash', color: '#9945FF', duration: 9, radius: '88px', delay: 3 },
            { icon: 'ion:gift', color: '#F7931A', duration: 12, radius: '60px', delay: 1.5 },
          ].map((o, i) => (
            <motion.div
              key={i}
              animate={{ rotate: 360 }}
              transition={{ duration: o.duration, repeat: Infinity, ease: 'linear', delay: o.delay || 0 }}
              className="absolute inset-0"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: `${o.color}20`, marginTop: o.radius === '60px' ? '14px' : '0' }}>
                <Icon icon={o.icon} style={{ color: o.color, fontSize: '1rem' }} />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 text-primary text-xs font-bold tracking-widest uppercase mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Join 45,000+ Crypto Earners Today
          </span>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-[1.05]">
            Your Crypto Journey<br />
            <span className="gradient-text">Starts Right Now.</span>
          </h2>

          <p className="text-lightblue text-xl max-w-xl mx-auto mb-12 leading-relaxed">
            Free to join. Instant payouts. No complicated setup.
            Start earning crypto in the next 5 minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(189,36,223,0.55)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => openModal('REGISTER')}
              className="gradient-btn px-10 py-5 rounded-2xl font-black text-white text-lg shadow-[0_0_30px_rgba(189,36,223,0.35)]"
            >
              Create Free Account →
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => openModal('LOGIN')}
              className="px-10 py-5 rounded-2xl font-bold text-lightblue text-lg glass border border-border hover:border-primary/30 hover:text-white transition-all"
            >
              Sign In
            </motion.button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-xs text-lightblue font-medium">
            {['No Credit Card Required', 'Instant FaucetPay Payouts', '256-bit SSL Security', 'Free Forever'].map((t) => (
              <div key={t} className="flex items-center gap-2">
                <Icon icon="ion:shield-checkmark" className="text-green-400" />
                {t}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
