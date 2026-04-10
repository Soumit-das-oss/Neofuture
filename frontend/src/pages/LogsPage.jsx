import React, { useState } from 'react';
import { Filter, Download, Search, ShieldAlert, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const DUMMY_LOGS = [
  { id: 'LOG-001', time: '10 mins ago', type: 'Phishing SMS (UPI)', severity: 'High', status: 'Blocked' },
  { id: 'LOG-002', time: '1 hr ago', type: 'Malicious URL', severity: 'Medium', status: 'Flagged' },
  { id: 'LOG-003', time: '3 hrs ago', type: 'Spam WhatsApp', severity: 'Low', status: 'Ignored' },
  { id: 'LOG-004', time: 'Yesterday', type: 'OTP Theft Attempt', severity: 'High', status: 'Blocked' },
  { id: 'LOG-005', time: 'Yesterday', type: 'Suspicious Email', severity: 'Medium', status: 'Flagged' },
  { id: 'LOG-006', time: '2 days ago', type: 'Fake Customer Care', severity: 'High', status: 'Blocked' },
  { id: 'LOG-007', time: '3 days ago', type: 'Network Scan', severity: 'Low', status: 'Ignored' },
];

const SeverityBadge = ({ severity }) => {
  const styles = {
    High: 'bg-red-500/20 text-red-500 border border-red-500/30',
    Medium: 'bg-saffron/20 text-saffron border border-saffron/30',
    Low: 'bg-primary-green/20 text-primary-green border border-primary-green/30'
  };
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold ${styles[severity]}`}>
      {severity}
    </span>
  );
};

const StatusIcon = ({ status }) => {
  if (status === 'Blocked') return <div className="flex items-center gap-2 text-primary-green"><CheckCircle size={16} /> Blocked</div>;
  if (status === 'Flagged') return <div className="flex items-center gap-2 text-saffron"><AlertTriangle size={16} /> Flagged</div>;
  return <div className="flex items-center gap-2 text-slate-400"><ShieldAlert size={16} /> Ignored</div>;
};

const LogsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = DUMMY_LOGS.filter(log => 
    log.type.toLowerCase().includes(searchTerm.toLowerCase()) || 
    log.severity.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-dark/30 p-6 rounded-2xl border border-white/5">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Threat Logs</h2>
          <p className="text-slate-400 text-sm">Monitor and export all historical security events.</p>
        </div>
        
        <div className="flex w-full md:w-auto gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search logs..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-navy border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white focus:outline-none focus:border-primary-green/50 text-sm"
            />
          </div>
          <button className="p-2 rounded-xl border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 transition flex-shrink-0">
            <Filter size={20} />
          </button>
          <button className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition flex-shrink-0">
            <Download size={20} />
          </button>
        </div>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-slate-400 text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold">Incident ID</th>
                <th className="p-4 font-semibold">Time</th>
                <th className="p-4 font-semibold">Threat Type</th>
                <th className="p-4 font-semibold">Severity</th>
                <th className="p-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log, index) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={log.id} 
                  className="border-b border-white/5 hover:bg-white/5 transition-colors group cursor-pointer"
                >
                  <td className="p-4 font-mono text-sm text-slate-300">{log.id}</td>
                  <td className="p-4 text-slate-400 text-sm">{log.time}</td>
                  <td className="p-4 text-white font-medium">{log.type}</td>
                  <td className="p-4"><SeverityBadge severity={log.severity} /></td>
                  <td className="p-4"><StatusIcon status={log.status} /></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          
          {filteredLogs.length === 0 && (
            <div className="p-8 text-center text-slate-400">
              No logs found matching your search.
            </div>
          )}
        </div>
        <div className="p-4 border-t border-white/10 flex justify-between items-center text-sm text-slate-400 bg-black/20">
          <span>Showing {filteredLogs.length} results</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded border border-white/10 hover:bg-white/5 disabled:opacity-50">Prev</button>
            <button className="px-3 py-1 rounded border border-white/10 hover:bg-white/5 disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogsPage;
