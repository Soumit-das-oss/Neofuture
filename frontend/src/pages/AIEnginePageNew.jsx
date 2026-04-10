import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Upload, Link as LinkIcon, MessageSquare, CheckCircle, AlertCircle, Clock, Settings, Play, RotateCcw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const performanceData = [
  { time: '00:00', accuracy: 98.5, speed: 95 },
  { time: '04:00', accuracy: 98.8, speed: 97 },
  { time: '08:00', accuracy: 99.1, speed: 98 },
  { time: '12:00', accuracy: 99.2, speed: 99 },
  { time: '16:00', accuracy: 99.0, speed: 98 },
  { time: '20:00', accuracy: 99.3, speed: 99.2 },
  { time: '24:00', accuracy: 99.1, speed: 98.9 },
];

const analysisTypes = [
  { id: 1, name: 'UPI Payment Analysis', description: 'Analyze UPI transactions and detect suspicious patterns', icon: '💳', processing: 45 },
  { id: 2, name: 'Link Verification', description: 'Check URLs and links for phishing and malware', icon: '🔗', processing: 0 },
  { id: 3, name: 'Text Analysis', description: 'Scan messages for fraud and phishing attempts', icon: '📝', processing: 0 },
  { id: 4, name: 'Behavior Analysis', description: 'Monitor account behaviors for anomalies', icon: '🔍', processing: 0 },
];

const recentAnalyses = [
  { id: 1, type: 'UPI Payment', target: 'Transaction #12345', risk: 'high', timestamp: '2m ago', result: 'Blocked' },
  { id: 2, type: 'Link Check', target: 'redirects.example.com', risk: 'high', timestamp: '5m ago', result: 'Malware Detected' },
  { id: 3, type: 'Text Analysis', target: 'WhatsApp Message', risk: 'medium', timestamp: '15m ago', result: 'Suspicious' },
  { id: 4, type: 'Behavior', target: 'Account Login', risk: 'low', timestamp: '1h ago', result: 'Normal' },
];

