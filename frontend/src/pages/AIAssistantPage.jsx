import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, ShieldCheck } from 'lucide-react';

const DUMMY_CHAT = [
  { id: 1, sender: 'bot', text: 'Hello! I am your Sentinel AI Assistant. I can help analyze messages, explain threats, or guide you on cybersecurity best practices. How can I help you today?' }
];

const AIAssistantPage = () => {
  const [messages, setMessages] = useState(DUMMY_CHAT);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let botResponse = "I've analyzed that input. Based on current threat intelligence, it seems suspicious. Avoid sharing any OTPs or UPI PINs.";
      
      if (userMsg.text.toLowerCase().includes('safe')) {
        botResponse = "To determine if a message is safe, I look for urgency markers, unknown links, and requests for financial data. You can paste the exact message here or in the AI Engine for a deep scan.";
      } else if (userMsg.text.toLowerCase().includes('explain')) {
        botResponse = "A phishing attack is when a scammer pretends to be a trusted entity (like your bank or a government official) to trick you into revealing sensitive info. In India, this often happens via fake SMS or WhatsApp messages about blocked accounts.";
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: botResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  const predefinedQueries = [
    "Is this message safe?",
    "Explain UPI fraud",
    "How to spot phishing?"
  ];

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col md:flex-row gap-6">
      {/* Side Panel */}
      <div className="hidden md:flex w-72 flex-col gap-4">
        <div className="glass-panel p-6 rounded-2xl flex-1">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
            <div className="p-3 bg-primary-green/20 text-primary-green rounded-xl">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="text-white font-bold">Sentinel AI</h3>
              <p className="text-sm text-slate-400">Online & ready</p>
            </div>
          </div>
          <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Suggested Queries</h4>
          <div className="space-y-2">
            {predefinedQueries.map((q, i) => (
              <button 
                key={i}
                onClick={() => setInput(q)}
                className="w-full text-left p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-sm transition border border-white/5 hover:border-primary-green/30"
              >
                "{q}"
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 glass-panel rounded-2xl flex flex-col overflow-hidden border border-white/10 relative">
        <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none"></div>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10 scroll-smooth">
          {messages.map((msg) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.sender === 'user' ? 'bg-saffron text-navy' : 'bg-primary-green/20 text-primary-green border border-primary-green/30'
              }`}>
                {msg.sender === 'user' ? <User size={20} /> : <Bot size={20} />}
              </div>
              <div className={`max-w-[75%] p-4 rounded-2xl ${
                msg.sender === 'user' 
                  ? 'bg-saffron/10 text-white border border-saffron/20 rounded-tr-none' 
                  : 'bg-white/5 text-slate-200 border border-white/10 rounded-tl-none'
              }`}>
                <p className="leading-relaxed">{msg.text}</p>
              </div>
            </motion.div>
          ))}
          {isTyping && (
             <motion.div 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }}
             className="flex gap-4"
           >
             <div className="w-10 h-10 rounded-full bg-primary-green/20 text-primary-green border border-primary-green/30 flex items-center justify-center">
               <Bot size={20} />
             </div>
             <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-2xl rounded-tl-none flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-primary-green animate-bounce text-primary-green"></span>
               <span className="w-2 h-2 rounded-full bg-primary-green animate-bounce text-primary-green" style={{ animationDelay: '0.2s' }}></span>
               <span className="w-2 h-2 rounded-full bg-primary-green animate-bounce text-primary-green" style={{ animationDelay: '0.4s' }}></span>
             </div>
           </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-dark/80 border-t border-white/10 relative z-10">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Sentinel AI a security question..." 
              className="w-full bg-navy border border-white/10 rounded-xl py-4 pl-4 pr-16 text-white focus:outline-none focus:border-primary-green/50 transition shadow-inner"
            />
            <button 
              type="submit"
              disabled={!input.trim()}
              className="absolute right-2 p-2 bg-primary-green text-navy rounded-lg hover:bg-green-500 disabled:opacity-50 disabled:bg-white/10 disabled:text-slate-500 transition-colors"
            >
              <Send size={20} />
            </button>
          </form>
          <div className="text-center mt-2">
            <span className="text-[10px] text-slate-500">AI can make mistakes. Verify critical security actions independently.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPage;
