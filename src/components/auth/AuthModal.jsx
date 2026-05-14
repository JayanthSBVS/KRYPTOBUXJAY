import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useAuthModalStore } from '@/store/useAuthModalStore';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

export default function AuthModal() {
  const { isOpen, type, defaultEmail, closeModal, setType } = useAuthModalStore();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [serverError, setServerError] = useState('');

  const { register, handleSubmit, reset, setValue, watch, formState: { errors, isSubmitting } } = useForm();
  const isLogin = type === 'LOGIN';

  useEffect(() => {
    if (isOpen && defaultEmail && type === 'REGISTER') setValue('email', defaultEmail);
  }, [isOpen, defaultEmail, type, setValue]);

  useEffect(() => {
    if (!isOpen) { reset(); setServerError(''); setShowPass(false); }
  }, [isOpen, reset]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const onSubmit = async (data) => {
    setServerError('');
    try {
      await new Promise((r) => setTimeout(r, 900));
      const mockToken = 'kryptobux_token_' + Date.now();
      const mockUser = { id: '1', email: data.email, username: data.username || 'Earner', balance: 0 };
      login(mockToken, mockUser);
      closeModal();
      navigate('/dashboard');
    } catch {
      setServerError('Authentication failed. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.target === e.currentTarget && closeModal()}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ background: 'rgba(4, 13, 38, 0.85)', backdropFilter: 'blur(16px)' }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, #0c1b44 0%, #040D26 100%)',
              border: '1px solid rgba(189,36,223,0.2)',
              borderRadius: '1.75rem',
              boxShadow: '0 0 80px rgba(189,36,223,0.15), 0 40px 80px rgba(0,0,0,0.6)',
            }}
          >
            {/* Top glow bar */}
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(189,36,223,0.7), rgba(45,106,222,0.5), transparent)' }} />

            {/* Ambient bg glow */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(189,36,223,0.12) 0%, transparent 65%)' }} />

            <div className="relative p-8">
              {/* Close */}
              <button onClick={closeModal} className="absolute top-5 right-5 w-8 h-8 rounded-xl flex items-center justify-center text-lightblue hover:text-white hover:bg-white/10 transition-all">
                <Icon icon="ion:close" className="text-lg" />
              </button>

              {/* Logo mark */}
              <div className="flex justify-center mb-6">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #bd24df, #2d6ade)', boxShadow: '0 0 30px rgba(189,36,223,0.4)' }}>
                  <Icon icon="ion:diamond" className="text-white text-2xl" />
                </div>
              </div>

              {/* Toggle tabs */}
              <div className="flex rounded-2xl p-1 mb-8" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                {['LOGIN', 'REGISTER'].map((t) => (
                  <button key={t} onClick={() => { reset(); setType(t); }}
                    className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-300"
                    style={type === t ? {
                      background: 'linear-gradient(135deg, #bd24df, #2d6ade)',
                      color: 'white',
                      boxShadow: '0 0 20px rgba(189,36,223,0.3)',
                    } : { color: '#8a9bca' }}
                  >
                    {t === 'LOGIN' ? 'Sign In' : 'Create Account'}
                  </button>
                ))}
              </div>

              <div className="text-center mb-8">
                <h2 className="text-2xl font-black text-white mb-1">
                  {isLogin ? 'Welcome Back' : 'Start Earning Crypto'}
                </h2>
                <p className="text-sm text-lightblue">
                  {isLogin ? 'Access your crypto dashboard' : 'Join 45,000+ earners. Free forever.'}
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="block text-xs font-bold text-lightblue mb-2 tracking-wide uppercase">Username</label>
                    <div className="relative">
                      <Icon icon="ion:person-outline" className="absolute left-4 top-1/2 -translate-y-1/2 text-lightblue" />
                      <input
                        type="text"
                        {...register('username', { required: !isLogin, minLength: { value: 3, message: 'Min 3 characters' } })}
                        placeholder="Choose a username"
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl text-white text-sm placeholder-lightblue/50 outline-none transition-all"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                        onFocus={(e) => e.target.style.borderColor = 'rgba(189,36,223,0.5)'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                      />
                    </div>
                    {errors.username && <p className="text-red-400 text-xs mt-1">{errors.username.message || 'Username required'}</p>}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-lightblue mb-2 tracking-wide uppercase">
                    FaucetPay Email Address
                  </label>
                  <div className="relative">
                    <Icon icon="ion:mail-outline" className="absolute left-4 top-1/2 -translate-y-1/2 text-lightblue" />
                    <input
                      type="email"
                      {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
                      placeholder="Use your FaucetPay account email to continue"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl text-white text-sm placeholder-lightblue/50 outline-none transition-all"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                      onFocus={(e) => e.target.style.borderColor = 'rgba(189,36,223,0.5)'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                    />
                  </div>
                  <p className="text-[10px] text-lightblue/70 mt-1.5 ml-1 leading-tight">
                    Required for instantaneous crypto withdrawals and reward tracking.
                  </p>
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-lightblue mb-2 tracking-wide uppercase">Password</label>
                  <div className="relative">
                    <Icon icon="ion:lock-closed-outline" className="absolute left-4 top-1/2 -translate-y-1/2 text-lightblue" />
                    <input
                      type={showPass ? 'text' : 'password'}
                      {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 characters' } })}
                      placeholder={isLogin ? 'Your password' : 'Create a strong password'}
                      className="w-full pl-11 pr-12 py-3.5 rounded-xl text-white text-sm placeholder-lightblue/50 outline-none transition-all"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                      onFocus={(e) => e.target.style.borderColor = 'rgba(189,36,223,0.5)'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-lightblue hover:text-white transition-colors">
                      <Icon icon={showPass ? 'ion:eye-off-outline' : 'ion:eye-outline'} />
                    </button>
                  </div>
                  {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
                </div>

                {serverError && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center">
                    {serverError}
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(189,36,223,0.5)' }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-2xl font-black text-white text-sm mt-4 disabled:opacity-60 transition-all"
                  style={{ background: 'linear-gradient(135deg, #bd24df, #2d6ade)', boxShadow: '0 0 25px rgba(189,36,223,0.35)' }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full inline-block" />
                      Processing...
                    </span>
                  ) : isLogin ? 'Sign In to Dashboard →' : 'Create Account →'}
                </motion.button>
              </form>

              {/* Terms */}
              {!isLogin && (
                <p className="text-center text-xs text-lightblue/50 mt-5 leading-relaxed">
                  By creating an account, you agree to our{' '}
                  <a href="#" className="text-primary hover:text-white transition-colors">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-primary hover:text-white transition-colors">Privacy Policy</a>.
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
