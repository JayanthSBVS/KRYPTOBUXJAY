import { Icon } from '@iconify/react';
import { useAuthModalStore } from '@/store/useAuthModalStore';

const NAV = [
  { label: 'How It Works', href: '#how' },
  { label: 'Features', href: '#features' },
  { label: 'Payouts', href: '#payouts' },
];

export default function Footer() {
  const { openModal } = useAuthModalStore();

  return (
    <footer className="border-t border-border/50 bg-darkmode/40 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

      <div className="container relative z-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-9 h-9">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-xl blur-sm opacity-60" />
                <div className="relative w-9 h-9 bg-gradient-to-tr from-primary to-secondary rounded-xl flex items-center justify-center">
                  <Icon icon="ion:diamond" className="text-white text-lg" />
                </div>
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                KRYPTO<span className="gradient-text">BUX</span>
              </span>
            </div>
            <p className="text-lightblue text-sm leading-relaxed max-w-xs">
              The next-generation crypto rewards ecosystem. Earn smarter. Withdraw faster.
              Powered by FaucetPay.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-black tracking-widest uppercase text-lightblue mb-5">Platform</h4>
            <ul className="space-y-3">
              {NAV.map((n) => (
                <li key={n.label}>
                  <a href={n.href} className="text-sm text-lightblue/80 hover:text-white transition-colors font-medium">
                    {n.label}
                  </a>
                </li>
              ))}
              <li>
                <button onClick={() => openModal('REGISTER')} className="text-sm text-primary hover:text-white transition-colors font-medium">
                  Start Earning →
                </button>
              </li>
            </ul>
          </div>

          {/* Contact / socials */}
          <div>
            <h4 className="text-xs font-black tracking-widest uppercase text-lightblue mb-5">Connect</h4>
            <div className="flex gap-3 mb-6">
              {[
                { icon: 'ion:logo-twitter', href: '#' },
                { icon: 'ion:logo-discord', href: '#' },
                { icon: 'ion:logo-telegram', href: '#' },
              ].map((s) => (
                <a key={s.icon} href={s.href}
                  className="w-10 h-10 glass-card rounded-xl flex items-center justify-center text-lightblue hover:text-primary hover:border-primary/30 transition-all border border-border">
                  <Icon icon={s.icon} className="text-lg" />
                </a>
              ))}
            </div>
            <p className="text-xs text-lightblue/60 leading-relaxed">
              Powered by FaucetPay ecosystem.<br />
              Integrated with leading offerwalls.
            </p>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-lightblue/60">
          <p>© {new Date().getFullYear()} KRYPTOBUX. All rights reserved.</p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'FAQ'].map((l) => (
              <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
