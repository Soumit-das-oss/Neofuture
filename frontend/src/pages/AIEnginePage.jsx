import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, CheckCircle, Search, Shield, Zap } from 'lucide-react';

const AIEnginePage = () => {
  const [input, setInput] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = () => {
    if (!input.trim()) return;
    setAnalyzing(true);
    setResult(null);
    
    // Simulate API call
    setTimeout(() => {
      setAnalyzing(false);
      
      // Dummy logic based on input length/content
      const text = input.toLowerCase();
      if (text.includes('urgent') || text.includes('upi') || text.includes('pin') || text.includes('http')) {
        setResult({
          level: 'High',
          color: 'text-red-500',
          bgColor: 'bg-red-500/10',
          borderColor: 'border-red-500/50',
          icon: ShieldAlert,
          explanation: 'This message exhibits classic phishing patterns. It creates a false sense of urgency and asks for sensitive financial information or contains unverified links.',
          action: 'Do not click any links or share your UPI PIN. Report the sender immediately and block the number.'
        });
      } else {
         setResult({
          level: 'Low',
          color: 'text-primary-green',
          bgColor: 'bg-primary-green/10',
          borderColor: 'border-primary-green/50',
          icon: CheckCircle,
          explanation: 'No immediate threat signatures detected in this text. Structure appears normal.',
          action: 'Proceed with normal caution. Always verify the sender if they ask for money.'
        });
      }
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="glass-panel p-8 rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-saffron/20 text-saffron rounded-xl">
            <Zap size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">AI Threat Analyzer</h2>
            <p className="text-slate-400">Paste any suspicious message, email, or URL for instant analysis.</p>
          </div>
        </div>

        <textarea 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste message, URL, or text here... e.g. 'URGENT: Your SBI account is blocked. Click here to update PAN and enter UPI PIN.'"
          className="w-full h-40 bg-dark/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-primary-green/50 focus:ring-1 focus:ring-primary-green/50 transition-all placeholder:text-slate-600 resize-none mb-4"
        ></textarea>

        <div className="flex justify-end">
          <button 
            onClick={handleAnalyze}
            disabled={analyzing || !input.trim()}
            className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${
              analyzing || !input.trim() 
                ? 'bg-white/10 text-slate-400 cursor-not-allowed' 
                : 'bg-primary-green text-navy hover:bg-green-500 shadow-[0_0_15px_rgba(0,255,102,0.3)] hover:shadow-[0_0_25px_rgba(0,255,102,0.5)]'
            }`}
          >
            {analyzing ? (
              <>
                <span className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></span>
                Analyzing...
              </>
            ) : (
              <>
                <Search size={20} /> Analyze Text
              </>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`glass-panel p-8 rounded-2xl border-2 ${result.borderColor}`}
          >
            <div className="flex items-start gap-6">
              <div className={`p-4 rounded-xl ${result.bgColor} ${result.color}`}>
                <result.icon size={40} />
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">Threat Level</h3>
                  <p className={`text-3xl font-black ${result.color}`}>{result.level} Risk</p>
                </div>
                
                <div className="bg-dark/50 p-4 rounded-xl border border-white/5">
                  <h4 className="text-white font-bold mb-2">Explanation</h4>
                  <p className="text-slate-300 leading-relaxed">{result.explanation}</p>
                </div>

                <div className="bg-dark/50 p-4 rounded-xl border border-white/5 relative overflow-hidden">
                   <div className="absolute left-0 top-0 bottom-0 w-1 bg-saffron"></div>
                  <h4 className="text-white font-bold mb-2">Suggested Action</h4>
                  <p className="text-slate-300 leading-relaxed">{result.action}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIEnginePage;
