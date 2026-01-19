
import React, { useState } from 'react';
import emailjs from 'https://esm.sh/@emailjs/browser@^4.4.1';

// Helper to safely access environment variables in a browser context
const getEnv = (key: string): string => {
  // Check common locations for build-time injected variables
  const env = (window as any).process?.env || (globalThis as any).process?.env || (import.meta as any).env || {};
  
  // Try direct key, then common prefixes used by Vite/Webpack/CRA
  return env[key] || env[`VITE_${key}`] || env[`REACT_APP_${key}`] || '';
};

const ContactForm: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'transmitting' | 'success' | 'error'>('idle');
  const [log, setLog] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Pulling from environment without hardcoded fallbacks
  const SERVICE_ID = getEnv('SERVICE_ID');
  const TEMPLATE_ID = getEnv('TEMPLATE_ID');
  const PUBLIC_KEY = getEnv('PUBLIC_KEY');

  const addLog = (msg: string) => {
    setLog(prev => [...prev.slice(-4), `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error("Environment variables missing:", { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY });
      addLog("CRITICAL: Environment configuration missing.");
      setStatus('error');
      return;
    }

    setStatus('transmitting');
    setLog(["Initializing SMTP Handshake..."]);

    try {
      addLog("Verifying Public Identity...");
      emailjs.init(PUBLIC_KEY);
      
      await new Promise(resolve => setTimeout(resolve, 400));
      addLog("Constructing Payload...");

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        reply_to: formData.email,
        subject: formData.subject,
        message: formData.message,
        user_name: formData.name,
        user_email: formData.email,
        to_name: 'Vibhor Agarwal'
      };

      addLog(`Connecting to secure node...`);

      const response = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );

      if (response.status === 200) {
        addLog("Transmission successful. Status 200.");
        await new Promise(resolve => setTimeout(resolve, 600));
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(`Server returned status ${response.status}: ${response.text}`);
      }

    } catch (err: any) {
      const errorMsg = err?.text || err?.message || JSON.stringify(err) || "Unknown Protocol Error";
      console.error("EmailJS Error:", err);
      addLog(`FAIL: ${errorMsg}`);
      setStatus('error');
      
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClasses = "w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.05] transition-all duration-300 disabled:opacity-50";

  if (status === 'success') {
    return (
      <div className="mt-10 p-10 border border-emerald-500/20 bg-emerald-500/5 rounded-2xl text-center animate-in fade-in zoom-in duration-500">
        <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
          <div className="absolute inset-0 border border-emerald-500/30 rounded-full animate-ping opacity-20" />
          <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">Packet Delivered</h3>
        <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
          The secure tunnel was established successfully.
        </p>
        <button 
          onClick={() => { setStatus('idle'); setLog([]); }}
          className="px-6 py-2 border border-white/10 rounded-lg text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] hover:text-white hover:border-white/20 transition-all"
        >
          Reset Connection
        </button>
      </div>
    );
  }

  return (
    <div className="mt-10 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="text-left space-y-4">
        {status === 'error' && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-[11px] font-mono mb-4 uppercase tracking-wider flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span>System Alert: Handshake Failed</span>
            </div>
            <div className="text-[9px] opacity-60 ml-5 lowercase">{log[log.length - 1]}</div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-mono font-bold text-zinc-500 uppercase ml-1">Identity.Name</label>
            <input
              required
              disabled={status === 'transmitting'}
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-mono font-bold text-zinc-500 uppercase ml-1">Identity.Email</label>
            <input
              required
              disabled={status === 'transmitting'}
              type="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-mono font-bold text-zinc-500 uppercase ml-1">Packet.Subject</label>
          <input
            required
            disabled={status === 'transmitting'}
            type="text"
            name="subject"
            placeholder="Technical Inquiry"
            value={formData.subject}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-mono font-bold text-zinc-500 uppercase ml-1">Packet.Payload</label>
          <textarea
            required
            disabled={status === 'transmitting'}
            name="message"
            rows={4}
            placeholder="Message details..."
            value={formData.message}
            onChange={handleChange}
            className={`${inputClasses} resize-none`}
          />
        </div>

        {log.length > 0 && (
          <div className="p-3 bg-black/40 rounded-lg border border-white/5 space-y-1">
            {log.map((entry, i) => (
              <div key={i} className="text-[9px] font-mono text-zinc-500 tracking-tighter">
                <span className="text-sky-500/50 mr-2">➜</span> {entry}
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'transmitting'}
          className="w-full mt-4 group relative px-8 py-4 bg-sky-500 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-sky-400 transition-all active:scale-95 shadow-lg shadow-sky-500/20 disabled:opacity-50 overflow-hidden"
        >
          <span className={status === 'transmitting' ? 'opacity-0' : 'opacity-100'}>
            Deploy Packet
          </span>
          {status === 'transmitting' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
