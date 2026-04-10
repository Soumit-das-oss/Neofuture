import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, AlertTriangle, FileText, MessageSquare, ChevronRight, Lock, Zap, Award, Globe, Gauge } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, desc, index }) => (
  <motion.div 
    whileHover={{ y: -8, scale: 1.02 }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col items-start border-t border-white/20 group hover:border-saffron/50 transition-colors"
  >
    <div className="p-3 bg-white/5 group-hover:bg-saffron/10 rounded-xl text-primary-green group-hover:text-saffron mb-4 transition-colors">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-slate-400 text-sm">{desc}</p>
  </motion.div>
);

// 3D Canvas Component with Indian Theme
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
    
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2.5,
      vy: (Math.random() - 0.5) * 2.5,
      size: Math.random() * 3 + 1,
      color: ['#FF9933', '#00FF66', '#1E90FF', '#FFB81C'][Math.floor(Math.random() * 4)],
      rotation: Math.random() * Math.PI * 2,
    }));
    
    const animate = () => {
      // Fade trail effect
      ctx.fillStyle = 'rgba(15, 23, 42, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += 0.02;
        
        // Wrap around
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        
        // Draw glowing particles
        ctx.fillStyle = p.color + 'CC';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Glow effect
        ctx.strokeStyle = p.color + '66';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.stroke();
        
        // Draw connections between nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 120) {
            const opacity = 0.3 * (1 - dist / 120);
            ctx.strokeStyle = `rgba(255, 153, 51, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });
      
      // Draw animated 3D-like rotating circles (Ashoka Chakra inspired)
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      for (let ring = 0; ring < 4; ring++) {
        const radius = 60 + ring * 40;
        const angle = (time * 0.015) + (ring * Math.PI * 0.5);
        
        // Draw ring
        ctx.strokeStyle = `rgba(255, 153, 51, ${0.2 - ring * 0.04})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
        
        // Draw rotating points
        for (let point = 0; point < 8; point++) {
          const pointAngle = angle + (point * Math.PI * 2) / 8;
          const x = centerX + Math.cos(pointAngle) * radius;
          const y = centerY + Math.sin(pointAngle) * radius;
          
          ctx.fillStyle = ring === 0 ? '#FF9933' : ring === 1 ? '#00FF66' : '#1E90FF';
          ctx.beginPath();
          ctx.arc(x, y, 3 + ring * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      time++;
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);
  
  return <canvas ref={canvasRef} className="w-full h-full" />;
};

const stats = [
  { label: 'Threats Blocked', value: '10M+', icon: ShieldCheck },
  { label: 'Users Protected', value: '5M+', icon: Globe },
  { label: 'Accuracy Rate', value: '99.8%', icon: Award },
  { label: 'Response Time', value: '<100ms', icon: Gauge },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-navy relative overflow-hidden">
      {/* Background Gradients & Effects */}
      <div className="absolute inset-0 bg-cyber-grid opacity-30 z-0 pointer-events-none"></div>
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-saffron/20 blur-[150px] rounded-full point-events-none z-0"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary-green/10 blur-[150px] rounded-full point-events-none z-0"></div>
      
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0 opacity-50">
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
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-32 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-primary-green/30 text-primary-green text-sm mb-8"
          >
             <span className="w-2 h-2 rounded-full bg-primary-green animate-pulse"></span>
             🇮🇳 Protecting Digital India 24/7
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight"
          >
            Secure Bharat's <br/> Digital Space with <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron via-orange-500 to-red-500 text-glow">AI</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Advanced AI-powered threat detection and prevention tailored for the unique cybersecurity landscape of India. Protect against UPI fraud, OTP compromise, and WhatsApp phishing with military-grade security.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/signup" className="px-8 py-4 bg-gradient-to-r from-saffron to-orange-500 hover:from-orange-500 hover:to-red-500 text-navy font-bold rounded-xl transition-all shadow-[0_0_30px_rgba(255,153,51,0.4)] hover:shadow-[0_0_40px_rgba(255,153,51,0.6)] flex items-center justify-center gap-2 text-lg group inline-block">
                Get Started <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link to="/dashboard" className="px-8 py-4 glass-panel glass-panel-hover text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-lg border border-primary-green/50 hover:border-saffron/50 inline-block">
                Live Demo <Zap size={20} />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 py-16 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="p-2 rounded-lg bg-white/5 inline-block mb-2 text-saffron">
                    <Icon size={24} />
                  </div>
                  <p className="text-2xl md:text-3xl font-black text-saffron mb-1">{stat.value}</p>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Problem Section (Indian Context) */}
      <div className="relative z-10 bg-dark/50 py-24 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">The Threats Are Evolving</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">India faces a unique surge in sophisticated cybercrimes targeting everyday digital citizens and businesses.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ scale: 1.05, y: -10 }}
              className="glass-panel p-8 rounded-2xl border-l-4 border-l-red-500 group hover:bg-red-500/5 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-500/10 rounded-lg text-red-500 text-2xl">💳</div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-white mb-3">UPI Frauds</h3>
                  <p className="text-slate-400">Scammers trick users into entering their UPI PINs through fake refund requests and account verification gimmicks.</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05, y: -10 }}
              className="glass-panel p-8 rounded-2xl border-l-4 border-l-saffron group hover:bg-saffron/5 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-saffron/10 rounded-lg text-saffron text-2xl">🔐</div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-white mb-3">OTP Compromise</h3>
                  <p className="text-slate-400">Malicious apps and smishing links steal OTPs to bypass 2FA and hijack banking, UPI, and social media accounts.</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05, y: -10 }}
              className="glass-panel p-8 rounded-2xl border-l-4 border-l-orange-500 group hover:bg-orange-500/5 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-500/10 rounded-lg text-orange-500 text-2xl">📱</div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-white mb-3">WhatsApp Phishing</h3>
                  <p className="text-slate-400">Fraudulent lottery, job offer, and investment messages spread rapidly, leading to massive financial losses.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
         <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           className="text-center mb-16"
         >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Next-Gen Defense Arsenal</h2>
            <p className="text-slate-400 text-lg">Proactive protection powered by cutting-edge artificial intelligence</p>
          </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            icon={ShieldCheck} 
            title="AI Threat Detection" 
            desc="Scans texts, links, and behaviors to detect zero-day phishing and fraud attempts instantly." 
            index={0}
          />
          <FeatureCard 
            icon={AlertTriangle} 
            title="Real-Time Alerts" 
            desc="Immediate notifications when suspicious activity is identified in your accounts and devices." 
            index={1}
          />
          <FeatureCard 
            icon={FileText} 
            title="Smart Logs & Reports" 
            desc="Comprehensive dashboards to track history, analyze threat vectors, and export detailed reports." 
            index={2}
          />
          <FeatureCard 
            icon={MessageSquare} 
            title="24/7 AI Assistant" 
            desc="Dedicated AI chat assistant to verify suspicious links, texts, and explain vulnerabilities instantly." 
            index={3}
          />
        </div>
      </div>

      {/* CTA Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="relative z-10 bg-gradient-to-r from-saffron/10 to-orange-500/10 border border-saffron/30 rounded-3xl max-w-4xl mx-auto mb-32 px-6 py-16 text-center"
      >
        <h3 className="text-3xl md:text-4xl font-black text-white mb-4">Ready to Protect Your Digital Life?</h3>
        <p className="text-slate-300 mb-8 text-lg">Join millions of Indians who trust Sentinel AI for their cybersecurity</p>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link to="/signup" className="px-10 py-4 bg-saffron hover:bg-orange-500 text-navy font-bold rounded-xl transition-all shadow-lg inline-block">
            Start Free Trial →
          </Link>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-dark/80 py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-white">
            <ShieldCheck className="text-primary-green" size={24} />
            <span className="text-xl font-bold tracking-tight">Sentinel AI</span>
          </div>
          <p className="text-slate-500 text-sm">© 2026 Sentinel AI. Securing Digital India.</p>
          <div className="flex gap-6 text-slate-400">
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
