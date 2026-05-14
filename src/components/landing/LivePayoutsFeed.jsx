import { useMemo, useEffect, useRef } from 'react';
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
    
    // Realistic amounts
    let amountStr = '';
    if (coin.symbol === 'BTC') amountStr = (Math.random() * 0.05 + 0.0005).toFixed(5);
    else if (coin.symbol === 'ETH') amountStr = (Math.random() * 0.8 + 0.01).toFixed(4);
    else if (coin.symbol === 'SOL') amountStr = (Math.random() * 15 + 0.5).toFixed(2);
    else amountStr = (Math.random() * 200 + 5).toFixed(2); // USDT or LTC

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
  <div className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 rounded-2xl glass-card border border-border/50 hover:border-white/10 transition-colors group mb-3 relative overflow-hidden">
    {/* Subtle hover glow */}
    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      style={{ background: `radial-gradient(circle at left center, ${txn.coin.color}15 0%, transparent 60%)` }} />

    {/* Crypto Icon */}
    <div className="w-10 h-10 rounded-xl flex flex-shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-110"
      style={{ background: `${txn.coin.color}15`, border: `1px solid ${txn.coin.color}30` }}>
      <Icon icon={txn.coin.icon} className="text-xl" style={{ color: txn.coin.color }} />
    </div>

    {/* User Details */}
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-0.5">
        <p className="text-sm font-bold text-white truncate">@{txn.username}</p>
        <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-green-500/10 text-green-400 border border-green-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 mr-1.5 animate-pulse" />
          {txn.action}
        </span>
      </div>
      <p className="text-xs text-lightblue/70 font-medium">{txn.time}</p>
    </div>

    {/* Amount */}
    <div className="text-right flex-shrink-0">
      <p className="text-base font-black text-white">{txn.amount}</p>
      <p className="text-[10px] font-bold text-lightblue uppercase tracking-widest text-right sm:hidden mt-0.5 text-green-400">
        {txn.action}
      </p>
    </div>
  </div>
);

// --- Infinite Vertical Feed Component ---
export default function LivePayoutsFeed() {
  // Generate 100 items once on mount
  const feedData = useMemo(() => generateDummyData(100), []);
  const containerRef = useRef(null);
  const scrollRef = useRef(0);
  
  // Use Framer Motion's useAnimationFrame for hardware-accelerated, zero-DOM-thrash scrolling
  useAnimationFrame((time, delta) => {
    if (!containerRef.current) return;
    
    // Speed: pixels per millisecond
    const speed = 0.05;
    scrollRef.current -= speed * delta;
    
    // Calculate total height of one copy of the feed to seamlessly loop.
    // We render two identical copies of the feed. Once we scroll past the first copy, we reset.
    // Instead of measuring actual DOM height dynamically (which causes reflows), 
    // we use a CSS percentage transform to shift it seamlessly.
    // The container holds 2 copies. 50% height = 1 full copy.
    
    // For pure pixel manipulation without React state updates:
    const node = containerRef.current;
    const singleHeight = node.scrollHeight / 2;
    
    // Reset loop
    if (Math.abs(scrollRef.current) >= singleHeight) {
      scrollRef.current = 0;
    }
    
    node.style.transform = `translateY(${scrollRef.current}px)`;
  });

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-body-bg" id="payouts">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(189,36,223,0.05) 0%, transparent 70%)' }} />

      <div className="container relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-6 glass">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Global Activity Feed
          </span>
          <h2 className="text-4xl sm:text-5xl font-black mb-4">
            Live <span className="gradient-text">Withdrawals</span>
          </h2>
          <p className="text-lightblue text-sm sm:text-base max-w-lg mx-auto">
            Real-time payout stream across the KRYPTOBUX network. 
            Powered by instantaneous Web3 transactions.
          </p>
        </motion.div>

        {/* Terminal Container */}
        <div className="max-w-3xl mx-auto relative">
          
          {/* Terminal UI Chrome */}
          <div className="relative glass-card rounded-[2rem] border border-border/80 overflow-hidden" style={{ boxShadow: '0 20px 80px rgba(0,0,0,0.5)' }}>
            
            {/* Terminal Header Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/50 bg-[#0c1b44]/80">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-lightblue/70 uppercase tracking-widest">
                <Icon icon="ion:radio-outline" className="text-green-400 text-sm" />
                Live Node Sync
              </div>
            </div>

            {/* Scrolling Feed Area */}
            <div className="relative h-[500px] sm:h-[600px] overflow-hidden" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }}>
              
              {/* Continuous Animation Container */}
              <div ref={containerRef} className="absolute top-0 left-0 right-0 px-4 sm:px-6 pt-4 w-full">
                {/* Copy 1 */}
                <div className="flex flex-col">
                  {feedData.map((txn) => (
                    <TransactionRow key={txn.id} txn={txn} />
                  ))}
                </div>
                {/* Copy 2 for seamless infinite loop */}
                <div className="flex flex-col">
                  {feedData.map((txn) => (
                    <TransactionRow key={`${txn.id}_clone`} txn={txn} />
                  ))}
                </div>
              </div>
              
            </div>
            
            {/* Bottom Blur Overlay for depth */}
            <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(4,13,38,0.9), transparent)' }} />
          </div>

          {/* Ambient Glow Behind Terminal */}
          <div className="absolute -inset-4 rounded-[3rem] blur-3xl opacity-20 pointer-events-none z-[-1]"
            style={{ background: 'linear-gradient(135deg, #bd24df, #2d6ade)' }} />
        </div>
        
      </div>
    </section>
  );
}
