import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';
import { Icon } from '@iconify/react';

const PAYOUTS = [
  { user: 'a***@gmail.com', amount: '0.0042 BTC', icon: 'ion:logo-bitcoin', color: '#F7931A', time: 'Just now' },
  { user: 'j***@yahoo.com', amount: '52.00 USDT', icon: 'ion:cash', color: '#26A17B', time: '2m ago' },
  { user: 'k***@proton.me', amount: '1.8 SOL', icon: 'ion:flash', color: '#9945FF', time: '4m ago' },
  { user: 'm***@gmail.com', amount: '$15 Amazon', icon: 'ion:gift', color: '#FF9900', time: '9m ago' },
  { user: 'z***@hotmail.com', amount: '0.12 ETH', icon: 'ion:diamond', color: '#627EEA', time: '13m ago' },
  { user: 'r***@gmail.com', amount: '25.00 USDT', icon: 'ion:cash', color: '#26A17B', time: '18m ago' },
  { user: 's***@icloud.com', amount: '$10 Google', icon: 'ion:logo-google', color: '#4285F4', time: '21m ago' },
];

function PayoutCard({ payout }) {
  return (
    <div className="mx-3 flex items-center gap-3 px-5 py-3 rounded-2xl glass-card border border-border hover:border-primary/30 transition-colors min-w-[220px] cursor-default group">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform" style={{ background: `${payout.color}18` }}>
        <Icon icon={payout.icon} style={{ color: payout.color, fontSize: '1.25rem' }} />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-bold text-white truncate">{payout.amount}</p>
        <p className="text-xs text-lightblue truncate">{payout.user} · {payout.time}</p>
      </div>
      <span className="ml-auto w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
    </div>
  );
}

export default function TickerSection() {
  return (
    <section className="py-12 border-y border-border/50 bg-darkmode/40 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-body-bg via-transparent to-body-bg pointer-events-none z-10" />

      <div className="container mb-5 flex items-center gap-3 relative z-20">
        <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-lightblue">Live Payouts · Verified Withdrawals</span>
        <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
        <span className="text-xs text-lightblue/60 font-medium">Updated in real-time</span>
      </div>

      <div className="relative z-20">
        <Marquee pauseOnHover speed={38} gradient={false}>
          {[...PAYOUTS, ...PAYOUTS].map((p, i) => (
            <PayoutCard key={i} payout={p} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
