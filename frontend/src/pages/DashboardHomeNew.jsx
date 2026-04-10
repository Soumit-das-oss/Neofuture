import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, CheckCircle, Activity, AlertTriangle, TrendingUp, Clock, MapPin, Zap } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';

const data = [
  { name: 'Mon', threats: 12, blocked: 12 },
  { name: 'Tue', threats: 19, blocked: 18 },
  { name: 'Wed', threats: 15, blocked: 14 },
  { name: 'Thu', threats: 25, blocked: 24 },
  { name: 'Fri', threats: 8, blocked: 8 },
  { name: 'Sat', threats: 40, blocked: 38 },
  { name: 'Sun', threats: 22, blocked: 21 },
];

const threatTypes = [
  { name: 'UPI Fraud', value: 45, color: '#FF9933' },
  { name: 'Phishing', value: 30, color: '#00FF66' },
  { name: 'Malware', value: 15, color: '#1E90FF' },
  { name: 'Other', value: 10, color: '#FFB81C' },
];

const recentThreats = [
  { id: 1, type: 'UPI Fraud', message: 'Suspicious UPI payment attempt detected', time: '2m ago', severity: 'high', icon: '💳' },
  { id: 2, type: 'Phishing', message: 'Malicious link in WhatsApp message detected', time: '15m ago', severity: 'high', icon: '📱' },
  { id: 3, type: 'OTP Compromise', message: 'Unauthorized OTP request intercepted', time: '1h ago', severity: 'medium', icon: '🔐' },
  { id: 4, type: 'Malware', message: 'Suspicious app installation blocked', time: '3h ago', severity: 'high', icon: '⚠️' },
  { id: 5, type: 'Phishing', message: 'Fake banking website accessed', time: '5h ago', severity: 'low', icon: '🌐' },
];

