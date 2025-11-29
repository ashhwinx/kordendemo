import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  MessageCircle, 
  Globe, 
  Terminal,
  ScanLine,
  ArrowRight
} from 'lucide-react';

// --- Mock Data (Replace with your actual import) ---
const COMPANY_INFO = {
  address: "Andheri East, Tech Hub, Mumbai",
  phone: "+91 98765 43210",
  email: "contact@webier.agency",
  whatsapp: "919876543210"
};

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setFormState({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#020205] text-slate-200 selection:bg-purple-500 selection:text-white overflow-hidden">
      
      {/* 1. Global Ambience (Noise & Glows) */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-32 pb-24">
        
        {/* --- HEADER --- */}
        <div className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 mb-6 backdrop-blur-sm">
            <Globe size={14} className="text-purple-400" />
            <span className="font-mono text-xs text-purple-200 tracking-widest">
              UPLINK_ESTABLISHED
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Collaborate</span>
          </h2>
          <p className="max-w-lg mx-auto text-slate-400 font-light">
            Ready to engineer the future? Initiate the transmission below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* --- LEFT COLUMN: INFO & MAP HUD --- */}
          <div className="space-y-8">
            
            {/* 1. Contact Details Card */}
            <div className="relative p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-md overflow-hidden group">
               {/* Hover Gradient */}
               <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

               <h3 className="relative z-10 text-xl font-bold text-white mb-8 flex items-center gap-2">
                 <Terminal size={18} className="text-purple-400" /> 
                 Direct Channels
               </h3>

               <div className="relative z-10 space-y-6">
                 {/* Address */}
                 <div className="flex items-start gap-4 group/item">
                    <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover/item:text-purple-400 group-hover/item:border-purple-500/30 transition-all">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">HQ_LOCATION</p>
                      <p className="text-white font-medium">{COMPANY_INFO.address}</p>
                    </div>
                 </div>

                 {/* Phone */}
                 <div className="flex items-start gap-4 group/item">
                    <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover/item:text-purple-400 group-hover/item:border-purple-500/30 transition-all">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">VOICE_LINK</p>
                      <p className="text-white font-medium">{COMPANY_INFO.phone}</p>
                    </div>
                 </div>

                 {/* Email */}
                 <div className="flex items-start gap-4 group/item">
                    <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover/item:text-purple-400 group-hover/item:border-purple-500/30 transition-all">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">DATA_PACKET</p>
                      <p className="text-white font-medium">{COMPANY_INFO.email}</p>
                    </div>
                 </div>
               </div>

               {/* WhatsApp Button */}
               <div className="relative z-10 mt-8 pt-8 border-t border-white/10">
                  <a 
                    href={`https://wa.me/${COMPANY_INFO.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#1fb355] text-black py-4 rounded-xl font-bold transition-all shadow-[0_0_20px_-5px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_-5px_rgba(37,211,102,0.6)] group/btn"
                  >
                    <MessageCircle size={20} />
                    <span>Initiate WhatsApp Chat</span>
                    <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                  </a>
               </div>
            </div>

            {/* 2. Map HUD (Sci-Fi Style) */}
            <div className="relative h-64 w-full rounded-[2rem] overflow-hidden border border-white/10 group">
               {/* Map Image */}
               <img 
                 src="https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1935&auto=format&fit=crop" 
                 alt="Map Location" 
                 className="absolute inset-0 h-full w-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out"
               />
               
               {/* HUD Overlay */}
               <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-[#020205]/20 to-transparent"></div>
               <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,19,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20 pointer-events-none"></div>

               {/* Scanning Line Animation */}
               <div className="absolute top-0 left-0 w-full h-1 bg-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.8)] animate-[scan_3s_ease-in-out_infinite] opacity-50"></div>

               {/* Map Marker & Tag */}
               <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div className="bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                       <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                       <span className="text-[10px] font-mono text-green-400">LIVE_FEED</span>
                    </div>
                    <p className="text-white text-sm font-bold">Mumbai Operations Center</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-600/40 animate-bounce">
                     <MapPin size={18} />
                  </div>
               </div>
            </div>

          </div>

          {/* --- RIGHT COLUMN: THE FORM --- */}
          <div className="relative">
            {/* Blueprint Corner Accents */}
            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-white/10 rounded-tl-xl"></div>
            <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-white/10 rounded-tr-xl"></div>
            <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-white/10 rounded-bl-xl"></div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-white/10 rounded-br-xl"></div>

            <div className="relative h-full p-8 md:p-10 rounded-[2rem] border border-white/5 bg-[#0a0a0f] shadow-2xl">
               
               <h3 className="text-2xl font-bold text-white mb-2">Message Protocol</h3>
               <p className="text-slate-400 text-sm mb-8">Fill out the parameters below to initiate contact.</p>

               {success ? (
                 <div className="h-[400px] flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 border border-green-500/20 shadow-[0_0_30px_-5px_rgba(34,197,94,0.3)]">
                      <Send className="text-green-500 w-8 h-8" />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2">Transmission Sent</h4>
                    <p className="text-slate-400 text-sm max-w-xs">Our team has received your packet. Expect a response within 24 hours.</p>
                    <button 
                      onClick={() => setSuccess(false)}
                      className="mt-8 text-xs font-mono text-purple-400 hover:text-purple-300 border-b border-purple-400/30 hover:border-purple-300 pb-0.5"
                    >
                      RESET_FORM
                    </button>
                 </div>
               ) : (
                 <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Name Input */}
                    <div className="space-y-2">
                       <label htmlFor="name" className="text-xs font-mono text-purple-400 ml-1">USER_NAME</label>
                       <input
                         type="text"
                         id="name"
                         required
                         placeholder="Enter full name"
                         className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                         value={formState.name}
                         onChange={(e) => setFormState({...formState, name: e.target.value})}
                       />
                    </div>

                    {/* Email Input */}
                    <div className="space-y-2">
                       <label htmlFor="email" className="text-xs font-mono text-purple-400 ml-1">EMAIL_ADDRESS</label>
                       <input
                         type="email"
                         id="email"
                         required
                         placeholder="name@company.com"
                         className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                         value={formState.email}
                         onChange={(e) => setFormState({...formState, email: e.target.value})}
                       />
                    </div>

                    {/* Message Input */}
                    <div className="space-y-2">
                       <label htmlFor="message" className="text-xs font-mono text-purple-400 ml-1">MESSAGE_DATA</label>
                       <textarea
                         id="message"
                         required
                         rows={4}
                         placeholder="Tell us about your project requirements..."
                         className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all resize-none"
                         value={formState.message}
                         onChange={(e) => setFormState({...formState, message: e.target.value})}
                       />
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full group relative overflow-hidden rounded-xl bg-white text-black font-bold py-4 mt-4 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-400 via-purple-200 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="relative flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>
                            <ScanLine className="animate-spin" size={18} />
                            TRANSMITTING...
                          </>
                        ) : (
                          <>
                            TRANSMIT MESSAGE
                            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </span>
                    </button>
                 </form>
               )}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Contact;