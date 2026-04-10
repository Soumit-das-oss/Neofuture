import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Zap, Activity, MessageSquare, Bell, User, Menu, X, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SidebarItem = ({ icon: Icon, label, path, active, onClick }) => (
  <Link 
    to={path} 
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
      active 
        ? 'bg-primary-green/10 text-primary-green border border-primary-green/20 box-glow' 
        : 'text-slate-400 hover:bg-white/5 hover:text-white'
    }`}
  >
    <Icon size={20} className={active ? 'text-primary-green' : 'text-slate-400'} />
    <span className="font-medium">{label}</span>
  </Link>
);

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/dashboard', icon: LayoutDashboard },
    { label: 'AI Engine', path: '/dashboard/engine', icon: Zap },
    { label: 'Logs', path: '/dashboard/logs', icon: Activity },
    { label: 'AI Assistant', path: '/dashboard/assistant', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-navy flex flex-col md:flex-row relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 bg-cyber-grid opacity-[0.15] z-0 pointer-events-none"></div>
      
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 glass-panel relative z-20">
        <div className="flex items-center gap-2">
          <ShieldCheck className="text-primary-green" size={24} />
          <span className="text-xl font-black text-white">Sentinel <span className="text-saffron">AI</span></span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-slate-300">
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || window.innerWidth >= 768) && (
          <motion.div 
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className={`fixed md:relative z-30 w-64 h-full glass-panel border-r border-white/10 flex-shrink-0 flex flex-col p-6 transition-transform ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
            }`}
          >
            <div className="hidden md:flex items-center gap-2 mb-10 text-white cursor-pointer px-2">
              <ShieldCheck className="text-primary-green" size={28} />
              <span className="text-2xl font-black tracking-tight">Sentinel <span className="text-saffron text-glow">AI</span></span>
            </div>

            <div className="flex-1 flex flex-col gap-2 relative z-10">
              {navItems.map((item) => (
                <SidebarItem 
                  key={item.path}
                  icon={item.icon}
                  label={item.label}
                  path={item.path}
                  active={location.pathname === item.path}
                  onClick={() => setSidebarOpen(false)}
                />
              ))}
            </div>

            <div className="mt-auto pt-6 border-t border-white/5 relative z-10">
              <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-all">
                <ShieldCheck size={20} />
                <span className="font-medium">Sign Out</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative z-10 h-screen overflow-hidden">
        {/* Top Navbar */}
        <header className="hidden md:flex items-center justify-between p-6 glass-panel border-b border-white/5">
          <div>
             <h2 className="text-2xl font-bold text-white capitalize">{location.pathname.split('/').pop() || 'Dashboard'}</h2>
          </div>
          <div className="flex items-center gap-6">
             <button className="relative text-slate-300 hover:text-saffron transition">
               <Bell size={24} />
               <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-navy"></span>
             </button>
             <div className="flex items-center gap-3 cursor-pointer">
               <div className="w-10 h-10 rounded-full bg-saffron/20 border border-saffron/50 flex items-center justify-center text-saffron">
                 <User size={20} />
               </div>
               <div className="hidden lg:block">
                 <p className="text-sm font-bold text-white">Admin User</p>
                 <p className="text-xs text-slate-400">Security Team</p>
               </div>
             </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
