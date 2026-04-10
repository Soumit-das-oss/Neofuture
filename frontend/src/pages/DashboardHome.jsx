import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, CheckCircle, Activity, AlertTriangle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', threats: 12 },
  { name: 'Tue', threats: 19 },
  { name: 'Wed', threats: 15 },
  { name: 'Thu', threats: 25 },
  { name: 'Fri', threats: 8 },
  { name: 'Sat', threats: 40 },
  { name: 'Sun', threats: 22 },
];

const StatCard = ({ icon: Icon, title, value, color, glowColor }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass-panel p-6 rounded-2xl border-l-4"
    style={{ borderLeftColor: color }}
  >
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-slate-400 font-medium">{title}</h3>
      <div className="p-2 rounded-lg bg-white/5" style={{ color: color, boxShadow: `0 0 10px ${glowColor}` }}>
        <Icon size={24} />
      </div>
    </div>
    <p className="text-3xl font-black text-white">{value}</p>
  </motion.div>
);

const DashboardHome = () => {
  return (
    <div className="space-y-8 pb-10">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={ShieldAlert} title="Total Threats" value="1,204" 
          color="#FF9933" glowColor="rgba(255,153,51,0.3)" 
        />
        <StatCard 
          icon={AlertTriangle} title="High Risk" value="42" 
          color="#EF4444" glowColor="rgba(239,68,68,0.3)" 
        />
        <StatCard 
          icon={CheckCircle} title="Blocked Attacks" value="1,162" 
          color="#00FF66" glowColor="rgba(0,255,102,0.3)" 
        />
        <StatCard 
          icon={Activity} title="Active Scans" value="5" 
          color="#3B82F6" glowColor="rgba(59,130,246,0.3)" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Section */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl">
          <h2 className="text-xl font-bold text-white mb-6">Threat Activity Timeline</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF9933" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#FF9933" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" tick={{fill: '#64748b'}} axisLine={false} tickLine={false} />
                <YAxis stroke="#64748b" tick={{fill: '#64748b'}} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#020c1b', borderColor: '#ffffff20', color: '#fff', borderRadius: '8px' }}
                  itemStyle={{ color: '#FF9933' }}
                />
                <Area type="monotone" dataKey="threats" stroke="#FF9933" strokeWidth={3} fillOpacity={1} fill="url(#colorThreats)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Indicator */}
        <div className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-saffron/10 rounded-full blur-[50px] pointer-events-none"></div>
          <h2 className="text-xl font-bold text-white mb-8 self-start w-full text-left">System Status</h2>
          
          <div className="relative w-48 h-48 flex items-center justify-center mb-6">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="96" cy="96" r="88" stroke="#ffffff10" strokeWidth="12" fill="none" />
              <circle cx="96" cy="96" r="88" stroke="#FF9933" strokeWidth="12" fill="none" strokeDasharray="550" strokeDashoffset="220" className="drop-shadow-[0_0_8px_rgba(255,153,51,0.8)]" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-saffron">Medium</span>
              <span className="text-sm text-slate-400 mt-1">Risk Level</span>
            </div>
          </div>
          
          <p className="text-slate-400 text-sm">
            Elevated phishing activity detected in the region over the last 24 hours. AI vigilance increased.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
