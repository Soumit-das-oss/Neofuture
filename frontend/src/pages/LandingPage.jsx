import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, AlertTriangle, FileText, MessageSquare, ChevronRight, Lock } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, desc }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col items-start border-t border-white/20"
  >
    <div className="p-3 bg-white/5 rounded-xl text-primary-green mb-4">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-slate-400">{desc}</p>
  </motion.div>
);

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-navy relative overflow-hidden">
      {/* Background Gradients & Effects */}
      <div className="absolute inset-0 bg-cyber-grid opacity-30 z-0 pointer-events-none"></div>
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-saffron/20 blur-[150px] rounded-full point-events-none z-0"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary-green/10 blur-[150px] rounded-full point-events-none z-0"></div>

      {/* Navbar */}
      <nav className="relative z-10 flex justify-between items-center p-6 lg:px-20 border-b border-white/10 glass-panel">
        <div className="flex items-center gap-2 group cursor-pointer text-white">
          <ShieldCheck className="text-primary-green group-hover:text-saffron transition-colors" size={28} />
          <span className="text-2xl font-black tracking-tight">Sentinel <span className="text-saffron text-glow">AI</span></span>
        </div>
        <div className="flex gap-4">
          <Link to="/login" className="px-5 py-2 text-white font-medium hover:text-saffron transition-colors">Login</Link>
          <Link to="/signup" className="px-5 py-2 bg-saffron hover:bg-orange-500 text-navy font-bold rounded-lg transition-all shadow-lg hover:shadow-saffron/50">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-24 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-primary-green/30 text-primary-green text-sm mb-8">
             <span className="w-2 h-2 rounded-full bg-primary-green animate-pulse"></span>
             Protecting Digital India 24/7
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            Secure Bharat’s <br/> Digital Space with <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron to-[#FF7000]">AI</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Advanced AI-powered threat detection and prevention tailored for the unique cybersecurity landscape of India.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup" className="px-8 py-4 bg-saffron hover:bg-orange-500 text-navy font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(255,153,51,0.4)] hover:shadow-[0_0_30px_rgba(255,153,51,0.6)] flex items-center justify-center gap-2 text-lg">
              Get Started <ChevronRight size={20} />
            </Link>
            <Link to="/dashboard" className="px-8 py-4 glass-panel glass-panel-hover text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-lg">
              Live Demo
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Problem Section (Indian Context) */}
      <div className="relative z-10 bg-dark/50 py-24 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">The Threats Are Evolving</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">India faces a unique surge in sophisticated cybercrimes targeting everyday digital citizens.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div whileHover={{ scale: 1.02 }} className="glass-panel p-8 rounded-2xl border-l-4 border-l-red-500">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-3"><AlertTriangle className="text-red-500" /> UPI Frauds</h3>
              <p className="text-slate-400">Scammers trick users into entering their UPI PINs by pretending to process refunds or verify accounts.</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="glass-panel p-8 rounded-2xl border-l-4 border-l-saffron">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-3"><Lock className="text-saffron" /> OTP Compromise</h3>
              <p className="text-slate-400">Malicious apps and smishing links steal OTPs to bypass 2FA and hijack personal accounts.</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="glass-panel p-8 rounded-2xl border-l-4 border-l-orange-500">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-3"><FileText className="text-orange-500" /> WhatsApp Phishing</h3>
              <p className="text-slate-400">Fraudulent lottery and job offer messages spread rapidly, leading to major financial theft.</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
         <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Next-Gen Defense Arsenal</h2>
            <p className="text-slate-400 text-lg">Proactive protection powered by cutting-edge artificial intelligence.</p>
          </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            icon={ShieldCheck} 
            title="AI Threat Detection" 
            desc="Scans texts, links, and behaviors to detect zero-day phishing and fraud attempts instantly." 
          />
          <FeatureCard 
            icon={AlertTriangle} 
            title="Real-Time Alerts" 
            desc="Stay informed with immediate notifications when a risk is identified in your network." 
          />
          <FeatureCard 
            icon={FileText} 
            title="Smart Logs" 
            desc="Comprehensive dashboards to track history, analyze threat vectors, and export data." 
          />
          <FeatureCard 
            icon={MessageSquare} 
            title="AI Assistant" 
            desc="A dedicated 24/7 AI chat assistant to verify suspicious links or explain vulnerabilities." 
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-dark/80 py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-white">
            <ShieldCheck className="text-primary-green" size={24} />
            <span className="text-xl font-bold tracking-tight">Sentinel AI</span>
          </div>
          <p className="text-slate-500 text-sm">© 2026 Sentinel AI. Securing Digital India.</p>
          <div className="flex gap-4 text-slate-400">
            <a href="#" className="hover:text-primary-green transition">Privacy</a>
            <a href="#" className="hover:text-primary-green transition">Terms</a>
            <a href="#" className="hover:text-primary-green transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
