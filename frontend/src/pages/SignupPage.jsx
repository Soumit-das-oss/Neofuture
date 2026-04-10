import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Mail, Lock, User } from 'lucide-react';

const SignupPage = () => {
  return (
    <div className="min-h-screen bg-navy relative flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-cyber-grid opacity-30 z-0 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[30%] h-[30%] bg-saffron/20 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel w-full max-w-md p-8 rounded-3xl relative z-10"
      >
        <div className="flex justify-center mb-6">
          <ShieldCheck className="text-saffron" size={48} />
        </div>
        <h2 className="text-3xl font-black text-white text-center mb-2">Create Account</h2>
        <p className="text-slate-400 text-center mb-8">Join Sentinel AI to protect your digital presence</p>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="relative">
            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500" size={20} />
            <input 
              type="text" 
              placeholder="Full Name" 
              className="w-full bg-dark/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary-green/50 focus:ring-1 focus:ring-primary-green/50 transition-all placeholder:text-slate-600"
            />
          </div>
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
          </div>
          <button className="w-full bg-primary-green hover:bg-green-500 text-navy font-bold rounded-xl py-3 mt-4 transition-all shadow-[0_0_15px_rgba(0,255,102,0.3)] hover:shadow-[0_0_25px_rgba(0,255,102,0.5)]">
            Create Account
          </button>
        </form>

        <p className="text-center text-slate-400 mt-6">
          Already have an account? <Link to="/login" className="text-saffron hover:underline">Log in</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignupPage;
