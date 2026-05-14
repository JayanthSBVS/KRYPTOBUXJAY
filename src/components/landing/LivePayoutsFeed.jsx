import { useMemo, useEffect, useRef, useState } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
import { Icon } from '@iconify/react';

// --- Dummy Data Generation ---
const COINS = [
  { symbol: 'BTC', icon: 'ion:logo-bitcoin', color: '#F7931A' },
  { symbol: 'ETH', icon: 'ion:diamond', color: '#627EEA' },
  { symbol: 'USDT', icon: 'ion:cash', color: '#26A17B' },
  { symbol: 'SOL', icon: 'ion:flash', color: '#9945FF' },
  { symbol: 'LTC', icon: 'ion:aperture', color: '#345D9D' },
];

const ACTIONS = ['Withdrawn', 'Paid Out', 'Processed'];

const generateDummyData = (count) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    const coin = COINS[Math.floor(Math.random() * COINS.length)];
    const isCrypto = coin.symbol !== 'USDT';
    
    let amountStr = '';
    if (coin.symbol === 'BTC') amountStr = (Math.random() * 0.05 + 0.0005).toFixed(5);
    else if (coin.symbol === 'ETH') amountStr = (Math.random() * 0.8 + 0.01).toFixed(4);
    else if (coin.symbol === 'SOL') amountStr = (Math.random() * 15 + 0.5).toFixed(2);
    else amountStr = (Math.random() * 200 + 5).toFixed(2);

    const usernameStr = `user_${Math.random().toString(36).substring(2, 6)}${Math.floor(Math.random() * 99)}`;
    const timeMins = Math.floor(Math.random() * 59) + 1;

    data.push({
      id: `txn_${i}_${Date.now()}`,
      username: usernameStr,
      coin,
      amount: `${amountStr} ${coin.symbol}`,
      action: ACTIONS[Math.floor(Math.random() * ACTIONS.length)],
      time: `${timeMins}m ago`,
    });
  }
  return data;
};

