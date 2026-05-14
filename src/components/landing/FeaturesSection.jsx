import { motion } from 'framer-motion';
import { useAuthModalStore } from '@/store/useAuthModalStore';
import { Icon } from '@iconify/react';

const FEATURES = [
  {
    icon: 'ion:flash', color: '#bd24df', title: 'Instant FaucetPay Payouts',
    desc: 'Withdraw BTC, ETH, LTC, DOGE, and more directly to your FaucetPay wallet. No minimums, no delays.',
    span: 'col-span-2 md:col-span-1',
  },
  {
    icon: 'ion:shield-checkmark', color: '#2d6ade', title: 'Bank-Grade Security',
    desc: 'SSL encryption, 2FA protection, and secure session management. Your earnings are always safe.',
    span: '',
  },
  {
    icon: 'ion:gift', color: '#F7931A', title: '200+ Gift Card Brands',
    desc: 'Redeem points for Amazon, Google Play, Netflix, Steam, and hundreds more. Delivered instantly by email.',
    span: '',
  },
  {
    icon: 'ion:people', color: '#26A17B', title: 'Referral Ecosystem',
    desc: "Earn 10% of all your referrals' earnings for life. Build a passive crypto income stream effortlessly.",
    span: 'col-span-2 md:col-span-1',
  },
  {
    icon: 'ion:game-controller', color: '#9945FF', title: 'Top Offerwalls Integrated',
    desc: 'Access Lootably, Theorem Reach, CPX Research, AdGate, and 10+ more premium offerwalls in one place.',
    span: 'col-span-2 md:col-span-2',
    wide: true,
  },
];

export default function FeaturesSection() {
  const { openModal } = useAuthModalStore();

  return (
    <section className="py-32 relative overflow-hidden bg-darkmode/20">
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(45,106,222,0.06) 0%, transparent 65%)' }} />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-secondary/30 text-secondary text-xs font-bold tracking-widest uppercase mb-6">
            <Icon icon="ion:star-outline" />
            Platform Features
          </span>
          <h2 className="text-4xl sm:text-5xl font-black mb-4 leading-tight">
            Everything You Need to{' '}
            <span className="gradient-text">Earn More</span>
          </h2>
          <p className="text-lightblue text-lg max-w-xl mx-auto">
            Built for crypto earners. Powered by the best offerwalls. Designed for speed.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className={`glass-card rounded-3xl p-6 lg:p-8 relative overflow-hidden group ${f.span} ${f.wide ? 'flex flex-col md:flex-row md:items-center gap-8' : ''}`}
              style={{ borderColor: `${f.color}18` }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at 20% 20%, ${f.color}12 0%, transparent 60%)` }} />

              {/* Decorative large icon bg */}
              <div className="absolute -right-4 -bottom-4 opacity-[0.04] pointer-events-none">
                <Icon icon={f.icon} style={{ fontSize: '8rem', color: f.color }} />
              </div>

              <div className={f.wide ? 'flex-shrink-0' : ''}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: `${f.color}18` }}>
                  <Icon icon={f.icon} style={{ color: f.color, fontSize: '1.75rem' }} />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-black text-white mb-2 leading-tight">{f.title}</h3>
                <p className="text-lightblue text-sm leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex justify-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(189,36,223,0.45)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => openModal('REGISTER')}
            className="gradient-btn px-10 py-4 rounded-2xl font-bold text-white shadow-[0_0_25px_rgba(189,36,223,0.3)]"
          >
            Unlock All Features — It's Free →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
