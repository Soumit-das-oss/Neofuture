import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Filter, Download, Eye, Trash2, AlertTriangle, CheckCircle, Clock, Shield } from 'lucide-react';

const logs = [
  {
    id: 1,
    timestamp: '2024-04-10 14:32:15',
    type: 'UPI FRAUD',
    severity: 'high',
    description: 'Suspicious UPI transaction attempt detected - User attempted to enter UPI PIN after receiving fake refund request',
    source: 'Mobile App',
    action: 'BLOCKED',
    details: 'Transaction blocked. User notified. Account marked for review.',
    icon: '💳'
  },
  {
    id: 2,
    timestamp: '2024-04-10 14:25:48',
    type: 'PHISHING LINK',
    severity: 'high',
    description: 'Malicious link detected in WhatsApp message - Redirects to fake banking website',
    source: 'WhatsApp Integration',
    action: 'BLOCKED',
    details: 'Link quarantined. Message flagged. User warned.',
    icon: '🔗'
  },
  {
    id: 3,
    timestamp: '2024-04-10 14:18:32',
    type: 'OTP COMPROMISE',
    severity: 'high',
    description: 'Unauthorized OTP request intercepted - Smishing attack detected',
    source: 'SMS Monitor',
    action: 'BLOCKED',
    details: 'OTP generation blocked. 2FA reinforced.',
    icon: '🔐'
  },
  {
    id: 4,
    timestamp: '2024-04-10 14:05:10',
    type: 'SUSPICIOUS LOGIN',
    severity: 'medium',
    description: 'Login attempt from unusual location detected',
    source: 'Account Monitor',
    action: 'FLAGGED',
    details: 'User challenged with additional verification.',
    icon: '🌍'
  },
  {
    id: 5,
    timestamp: '2024-04-10 13:52:45',
    type: 'MALWARE ATTEMPT',
    severity: 'high',
    description: 'Malicious app installation attempt blocked',
    source: 'App Scanner',
    action: 'BLOCKED',
    details: 'Installation prevented. App quarantined in cloud.',
    icon: '⚠️'
  },
  {
    id: 6,
    timestamp: '2024-04-10 13:40:22',
    type: 'SAFE ACTIVITY',
    severity: 'low',
    description: 'Normal online banking transaction completed',
    source: 'Transaction Monitor',
    action: 'ALLOWED',
    details: 'Transaction verified and completed successfully.',
    icon: '✅'
  },
];

const getSeverityColor = (severity) => {
  switch(severity) {
    case 'high':
      return 'bg-red-500/10 text-red-300 border-l-red-500';
    case 'medium':
      return 'bg-saffron/10 text-saffron border-l-saffron';
    case 'low':
      return 'bg-primary-green/10 text-primary-green border-l-primary-green';
    default:
      return 'bg-slate-500/10 text-slate-300 border-l-slate-500';
  }
};

const getActionColor = (action) => {
  switch(action) {
    case 'BLOCKED':
      return 'bg-red-500/20 text-red-300';
    case 'FLAGGED':
      return 'bg-saffron/20 text-saffron';
    case 'ALLOWED':
      return 'bg-primary-green/20 text-primary-green';
    default:
      return 'bg-slate-500/20 text-slate-300';
  }
};

const LogCard = ({ log, index }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`glass-panel border-l-4 rounded-xl overflow-hidden hover:shadow-xl transition-all cursor-pointer ${getSeverityColor(log.severity)}`}
    >
      <div 
        onClick={() => setExpanded(!expanded)}
        className="p-4"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-4 flex-1">
            <div className="text-3xl mt-1">{log.icon}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h3 className="font-bold text-white">{log.type}</h3>
                <span className={`text-xs px-2 py-1 rounded-full font-bold uppercase ${getActionColor(log.action)}`}>
                  {log.action}
                </span>
              </div>
              <p className="text-sm text-slate-300 mb-2">{log.description}</p>
              <div className="flex flex-wrap gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  {log.timestamp}
                </div>
                <div className="flex items-center gap-1">
                  <Shield size={14} />
                  {log.source}
                </div>
              </div>
            </div>
          </div>
          <motion.button
            animate={{ rotate: expanded ? 180 : 0 }}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
          >
            <Eye size={18} className="text-slate-400" />
          </motion.button>
        </div>

        {/* Expanded Details */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: expanded ? 1 : 0, 
            height: expanded ? 'auto' : 0 
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          {expanded && (
            <div className="pt-4 border-t border-white/10 mt-4 space-y-4">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase mb-2">Details</p>
                <p className="text-sm text-slate-300">{log.details}</p>
              </div>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-semibold transition-all"
                >
                  <Eye size={14} />
                  View Details
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-semibold transition-all"
                >
                  <Download size={14} />
                  Export Log
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

const LogsPage = () => {
  const [filterType, setFilterType] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [dateRange, setDateRange] = useState('today');

  const filteredLogs = logs.filter(log => {
    if (filterType !== 'all' && log.type !== filterType) return false;
    if (filterSeverity !== 'all' && log.severity !== filterSeverity) return false;
    return true;
  });

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-black text-white mb-2">Security Logs</h1>
        <p className="text-slate-400">Detailed activity log of all threats and security events</p>
      </motion.div>

      {/* Filter Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="glass-panel p-6 rounded-2xl border border-white/10"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Date Range */}
          <div>
            <label className="text-sm font-bold text-slate-400 block mb-2">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-saffron/50 text-sm"
            >
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="all">All Time</option>
            </select>
          </div>

          {/* Threat Type */}
          <div>
            <label className="text-sm font-bold text-slate-400 block mb-2">Threat Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-saffron/50 text-sm"
            >
              <option value="all">All Types</option>
              <option value="UPI FRAUD">UPI Fraud</option>
              <option value="PHISHING LINK">Phishing Link</option>
              <option value="OTP COMPROMISE">OTP Compromise</option>
              <option value="MALWARE ATTEMPT">Malware</option>
            </select>
          </div>

          {/* Severity */}
          <div>
            <label className="text-sm font-bold text-slate-400 block mb-2">Severity</label>
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-saffron/50 text-sm"
            >
              <option value="all">All Levels</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex items-end gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-green/20 hover:bg-primary-green/30 text-primary-green rounded-lg font-semibold transition-all text-sm"
            >
              <Download size={16} />
              Export
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition-all text-sm"
            >
              <Filter size={16} />
              More
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Events', value: filteredLogs.length, icon: '📊' },
          { label: 'High Risk', value: filteredLogs.filter(l => l.severity === 'high').length, icon: '🚨', color: 'text-red-400' },
          { label: 'Threats Blocked', value: filteredLogs.filter(l => l.action === 'BLOCKED').length, icon: '🛡️' },
          { label: 'Last Event', value: '2m ago', icon: '⏱️' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -4 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-panel p-4 rounded-xl border border-white/10"
          >
            <p className="text-3xl mb-2">{stat.icon}</p>
            <p className="text-sm text-slate-400 mb-1">{stat.label}</p>
            <p className={`text-2xl font-black ${stat.color || 'text-white'}`}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Logs List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Activity Log ({filteredLogs.length})</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="text-sm text-saffron hover:text-orange-400 font-semibold"
          >
            View All
          </motion.button>
        </div>

        <div className="space-y-3">
          {filteredLogs.length > 0 ? (
            filteredLogs.map((log, index) => (
              <LogCard key={log.id} log={log} index={index} />
            ))
          ) : (
            <div className="text-center py-12 glass-panel rounded-xl border border-white/10">
              <p className="text-slate-400 text-lg">No logs found matching the criteria</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default LogsPage;