// --- Single Transaction Row Component ---
const TransactionRow = ({ txn }) => (
  <div className="flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-all group mb-2.5 relative overflow-hidden">
    {/* Subtle hover glow */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      style={{ background: `radial-gradient(120px circle at 20px 50%, ${txn.coin.color}15 0%, transparent 100%)` }} />

    {/* Crypto Icon */}
    <div className="w-10 h-10 rounded-xl flex flex-shrink-0 items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-lg relative z-10"
      style={{ background: `linear-gradient(135deg, ${txn.coin.color}20, ${txn.coin.color}05)`, border: `1px solid ${txn.coin.color}30` }}>
      <Icon icon={txn.coin.icon} className="text-xl" style={{ color: txn.coin.color }} />
    </div>

    {/* User Details */}
    <div className="flex-1 min-w-0 relative z-10">
      <div className="flex items-center gap-2 mb-0.5">
        <p className="text-sm font-bold text-white truncate">@{txn.username}</p>
      </div>
      <p className="text-xs text-lightblue/60 font-medium font-mono tracking-tight">{txn.time} • TXN_VERIFIED</p>
    </div>

    {/* Amount & Status */}
    <div className="text-right flex-shrink-0 relative z-10">
      <p className="text-[15px] font-black text-white tracking-tight">{txn.amount}</p>
      <div className="flex items-center justify-end gap-1.5 mt-0.5">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
        <p className="text-[9px] font-bold text-green-400 uppercase tracking-widest">
          {txn.action}
        </p>
      </div>
    </div>
  </div>
);

// --- Live Stats Component ---
const LiveStatsPanel = () => {
  const [vol, setVol] = useState(2450.82);
  const [txns, setTxns] = useState(14205);

  useEffect(() => {
    // Randomly tick up stats to feel "alive"
    const interval = setInterval(() => {
      setVol(prev => prev + (Math.random() * 2.5));
      if (Math.random() > 0.5) setTxns(prev => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* Network Status Card */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="glass-card rounded-3xl p-6 relative overflow-hidden"
        style={{ border: '1px solid rgba(189,36,223,0.2)' }}
      >
        <div className="absolute top-0 right-0 p-6 pointer-events-none opacity-20">
          <Icon icon="ion:planet-outline" className="text-9xl text-primary" />
        </div>
        
        <div className="flex items-center gap-2 mb-6">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-xs font-bold text-green-400 tracking-widest uppercase">Network Live</span>
        </div>

        <h3 className="text-3xl font-black text-white mb-2 leading-tight">Global Payout<br/><span className="gradient-text">Ecosystem.</span></h3>
        <p className="text-sm text-lightblue/80 leading-relaxed mb-8 max-w-[250px]">
          Watch real-time withdrawals stream directly from the KRYPTOBUX network to FaucetPay wallets globally.
        </p>

        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
            <p className="text-[10px] text-lightblue uppercase tracking-widest font-bold mb-1">24H Volume (USD)</p>
            <p className="text-2xl font-black text-white font-mono">${vol.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
            <p className="text-[10px] text-lightblue uppercase tracking-widest font-bold mb-1">Total TXNs Today</p>
            <p className="text-2xl font-black text-white font-mono">{txns.toLocaleString()}</p>
          </div>
        </div>
      </motion.div>

      {/* Trust Badges */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="flex gap-4"
      >
        <div className="flex-1 glass p-4 rounded-2xl flex items-center gap-3">
          <Icon icon="ion:shield-checkmark" className="text-2xl text-secondary" />
          <p className="text-xs font-bold text-lightblue">Verified<br/>Transfers</p>
        </div>
        <div className="flex-1 glass p-4 rounded-2xl flex items-center gap-3">
          <Icon icon="ion:flash" className="text-2xl text-primary" />
          <p className="text-xs font-bold text-lightblue">Zero<br/>Latency</p>
        </div>
      </motion.div>
    </div>
  );
};

// --- Infinite Vertical Feed Component ---
export default function LivePayoutsFeed() {
  const feedData = useMemo(() => generateDummyData(100), []);
  const containerRef = useRef(null);
  const scrollRef = useRef(0);
  
  useAnimationFrame((time, delta) => {
    if (!containerRef.current) return;
    
    // Smooth cinematic speed
    const speed = 0.035; 
    scrollRef.current -= speed * delta;
    
    const node = containerRef.current;
    const singleHeight = node.scrollHeight / 2;
    
    if (Math.abs(scrollRef.current) >= singleHeight) {
      scrollRef.current = 0;
    }
    
    node.style.transform = `translateY(${scrollRef.current}px)`;
  });

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-body-bg" id="payouts">
      {/* Immersive Background */}
      <div className="absolute inset-0 bg-grid opacity-[0.15] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, #bd24df, #2d6ade)' }} />

      <div className="container relative z-10">
        
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-16 items-center">
          
          {/* Left: Ecosystem Stats */}
          <LiveStatsPanel />

          {/* Right: Live Terminal */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Terminal Glow Box */}
            <div className="absolute -inset-0.5 rounded-[2.5rem] blur opacity-30" style={{ background: 'linear-gradient(180deg, #bd24df, rgba(45,106,222,0.2))' }} />
            
            <div className="relative glass-card rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl bg-[#040D26]/90 backdrop-blur-xl">
              
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/[0.06] bg-white/[0.01]">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  </div>
                  <div className="h-4 w-px bg-white/10 mx-2" />
                  <span className="text-[10px] font-bold text-lightblue/50 uppercase tracking-widest font-mono">
                    Terminal_ID: KBX-09
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                  <Icon icon="ion:wifi" className="text-primary text-xs animate-pulse" />
                  <span className="text-[9px] font-bold text-primary uppercase tracking-widest">
                    Live Stream
                  </span>
                </div>
              </div>

              {/* Scrolling Feed Area */}
              <div className="relative h-[450px] sm:h-[550px] overflow-hidden" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }}>
                
                <div ref={containerRef} className="absolute top-0 left-0 right-0 px-4 sm:px-6 pt-4 w-full">
                  {/* Copy 1 */}
                  <div className="flex flex-col">
                    {feedData.map((txn) => (
                      <TransactionRow key={txn.id} txn={txn} />
                    ))}
                  </div>
                  {/* Copy 2 for infinite loop */}
                  <div className="flex flex-col">
                    {feedData.map((txn) => (
                      <TransactionRow key={`${txn.id}_clone`} txn={txn} />
                    ))}
                  </div>
                </div>
                
              </div>

              {/* Terminal Footer fade */}
              <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(4,13,38,1), transparent)' }} />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
