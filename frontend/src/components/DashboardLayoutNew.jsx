import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Zap, Activity, MessageSquare, Bell, User, Menu, X, ShieldCheck, LogOut, Settings, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SidebarItem = ({ icon: Icon, label, path, active, onClick }) => (
  <Link 
    to={path} 
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
      active 
        ? 'bg-gradient-to-r from-saffron/20 to-orange-500/20 text-saffron border border-saffron/40 shadow-lg shadow-saffron/20' 
        : 'text-slate-300 hover:bg-white/5 hover:text-white hover:border hover:border-white/10'
    }`}
  >
    <Icon size={20} className={`transition-colors ${active ? 'text-saffron' : 'group-hover:text-saffron'}`} />
    <span className="font-semibold">{label}</span>
    {active && <div className="ml-auto w-2 h-2 rounded-full bg-saffron animate-pulse"></div>}
  </Link>
);

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'AI Engine', path: '/dashboard/engine', icon: Zap },
    { label: 'Logs', path: '/dashboard/logs', icon: Activity },
    { label: 'AI Assistant', path: '/dashboard/assistant', icon: MessageSquare },
  ];

  const notifications = [
    { id: 1, title: 'High Risk Threat Detected', desc: 'Phishing attempt on UPI app detected', time: '5m ago', icon: '🚨' },
    { id: 2, title: 'System Update Complete', desc: 'AI detection model updated to v2.1', time: '2h ago', icon: '✅' },
    { id: 3, title: 'Scan Completed', desc: '15 threats blocked today', time: '3h ago', icon: '🛡️' },
  ];

  const pageTitle = location.pathname === '/dashboard' ? 'Dashboard' : 
                    location.pathname === '/dashboard/engine' ? 'AI Engine' :
                    location.pathname === '/dashboard/logs' ? 'Logs' :
                    location.pathname === '/dashboard/assistant' ? 'AI Assistant' : 'Dashboard';

  return (
    <div className="min-h-screen bg-navy flex flex-col md:flex-row relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 bg-cyber-grid opacity-[0.15] z-0 pointer-events-none"></div>
      <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] bg-saffron/10 blur-[120px] rounded-full pointer-events-none z-0"></div>
      
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 glass-panel relative z-20 border-b border-white/10">
        <div className="flex items-center gap-2">
          <ShieldCheck className="text-primary-green" size={24} />
          <span className="text-lg font-black text-white">Sentinel <span className="text-saffron">AI</span></span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-slate-300 p-2 hover:bg-white/10 rounded-lg">
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
            className={`fixed md:relative z-30 w-64 h-screen glass-panel border-r border-white/10 flex-shrink-0 flex flex-col p-6 transition-transform overflow-y-auto ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
            }`}
          >
            {/* Logo */}
            <div className="hidden md:flex items-center gap-2 mb-10 text-white cursor-pointer px-2 hover:text-saffron transition-colors">
              <ShieldCheck className="text-primary-green" size={28} />
              <span className="text-2xl font-black tracking-tight">Sentinel <span className="text-saffron">AI</span></span>
            </div>

            {/* Navigation */}
            <div className="flex-1 flex flex-col gap-3 relative z-10">
              <p className="text-xs font-bold text-slate-500 uppercase px-2 mb-2">MAIN MENU</p>
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

            {/* Settings & Sign Out */}
            <div className="mt-auto pt-6 border-t border-white/10 flex flex-col gap-3 relative z-10">
              <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-white/5 hover:text-white transition-all group">
                <Settings size={20} className="group-hover:text-primary-green transition-colors" />
                <span className="font-semibold">Settings</span>
              </Link>
              <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition-all group">
                <LogOut size={20} />
                <span className="font-semibold">Sign Out</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative z-10 h-screen overflow-hidden">
        {/* Top Navbar */}
        <motion.header 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="hidden md:flex items-center justify-between p-6 glass-panel border-b border-white/10 sticky top-0 z-20"
        >
          <div className="flex items-center gap-4 flex-1">
            <h2 className="text-2xl font-bold text-white capitalize">{pageTitle}</h2>
            <div className="h-10 px-4 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2 flex-1 max-w-xs group hover:border-white/20 transition-colors">
              <Search size={18} className="text-slate-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent text-white outline-none w-full placeholder-slate-500 text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Notifications */}
            <div className="relative">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setNotificationOpen(!notificationOpen)}
                className="relative text-slate-300 hover:text-saffron transition p-2 hover:bg-white/5 rounded-lg"
              >
                <Bell size={24} />
                <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-navy animate-pulse"></span>
              </motion.button>

              {/* Notification Dropdown */}
              <AnimatePresence>
                {notificationOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-80 glass-panel rounded-2xl border border-white/10 shadow-2xl p-4 space-y-3 z-50"
                  >
                    {notifications.map((notif) => (
                      <motion.div 
                        key={notif.id}
                        whileHover={{ x: 4 }}
                        className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer border border-white/5"
                      >
                        <div className="flex gap-3">
                          <div className="text-2xl">{notif.icon}</div>
                          <div className="flex-1 text-left">
                            <p className="text-sm font-bold text-white">{notif.title}</p>
                            <p className="text-xs text-slate-400">{notif.desc}</p>
                            <p className="text-xs text-slate-500 mt-1">{notif.time}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Dropdown */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-3 cursor-pointer hover:bg-white/5 px-3 py-2 rounded-lg transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-saffron to-orange-500 border-2 border-saffron/50 flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-bold text-white">Admin User</p>
                  <p className="text-xs text-slate-400">Security Team</p>
                </div>
              </motion.button>

              {/* User Dropdown Menu */}
              <AnimatePresence>
                {userDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 glass-panel rounded-2xl border border-white/10 shadow-2xl p-4 space-y-2 z-50"
                  >
                    <Link 
                      to="/" 
                      className="flex items-center gap-3 px-4 py-2 rounded-lg text-slate-300 hover:bg-white/10 hover:text-white transition-colors text-sm"
                    >
                      <User size={16} /> Profile
                    </Link>
                    <Link 
                      to="/" 
                      className="flex items-center gap-3 px-4 py-2 rounded-lg text-slate-300 hover:bg-white/10 hover:text-white transition-colors text-sm"
                    >
                      <Settings size={16} /> Settings
                    </Link>
                    <hr className="border-white/10 my-2" />
                    <Link 
                      to="/" 
                      className="flex items-center gap-3 px-4 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors text-sm"
                    >
                      <LogOut size={16} /> Sign Out
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
