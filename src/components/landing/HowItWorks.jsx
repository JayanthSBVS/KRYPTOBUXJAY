import { motion } from 'framer-motion';
import { useAuthModalStore } from '@/store/useAuthModalStore';
import { Icon } from '@iconify/react';

const STEPS = [
  {
    num: '01', icon: 'ion:person-add-outline', label: 'Create Free Account',
    desc: 'Sign up in under 60 seconds. No KYC, no credit card, no catch. Just your email.',
    color: '#bd24df', glow: 'rgba(189,36,223,0.3)', cta: 'Get Started', action: 'REGISTER',
  },
  {
    num: '02', icon: 'ion:game-controller-outline', label: 'Complete Earning Tasks',
    desc: 'Surveys, games, app installs, watch videos. Hundreds of daily tasks across top offerwalls.',
    color: '#2d6ade', glow: 'rgba(45,106,222,0.3)', cta: 'See Offers', action: 'REGISTER',
    badge: 'Most Popular',
  },
  {
    num: '03', icon: 'ion:card-outline', label: 'Withdraw Instantly',
    desc: 'Convert points to BTC, ETH, SOL via FaucetPay or redeem 200+ premium gift card brands.',
    color: '#26A17B', glow: 'rgba(38,161,123,0.3)', cta: 'View Rewards', action: 'REGISTER',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
};
const item = {
  hidden: { opacity: 0, y: 48 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function HowItWorks() {
  const { openModal } = useAuthModalStore();

  return (
    <section className="py-32 relative overflow-hidden bg-darkmode/25">
      {/* Subtle radial bg */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(45,106,222,0.06) 0%, transparent 60%)' }} />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-secondary/30 text-secondary text-xs font-bold tracking-widest uppercase mb-6">
            <Icon icon="ion:layers-outline" className="text-base" />
            How It Works
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-5 leading-tight">
            Three Steps to{' '}
            <span className="gradient-text">Financial Freedom</span>
          </h2>
          <p className="text-lightblue text-lg max-w-xl mx-auto">
            Get started in under a minute. No complexity — just real earning, real crypto.
          </p>
        </motion.div>

        {/* Steps grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {STEPS.map((step) => (
            <motion.div key={step.num} variants={item}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="relative glass-card rounded-3xl p-8 h-full group cursor-default overflow-hidden"
                style={{ borderColor: `${step.color}20` }}
              >
                {/* Hover glow fill */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 30% 20%, ${step.glow.replace('0.3', '0.08')} 0%, transparent 60%)` }}
                />

                {/* Badge */}
                {step.badge && (
                  <div className="absolute -top-0 right-6 px-3 py-1 rounded-b-xl text-[10px] font-black tracking-widest uppercase text-white"
                    style={{ background: `linear-gradient(135deg, #bd24df, #2d6ade)` }}>
                    {step.badge}
                  </div>
                )}

                {/* Step number */}
                <div className="text-6xl font-black mb-4 leading-none select-none" style={{ color: `${step.color}18`, WebkitTextStroke: `1px ${step.color}30` }}>
                  {step.num}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: `${step.color}18`, boxShadow: `0 0 0 0 ${step.glow}` }}>
                  <Icon icon={step.icon} style={{ color: step.color, fontSize: '2rem' }} />
                </div>

                <h3 className="text-2xl font-black text-white mb-3 leading-tight">{step.label}</h3>
                <p className="text-lightblue leading-relaxed mb-8 text-sm">{step.desc}</p>

                {/* CTA */}
                <motion.button
                  whileHover={{ x: 4 }}
                  onClick={() => openModal(step.action)}
                  className="flex items-center gap-2 text-sm font-bold transition-colors"
                  style={{ color: step.color }}
                >
                  {step.cta}
                  <Icon icon="ion:arrow-forward" />
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