const AIEnginePage = () => {
  const [activeTab, setActiveTab] = useState('analyze');
  const [selectedType, setSelectedType] = useState(null);
  const [inputText, setInputText] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState(null);

  const handleAnalyze = () => {
    setIsScanning(true);
    setTimeout(() => {
      setResults({
        input: inputText,
        riskLevel: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
        confidence: (95 + Math.random() * 5).toFixed(1),
        threats: Math.floor(Math.random() * 5),
        details: [
          'Domain reputation check: Suspicious',
          'SSL certificate analysis: Valid',
          'Content analysis: Phishing patterns detected',
          'Historical data: Known malicious link',
        ]
      });
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-black text-white mb-2">AI Analysis Engine</h1>
        <p className="text-slate-400">Advanced threat detection and analysis powered by AI</p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10">
        {['analyze', 'performance', 'history'].map((tab) => (
          <motion.button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-semibold capitalize transition-colors relative group ${
              activeTab === tab ? 'text-saffron' : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-saffron to-orange-500"
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Analyze Tab */}
      <AnimatePresence mode="wait">
        {activeTab === 'analyze' && (
          <motion.div
            key="analyze"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Analysis Type Selection */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3 className="text-lg font-bold text-white mb-4">Select Analysis Type</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {analysisTypes.map((type, index) => (
                  <motion.button
                    key={type.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedType(type.id)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-4 rounded-xl transition-all text-left border-2 group relative overflow-hidden ${
                      selectedType === type.id
                        ? 'bg-saffron/20 border-saffron'
                        : 'bg-white/5 border-white/10 hover:border-saffron/50'
                    }`}
                  >
                    <div className="relative z-10">
                      <div className="text-3xl mb-2">{type.icon}</div>
                      <p className="font-bold text-white text-sm">{type.name}</p>
                      <p className="text-xs text-slate-400 mt-1">{type.description}</p>
                      {type.processing > 0 && (
                        <div className="mt-3 flex items-center gap-2">
                          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-saffron to-orange-500"
                              animate={{ width: `${type.processing}%` }}
                              transition={{ duration: 0.5 }}
                            />
                          </div>
                          <span className="text-xs text-saffron font-bold">{type.processing}%</span>
                        </div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Input Area */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-bold text-white">Provide Input for Analysis</h3>
              <div className="glass-panel p-6 rounded-2xl border border-white/10">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste link, text, or UPI details here for analysis..."
                  className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:border-saffron/50 focus:ring-1 focus:ring-saffron/20 resize-none"
                />
                <div className="flex gap-3 mt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAnalyze}
                    disabled={!inputText || isScanning}
                    className="flex items-center gap-2 px-6 py-2 bg-saffron hover:bg-orange-500 disabled:opacity-50 text-navy font-bold rounded-lg transition-all"
                  >
                    {isScanning ? (
                      <>
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
                          <Zap size={18} />
                        </motion.div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Play size={18} />
                        Analyze
                      </>
                    )}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
                  >
                    <RotateCcw size={18} />
                    Clear
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Analysis Results */}
            <AnimatePresence>
              {results && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-bold text-white">Analysis Results</h3>
                  <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
                    {/* Risk Assessment */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white/5 p-4 rounded-xl text-center">
                        <p className="text-slate-400 text-sm mb-2">Risk Level</p>
                        <p className={`text-2xl font-black ${
                          results.riskLevel === 'high' ? 'text-red-400' :
                          results.riskLevel === 'medium' ? 'text-saffron' :
                          'text-primary-green'
                        }`}>
                          {results.riskLevel.toUpperCase()}
                        </p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-xl text-center">
                        <p className="text-slate-400 text-sm mb-2">AI Confidence</p>
                        <p className="text-2xl font-black text-blue-400">{results.confidence}%</p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-xl text-center">
                        <p className="text-slate-400 text-sm mb-2">Threats Found</p>
                        <p className="text-2xl font-black text-orange-400">{results.threats}</p>
                      </div>
                    </div>

                    {/* Detailed Analysis */}
                    <div>
                      <p className="font-bold text-white mb-3">Detailed Analysis</p>
                      <div className="space-y-2">
                        {results.details.map((detail, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
                          >
                            <CheckCircle size={18} className="text-primary-green flex-shrink-0" />
                            <p className="text-slate-300 text-sm">{detail}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-white/10">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg font-semibold text-sm transition-all"
                      >
                        Block This Threat
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="px-4 py-2 bg-primary-green/20 hover:bg-primary-green/30 text-primary-green rounded-lg font-semibold text-sm transition-all"
                      >
                        Trust This
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold text-sm transition-all"
                      >
                        Export Report
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Performance Tab */}
        {activeTab === 'performance' && (
          <motion.div
            key="performance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="glass-panel p-6 rounded-2xl border border-white/10">
              <h3 className="text-lg font-bold text-white mb-6">AI Engine Performance Metrics</h3>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF9933" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#FF9933" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="time" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" domain={[90, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(15,23,42,0.9)', border: '1px solid rgba(255,153,51,0.3)', borderRadius: '8px' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="accuracy" stroke="#FF9933" fillOpacity={1} fill="url(#colorAccuracy)" name="Accuracy %" />
                  <Area type="monotone" dataKey="speed" stroke="#00FF66" fillOpacity={0.2} name="Speed %" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: 'Average Accuracy', value: '99.1%', icon: '🎯' },
                { label: 'Avg Response Time', value: '123ms', icon: '⚡' },
                { label: 'Analyses Today', value: '2,847', icon: '📊' },
                { label: 'Model Version', value: 'v3.2', icon: '🔄' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4 }}
                  className="glass-panel p-4 rounded-xl border border-white/10"
                >
                  <p className="text-3xl mb-2">{stat.icon}</p>
                  <p className="text-sm text-slate-400 mb-1">{stat.label}</p>
                  <p className="text-xl font-black text-white">{stat.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <motion.div
            key="history"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold text-white">Recent Analyses</h3>
            <div className="space-y-3">
              {recentAnalyses.map((analysis, i) => (
                <motion.div
                  key={analysis.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-panel p-4 rounded-xl border border-white/10 flex items-center justify-between hover:border-saffron/50 transition-colors group cursor-pointer"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="font-bold text-white">{analysis.type}</p>
                      <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                        analysis.risk === 'high' ? 'bg-red-500/20 text-red-300' :
                        analysis.risk === 'medium' ? 'bg-saffron/20 text-saffron' :
                        'bg-primary-green/20 text-primary-green'
                      }`}>
                        {analysis.risk.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400">{analysis.target}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-300">{analysis.result}</p>
                    <p className="text-xs text-slate-500">{analysis.timestamp}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIEnginePage;
