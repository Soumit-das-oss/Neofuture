import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Mail, Lock } from 'lucide-react';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-navy relative flex items-center justify-center p-4">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-cyber-grid opacity-30 z-0 pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/4 w-[30%] h-[30%] bg-primary-green/20 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel w-full max-w-md p-8 rounded-3xl relative z-10"
      >
        <div className="flex justify-center mb-6">
          <ShieldCheck className="text-primary-green" size={48} />
        </div>
        <h2 className="text-3xl font-black text-white text-center mb-2">Welcome Back</h2>
        <p className="text-slate-400 text-center mb-8">Login to your Sentinel AI dashboard</p>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500" size={20} />
            <input 
              type="email" 
              placeholder="Email address" 
              className="w-full bg-dark/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary-green/50 focus:ring-1 focus:ring-primary-green/50 transition-all placeholder:text-slate-600"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500" size={20} />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full bg-dark/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary-green/50 focus:ring-1 focus:ring-primary-green/50 transition-all placeholder:text-slate-600"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-saffron text-sm font-medium cursor-pointer">
              Forgot?
            </div>
          </div>
          <button className="w-full bg-saffron hover:bg-orange-500 text-navy font-bold rounded-xl py-3 mt-4 transition-all shadow-[0_0_15px_rgba(255,153,51,0.3)] hover:shadow-[0_0_25px_rgba(255,153,51,0.5)]">
            Sign In
          </button>
        </form>

        <p className="text-center text-slate-400 mt-6">
          Don't have an account? <Link to="/signup" className="text-primary-green hover:underline">Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