const StatCard = ({ icon: Icon, title, value, change, color, glowColor }) => (
  <motion.div 
    whileHover={{ y: -8, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="glass-panel p-6 rounded-2xl border-l-4 hover:shadow-2xl transition-all cursor-pointer"
    style={{ borderLeftColor: color }}
  >
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-slate-400 font-semibold text-sm">{title}</h3>
      <div className="p-2 rounded-lg bg-white/5" style={{ color: color, boxShadow: `0 0 10px ${glowColor}` }}>
        <Icon size={24} />
      </div>
    </div>
    <div className="flex items-end justify-between">
      <p className="text-3xl font-black text-white">{value}</p>
      <div className={`flex items-center gap-1 text-xs font-bold ${change >= 0 ? 'text-red-400' : 'text-primary-green'}`}>
        <TrendingUp size={14} />
        {Math.abs(change)}%
      </div>
    </div>
  </motion.div>
);

const ThreatCard = ({ threat }) => (
  <motion.div 
    whileHover={{ x: 4 }}
    className={`glass-panel p-4 rounded-xl border-l-4 hover:shadow-xl transition-all cursor-pointer group ${
      threat.severity === 'high' ? 'border-l-red-500 hover:bg-red-500/5' :
      threat.severity === 'medium' ? 'border-l-saffron hover:bg-saffron/5' :
      'border-l-primary-green hover:bg-primary-green/5'
    }`}
  >
    <div className="flex items-start gap-4">
      <div className="text-2xl mt-1">{threat.icon}</div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <p className="font-bold text-white text-sm">{threat.type}</p>
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${
            threat.severity === 'high' ? 'bg-red-500/20 text-red-300' :
            threat.severity === 'medium' ? 'bg-saffron/20 text-saffron' :
            'bg-primary-green/20 text-primary-green'
          }`}>
            {threat.severity.toUpperCase()}
          </span>
        </div>
        <p className="text-slate-400 text-sm mb-2">{threat.message}</p>
        <p className="text-xs text-slate-500">{threat.time}</p>
      </div>
    </div>
  </motion.div>
);

const DashboardHome = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  return (
    <div className="space-y-8 pb-10">
      {/* Header with Filter */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-black text-white mb-2">Security Dashboard</h1>
          <p className="text-slate-400">Today's threat intelligence and security overview</p>
        </div>
        <div className="flex gap-2">
          {['day', 'week', 'month'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all capitalize ${
                selectedPeriod === period
                  ? 'bg-saffron text-navy shadow-lg'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={ShieldAlert} 
          title="Total Threats Detected" 
          value="1,204" 
          change={12}
          color="#FF9933" 
          glowColor="rgba(255,153,51,0.3)" 
        />
        <StatCard 
          icon={AlertTriangle} 
          title="High Risk Alerts" 
          value="42" 
          change={-5}
          color="#EF4444" 
          glowColor="rgba(239,68,68,0.3)" 
        />
        <StatCard 
          icon={CheckCircle} 
          title="Threats Blocked" 
          value="1,162" 
          change={8}
          color="#00FF66" 
          glowColor="rgba(0,255,102,0.3)" 
        />
        <StatCard 
          icon={Activity} 
          title="Active Scans" 
          value="5" 
          change={2}
          color="#1E90FF" 
          glowColor="rgba(30,144,255,0.3)" 
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Threat Timeline */}
        <motion.div
          whileHover={{ y: -4 }}
          className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-white/10 hover:border-saffron/30 transition-colors"
        >
          <h3 className="text-xl font-bold text-white mb-6">Threat Timeline</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF9933" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#FF9933" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(15,23,42,0.9)', border: '1px solid rgba(255,153,51,0.3)', borderRadius: '8px' }}
                labelStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="threats" stroke="#FF9933" fillOpacity={1} fill="url(#colorThreats)" name="Threats Detected" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Threat Distribution */}
        <motion.div
          whileHover={{ y: -4 }}
          className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-saffron/30 transition-colors"
        >
          <h3 className="text-xl font-bold text-white mb-6">Threat Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={threatTypes}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {threatTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(15,23,42,0.9)', border: '1px solid rgba(255,153,51,0.3)', borderRadius: '8px' }}
                labelStyle={{ color: '#fff' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2 text-sm">
            {threatTypes.map((type) => (
              <div key={type.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: type.color }}></div>
                <span className="text-slate-300">{type.name}: {type.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Blocked vs Detected */}
      <motion.div
        whileHover={{ y: -4 }}
        className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-saffron/30 transition-colors"
      >
        <h3 className="text-xl font-bold text-white mb-6">Detection & Blocking Performance</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(15,23,42,0.9)', border: '1px solid rgba(255,153,51,0.3)', borderRadius: '8px' }}
              labelStyle={{ color: '#fff' }}
            />
            <Legend />
            <Bar dataKey="threats" fill="#FF9933" name="Threats Detected" radius={[8, 8, 0, 0]} />
            <Bar dataKey="blocked" fill="#00FF66" name="Threats Blocked" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Recent Threats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">Recent Threats</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="text-saffron hover:text-orange-400 text-sm font-semibold"
          >
            View All →
          </motion.button>
        </div>
        <div className="space-y-3">
          {recentThreats.map((threat, index) => (
            <motion.div
              key={threat.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <ThreatCard threat={threat} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <motion.button
          whileHover={{ scale: 1.05, y: -4 }}
          whileTap={{ scale: 0.95 }}
          className="glass-panel p-4 rounded-xl border border-primary-green/50 hover:border-primary-green text-left group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-green/20 rounded-lg text-primary-green group-hover:bg-primary-green/30 transition-colors">
              <Zap size={20} />
            </div>
            <div>
              <p className="font-bold text-white text-sm">Run Full Scan</p>
              <p className="text-xs text-slate-400">Complete system scan</p>
            </div>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05, y: -4 }}
          whileTap={{ scale: 0.95 }}
          className="glass-panel p-4 rounded-xl border border-saffron/50 hover:border-saffron text-left group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-saffron/20 rounded-lg text-saffron group-hover:bg-saffron/30 transition-colors">
              <Clock size={20} />
            </div>
            <div>
              <p className="font-bold text-white text-sm">Schedule Scan</p>
              <p className="text-xs text-slate-400">Set auto-scan time</p>
            </div>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05, y: -4 }}
          whileTap={{ scale: 0.95 }}
          className="glass-panel p-4 rounded-xl border border-blue-500/50 hover:border-blue-500 text-left group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400 group-hover:bg-blue-500/30 transition-colors">
              <MapPin size={20} />
            </div>
            <div>
              <p className="font-bold text-white text-sm">View Threats Map</p>
              <p className="text-xs text-slate-400">Geo-location data</p>
            </div>
          </div>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default DashboardHome;
