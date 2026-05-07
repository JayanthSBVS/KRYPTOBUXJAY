import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthModalStore } from '@/store/useAuthModalStore';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

const AuthModal = () => {
  const { isOpen, type, defaultEmail, closeModal, setType } = useAuthModalStore();
  const { login } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm();

  useEffect(() => {
    if (isOpen && defaultEmail && type === 'REGISTER') {
      setValue('email', defaultEmail);
    }
  }, [isOpen, defaultEmail, type, setValue]);

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    try {
      // Simulate API call for login/register
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock successful response
      const mockToken = "mock_jwt_token_xyz";
      const mockUser = { id: '1', email: data.email, name: 'User' };
      
      login(mockToken, mockUser);
      closeModal();
      reset();
      navigate('/dashboard');
    } catch (error) {
      console.error('Authentication failed', error);
    }
  };

  const isLogin = type === 'LOGIN';

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md px-4">
      <div className="relative w-full max-w-md bg-body-bg border border-border rounded-2xl shadow-2xl overflow-hidden p-8">
        
        {/* Close Button */}
        <button 
          onClick={() => { closeModal(); reset(); }}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
          <Icon icon="ion:close" className="text-2xl" />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-400 text-sm">
            {isLogin ? 'Log in to access your dashboard' : 'Join thousands earning crypto today'}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Username</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Icon icon="ion:person-outline" />
                </span>
                <input 
                  type="text"
                  {...register('username', { required: !isLogin })}
                  className="w-full bg-darkmode border border-border rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary transition"
                  placeholder="Enter your username"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Icon icon="ion:mail-outline" />
              </span>
              <input 
                type="email"
                {...register('email', { required: true })}
                className="w-full bg-darkmode border border-border rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary transition"
                placeholder="Enter your email"
              />
            </div>
            {errors.email && <span className="text-red-500 text-xs mt-1">Email is required</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Icon icon="ion:lock-closed-outline" />
              </span>
              <input 
                type="password"
                {...register('password', { required: true, minLength: 6 })}
                className="w-full bg-darkmode border border-border rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary transition"
                placeholder="Enter your password"
              />
            </div>
            {errors.password && <span className="text-red-500 text-xs mt-1">Password must be at least 6 characters</span>}
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-opacity-90 text-white font-bold py-3 rounded-lg transition mt-4 disabled:opacity-50"
          >
            {isSubmitting ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-body-bg px-2 text-gray-500 font-medium tracking-wider">Or continue with</span>
            </div>
          </div>

          <button 
            type="button"
            className="w-full bg-[#1e2337] hover:bg-[#252b45] text-white font-semibold py-3 rounded-lg border border-border flex items-center justify-center gap-3 transition group"
          >
            <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center group-hover:scale-110 transition">
              <span className="text-white font-black text-[10px]">FP</span>
            </div>
            Login with FaucetPay
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              type="button"
              onClick={() => { reset(); setType(isLogin ? 'REGISTER' : 'LOGIN'); }}
              className="text-primary hover:text-white transition font-medium"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
