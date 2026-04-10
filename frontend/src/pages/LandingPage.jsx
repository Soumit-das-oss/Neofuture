import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, AlertTriangle, FileText, MessageSquare, ChevronRight, Lock, Sparkles, Zap, Eye } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, desc }) => (
  <motion.div 
    whileHover={{ y: -5, scale: 1.02 }}
    className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col items-start border-t border-white/20 group hover:border-saffron/50 transition-colors"
  >
    <div className="p-3 bg-white/5 group-hover:bg-saffron/10 rounded-xl text-primary-green group-hover:text-saffron mb-4 transition-colors">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-slate-400">{desc}</p>
  </motion.div>
);

// 3D Canvas Component for Indian Theme
const Canvas3D = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    let animationFrameId;
    let time = 0;
    
    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 3 + 1,
      color: ['#FF9933', '#00FF66', '#1E90FF'][Math.floor(Math.random() * 3)],
    }));
    
    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        
        ctx.fillStyle = p.color + '80';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 150) {
            ctx.strokeStyle = `rgba(255, 153, 51, ${0.2 * (1 - dist / 150)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });
      
      // Draw rotating 3D-like circles
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 80;
      
      ctx.strokeStyle = 'rgba(255, 153, 51, 0.3)';
      ctx.lineWidth = 2;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius + i * 30, 0, Math.PI * 2);
        ctx.stroke();
        
        // Rotate points on circles
        const angle = (time * 0.02 + (i * Math.PI * 2) / 3);
        const x = centerX + Math.cos(angle) * (radius + i * 30);
        const y = centerY + Math.sin(angle) * (radius + i * 30);
        ctx.fillStyle = '#FF9933';
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
      }
      
      time++;
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);
  
  return <canvas ref={canvasRef} className="w-full h-full" />;
};

const LandingPage = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <div className="min-h-screen bg-navy relative overflow-hidden">
      {/* Background Gradients & Effects */}
      <div className="absolute inset-0 bg-cyber-grid opacity-30 z-0 pointer-events-none"></div>
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-saffron/20 blur-[150px] rounded-full point-events-none z-0"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary-green/10 blur-[150px] rounded-full point-events-none z-0"></div>
      
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Canvas3D />
      </div>

      {/* Navbar */}
      <nav className="relative z-20 flex justify-between items-center p-6 lg:px-20 border-b border-white/10 glass-panel backdrop-blur-md">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 group cursor-pointer text-white"
        >
          <ShieldCheck className="text-primary-green group-hover:text-saffron transition-colors" size={28} />
          <span className="text-2xl font-black tracking-tight">
            Sentinel <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron to-orange-500 text-glow">AI</span>
          </span>
        </motion.div>
        <div className="flex gap-4">
          <Link to="/login" className="px-5 py-2 text-white font-medium hover:text-saffron transition-colors">Login</Link>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/signup" className="px-5 py-2 bg-saffron hover:bg-orange-500 text-navy font-bold rounded-lg transition-all shadow-lg hover:shadow-saffron/50">
              Get Started
            </Link>
          </motion.div>
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
