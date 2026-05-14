import { motion } from 'framer-motion';
import { useAuthModalStore } from '@/store/useAuthModalStore';
import { Icon } from '@iconify/react';

const WALLET_ROWS = [
  { coin: 'Bitcoin', symbol: 'BTC', icon: 'ion:logo-bitcoin', color: '#F7931A', bal: '0.0842', change: '+12.4%', up: true },
  { coin: 'Ethereum', symbol: 'ETH', icon: 'ion:diamond', color: '#627EEA', bal: '1.204', change: '+5.8%', up: true },
  { coin: 'Tether', symbol: 'USDT', icon: 'ion:cash', color: '#26A17B', bal: '248.50', change: '+0.1%', up: true },
  { coin: 'Solana', symbol: 'SOL', icon: 'ion:flash', color: '#9945FF', bal: '14.32', change: '-2.1%', up: false },
];

const ACTIVITY = [
  { desc: 'Survey Completed', pts: '+450 pts', time: '2m ago', icon: 'ion:checkmark-circle', color: '#26A17B' },
  { desc: 'Referral Bonus', pts: '+120 pts', time: '18m ago', icon: 'ion:people', color: '#2d6ade' },
  { desc: 'BTC Withdrawal', pts: '0.0042 BTC', time: '1h ago', icon: 'ion:logo-bitcoin', color: '#F7931A' },
];

export default function DashboardPreview() {
  const { openModal } = useAuthModalStore();

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 20% 50%, rgba(189,36,223,0.07) 0%, transparent 60%)' }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 text-primary text-xs font-bold tracking-widest uppercase mb-6">
              <Icon icon="ion:bar-chart-outline" />
              Live Dashboard
            </span>
            <h2 className="text-4xl sm:text-5xl font-black mb-6 leading-tight">
              Your Crypto Dashboard.{' '}
              <span className="gradient-text">Always Growing.</span>
            </h2>
            <p className="text-lightblue text-lg leading-relaxed mb-8">
              Watch your balance grow in real-time. Track earnings, monitor withdrawals,
              manage referrals — all from one beautifully designed dashboard.
            </p>

            <div className="space-y-4 mb-10">
              {['Real-time balance tracking across all cryptos', 'One-click FaucetPay withdrawal', 'Referral tree with live earnings', 'Complete task history & receipts'].map((f, i) => (
                <motion.div key={f} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3 text-sm font-medium text-lightblue">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Icon icon="ion:checkmark" className="text-primary text-xs" />
                  </div>
                  {f}
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 0 36px rgba(189,36,223,0.45)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => openModal('REGISTER')}
              className="gradient-btn px-8 py-4 rounded-2xl font-bold text-white shadow-[0_0_25px_rgba(189,36,223,0.3)]"
            >
              Access Your Dashboard →
            </motion.button>
          </motion.div>

          {/* Right: dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Glow behind card */}
            <div className="absolute -inset-4 rounded-[2rem] blur-2xl opacity-30 pointer-events-none"
              style={{ background: 'linear-gradient(135deg, rgba(189,36,223,0.4), rgba(45,106,222,0.4))' }} />

            {/* Main card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative glass-card rounded-3xl p-6 overflow-hidden"
              style={{ border: '1px solid rgba(189,36,223,0.2)' }}
            >
              {/* Scan line effect */}
              <motion.div
                animate={{ top: ['-5%', '105%'] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none"
                style={{ position: 'absolute' }}
              />

              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs text-lightblue font-medium mb-0.5">Total Balance</p>
                  <div className="text-3xl font-black text-white">$1,284<span className="text-lg text-lightblue">.50</span></div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-green-500/10 border border-green-500/20">
                  <Icon icon="ion:trending-up" className="text-green-400 text-sm" />
                  <span className="text-green-400 text-xs font-bold">+8.4% this week</span>
                </div>
              </div>

              {/* Wallet rows */}
              <div className="space-y-2 mb-6">
                {WALLET_ROWS.map((r) => (
                  <div key={r.symbol} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.03] transition-colors">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${r.color}20` }}>
                      <Icon icon={r.icon} style={{ color: r.color, fontSize: '1.1rem' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white">{r.coin}</p>
                      <p className="text-xs text-lightblue">{r.symbol}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-white">{r.bal}</p>
                      <p className={`text-xs font-semibold ${r.up ? 'text-green-400' : 'text-red-400'}`}>{r.change}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Activity */}
              <div>
                <p className="text-xs font-bold text-lightblue tracking-widest uppercase mb-3">Recent Activity</p>
                <div className="space-y-2">
                  {ACTIVITY.map((a, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.025] border border-white/[0.04]"
                    >
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${a.color}20` }}>
                        <Icon icon={a.icon} style={{ color: a.color, fontSize: '0.9rem' }} />
                      </div>
                      <span className="text-xs text-white font-medium flex-1">{a.desc}</span>
                      <span className="text-xs font-bold text-green-400">{a.pts}</span>
                      <span className="text-[10px] text-lightblue">{a.time}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
