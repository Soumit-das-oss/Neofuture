import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageSquare, Lightbulb, Clock, AlertCircle, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';

const suggestedQuestions = [
  { icon: '💳', text: 'How can I protect my UPI transactions?', category: 'UPI Security' },
  { icon: '🔐', text: 'What should I do if my OTP is compromised?', category: 'OTP Safety' },
  { icon: '📱', text: 'How to identify phishing messages on WhatsApp?', category: 'Phishing' },
  { icon: '🛡️', text: 'What is 2FA and why is it important?', category: 'Security Basics' },
  { icon: '⚠️', text: 'My account shows suspicious activity, what do I do?', category: 'Account Security' },
  { icon: '🌐', text: 'How safe is online banking in India?', category: 'Banking Safety' },
];

const assistantResponses = {
  upi: {
    title: '💳 UPI Transaction Security',
    content: 'To protect your UPI transactions:\n\n1. Never share your UPI PIN with anyone\n2. Verify merchant details before authorizing transactions\n3. Use biometric authentication when available\n4. Enable transaction limits\n5. Monitor your transaction history regularly\n6. Avoid clicking links from unknown sources\n7. Use official banking apps only',
    tips: ['Always verify amounts before confirming', 'Use strong PINs', 'Update your app regularly']
  },
  otp: {
    title: '🔐 OTP Safety Guidelines',
    content: 'OTP (One-Time Password) security is critical:\n\n1. Never share your OTP with anyone\n2. Don\'t respond to OTP requests you didn\'t initiate\n3. Be aware of "OTP generation" scams\n4. Enable OTP notifications on your device\n5. Report suspicious OTP attempts immediately\n6. Use authenticator apps for additional security\n7. Set up account recovery options',
    tips: ['OTP is always 4-6 digits', 'Banks never ask for OTP via call', 'Act fast if OTP is exposed']
  },
  phishing: {
    title: '📱 Phishing Detection Tips',
    content: 'How to identify phishing attempts:\n\n1. Check sender\'s phone number/email carefully\n2. Look for spelling errors or poor grammar\n3. Be suspicious of urgent requests\n4. Don\'t click links in messages\n5. Hover over links to see actual URLs\n6. Verify logo and branding\n7. Contact the organization directly if unsure',
    tips: ['Legitimate banks don\'t ask for passwords', 'Watch for urgency tactics', 'Verify before clicking']
  },
  twofa: {
    title: '🛡️ Two-Factor Authentication (2FA)',
    content: '2FA adds an extra layer of security:\n\n1. Requires two types of verification\n2. Something you know (password) + something you have (phone/authenticator)\n3. Available methods: SMS, Email, Authenticator Apps\n4. Authenticator apps are more secure than SMS\n5. Keep backup codes in a safe place\n6. Enable 2FA on all critical accounts\n7. Never disable 2FA',
    tips: ['Use authenticator apps over SMS', 'Save backup codes', 'Keep recovery phone number updated']
  },
};

