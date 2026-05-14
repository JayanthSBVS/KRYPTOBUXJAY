import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { Icon } from '@iconify/react';

const STATS = [
  { value: 2400000, prefix: '$', suffix: '+', label: 'Total Paid Out', sub: 'Verified crypto & gift card payouts', icon: 'ion:wallet', color: '#bd24df' },
  { value: 45892, suffix: '+', label: 'Registered Users', sub: 'Growing every day worldwide', icon: 'ion:people', color: '#2d6ade' },
  { value: 1240, suffix: '+', label: 'Daily Tasks', sub: 'Fresh earning opportunities', icon: 'ion:flash', color: '#F7931A' },
  { value: 5, prefix: '<', suffix: 'min', label: 'Avg Withdrawal', sub: 'Fastest payouts in the industry', icon: 'ion:timer', color: '#26A17B' },
];

export default function StatsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(189,36,223,0.05) 0%, transparent 65%)' }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 text-primary text-xs font-bold tracking-widest uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Platform Metrics · Live Data
          </span>
          <h2 className="text-4xl sm:text-5xl font-black mb-4">
            Numbers That <span className="gradient-text">Don't Lie</span>
          </h2>
        </motion.div>

        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, scale: 1.03 }}
              className="glass-card rounded-3xl p-6 lg:p-8 relative overflow-hidden group"
              style={{ borderColor: `${s.color}20` }}
            >
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at 30% 30%, ${s.color}10 0%, transparent 60%)` }} />

              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: `${s.color}18` }}>
                <Icon icon={s.icon} style={{ color: s.color, fontSize: '1.5rem' }} />
              </div>

              <div className="font-black text-white mb-1 leading-none" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}>
                {s.prefix && <span className="gradient-text">{s.prefix}</span>}
                {inView ? (
                  <CountUp
                    end={s.value}
                    duration={2.2}
                    separator=","
                    formattingFn={s.value >= 1000000 ? (v) => `${(v / 1000000).toFixed(1)}M` : undefined}
                  />
                ) : '0'}
                {s.suffix && <span className="text-lightblue text-xl ml-1">{s.suffix}</span>}
              </div>

              <p className="text-white font-bold text-sm mb-1">{s.label}</p>
              <p className="text-lightblue text-xs leading-snug">{s.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