const ChatMessage = ({ message, isUser }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
  >
    <div className={`max-w-xs lg:max-w-md  p-4 rounded-2xl ${
      isUser 
        ? 'bg-saffron/20 border border-saffron/50 text-white rounded-br-none' 
        : 'bg-white/5 border border-white/10 text-slate-200 rounded-bl-none'
    }`}>
      {typeof message === 'string' ? (
        <p className="text-sm leading-relaxed">{message}</p>
      ) : (
        <div className="space-y-3">
          <h4 className="font-bold text-white">{message.title}</h4>
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          <div className="pt-2 border-t border-white/10">
            <p className="text-xs font-semibold text-saffron mb-2">💡 Quick Tips:</p>
            <ul className="space-y-1">
              {message.tips.map((tip, i) => (
                <li key={i} className="text-xs text-slate-300">• {tip}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  </motion.div>
);

const AIAssistantPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! I\'m Sentinel AI Assistant. I\'m here to help you understand cybersecurity threats and how to protect yourself. Ask me anything about UPI fraud, phishing, OTP safety, or general security practices. 🛡️', isUser: false }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text = null) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    // Add user message
    const userMessage = { id: Date.now(), text: messageText, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      let response;
      const lowerText = messageText.toLowerCase();

      if (lowerText.includes('upi') || lowerText.includes('payment')) {
        response = { id: Date.now() + 1, text: assistantResponses.upi, isUser: false };
      } else if (lowerText.includes('otp') || lowerText.includes('password')) {
        response = { id: Date.now() + 1, text: assistantResponses.otp, isUser: false };
      } else if (lowerText.includes('phishing') || lowerText.includes('message') || lowerText.includes('whatsapp')) {
        response = { id: Date.now() + 1, text: assistantResponses.phishing, isUser: false };
      } else if (lowerText.includes('2fa') || lowerText.includes('two factor')) {
        response = { id: Date.now() + 1, text: assistantResponses.twofa, isUser: false };
      } else {
        response = { 
          id: Date.now() + 1, 
          text: 'I can help you with questions about:\n\n• UPI Payment Security\n• OTP Protection\n• Phishing Detection\n• Two-Factor Authentication\n• General Cybersecurity Tips\n\nTry asking about any of these topics or describe your security concern!', 
          isUser: false 
        };
      }

      setMessages(prev => [...prev, response]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-8 pb-10 flex flex-col h-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-black text-white mb-2">AI Security Assistant</h1>
        <p className="text-slate-400">24/7 AI-powered guidance for your cybersecurity questions</p>
      </motion.div>

      {/* Chat Area */}
      <div className="flex-1 glass-panel rounded-2xl border border-white/10 p-6 flex flex-col overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-4 mb-6 scroll-smooth">
          <AnimatePresence mode="wait">
            {messages.map((message) => (
              <div key={message.id}>
                <ChatMessage message={message.text} isUser={message.isUser} />
              </div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-bl-none">
                <div className="flex gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-saffron"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    className="w-2 h-2 rounded-full bg-saffron"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    className="w-2 h-2 rounded-full bg-saffron"
                  />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions (only show when no chat history) */}
        {messages.length === 1 && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 space-y-3"
          >
            <p className="text-sm text-slate-400 font-semibold mb-3">💡 Suggested Questions</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {suggestedQuestions.map((q, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSendMessage(q.text)}
                  className="p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-saffron/50 text-left transition-all group"
                >
                  <p className="text-sm font-semibold text-white mb-1">{q.icon} {q.category}</p>
                  <p className="text-xs text-slate-400 line-clamp-2">{q.text}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Input Area */}
        <div className="flex gap-3 border-t border-white/10 pt-6">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Ask me about cybersecurity threats, UPI fraud, phishing, OTP safety..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-saffron/50 focus:ring-1 focus:ring-saffron/20 resize-none text-sm"
            rows={3}
            disabled={isLoading}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSendMessage()}
            disabled={!input.trim() || isLoading}
            className="px-6 py-3 bg-gradient-to-r from-saffron to-orange-500 hover:from-orange-500 hover:to-red-500 disabled:opacity-50 text-navy font-bold rounded-xl transition-all flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: isLoading ? 360 : 0 }}
              transition={{ duration: 2, repeat: isLoading ? Infinity : 0 }}
            >
              <Send size={20} />
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Quick Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="glass-panel p-4 rounded-xl border border-white/10">
          <div className="flex items-start gap-3">
            <Lightbulb className="text-saffron flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="font-bold text-white text-sm mb-1">Real-Time Analysis</p>
              <p className="text-xs text-slate-400">Get instant threat assessment and recommendations</p>
            </div>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-white/10">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-red-400 flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="font-bold text-white text-sm mb-1">Threat Detection</p>
              <p className="text-xs text-slate-400">Learn to identify and avoid common scams</p>
            </div>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-white/10">
          <div className="flex items-start gap-3">
            <Clock className="text-primary-green flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="font-bold text-white text-sm mb-1">24/7 Availability</p>
              <p className="text-xs text-slate-400">Chat anytime about your security concerns</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AIAssistantPage;
