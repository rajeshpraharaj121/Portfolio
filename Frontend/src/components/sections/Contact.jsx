import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, UserCheck, Terminal, Award } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import axios from 'axios';
import API_BASE from '../../config';

export default function Contact({ data }) {
  const [visitorName, setVisitorName] = useState('');
  const [status, setStatus] = useState('');
  const [loggedVisit, setLoggedVisit] = useState(false);
  const [showAchievement, setShowAchievement] = useState(false);

  useEffect(() => {
    const visitLogged = sessionStorage.getItem('visitLogged');
    if (!visitLogged) {
      axios.post(`${API_BASE}/api/visit`, { name: 'Anonymous', email: '', ip: 'client-ip' })
        .then(() => {
          sessionStorage.setItem('visitLogged', 'true');
        })
        .catch(console.error);
    }
  }, []);

  const funnyMessages = [
    "Your identity has been etched into the mainframe. You are now 1% cooler.",
    "Access granted. You've been promoted to Level 2 Citizen. Welcome to the grid.",
    "Signal verified. Achievement Unlocked: Witness to Greatness.",
    "Binary handshake successful. Your presence has increased system efficiency by 0.0001%.",
    "Trace logged. The AI overlords are pleased with your contribution."
  ];

  const [randomMsg] = useState(funnyMessages[Math.floor(Math.random() * funnyMessages.length)]);

  const handleLeaveTrace = async () => {
    if (!visitorName) {
      setStatus('Identification required to breach the firewall.');
      return;
    }
    try {
      await axios.post(`${API_BASE}/api/visit`, { name: visitorName, email: '', ip: '' });
      setLoggedVisit(true);
      setShowAchievement(true);
      setStatus(randomMsg);
    } catch (error) {
      setStatus('Encryption failure. Connection lost.');
    }
  };

  if (!data) return null;

  return (
    <section id="contact" className="w-full py-24 px-6 max-w-5xl mx-auto mb-20">
      <div className="mb-16 text-center">
        <h2 className="text-4xl font-extrabold mb-4 italic">
          <span className="text-cyber-blue drop-shadow-[0_0_10px_rgba(0,243,255,0.5)] uppercase tracking-tighter">The Final Node</span>
        </h2>
        <div className="h-1 w-24 bg-cyber-purple mx-auto rounded-full mb-6"></div>
        <p className="text-gray-400 font-mono text-sm uppercase tracking-widest">Connect to the Rajesh.Net infrastructure</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Contact info card */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-card p-10 rounded-3xl border-l-4 border-l-cyber-blue flex flex-col justify-between"
        >
          <div>
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
              <Terminal className="text-cyber-blue" size={20} /> <span className="uppercase tracking-widest">Global Coms</span>
            </h3>
            
            <div className="space-y-6">
              <a href={`mailto:${data.email}`} className="flex items-center gap-5 hover:text-cyber-blue transition-all group p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10">
                <Mail size={24} className="text-cyber-purple group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-[10px] uppercase font-mono text-gray-500">Secure Protocol</p>
                  <p className="text-white text-sm font-bold">{data.email}</p>
                </div>
              </a>
              <a href={data.github} target="_blank" rel="noreferrer" className="flex items-center gap-5 hover:text-cyber-blue transition-all group p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10">
                <FaGithub size={24} className="text-cyber-blue group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-[10px] uppercase font-mono text-gray-500">Repository Hub</p>
                  <p className="text-white text-sm font-bold">github.com/rajeshpraharaj121</p>
                </div>
              </a>
              <a href={data.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-5 hover:text-cyber-blue transition-all group p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10">
                <FaLinkedin size={24} className="text-cyber-blue group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-[10px] uppercase font-mono text-gray-500">Network Matrix</p>
                  <p className="text-white text-sm font-bold">linkedin.com/in/rajesh-praharaj</p>
                </div>
              </a>
            </div>
          </div>
          
          <div className="mt-12 text-xs font-mono text-gray-600 border-t border-white/5 pt-6">
            SIGNAL STATUS: <span className="text-lime-500 animate-pulse uppercase">Active</span> // 
            ENCRYPTION: <span className="text-cyber-blue">Enabled</span>
          </div>
        </motion.div>

        {/* The Forge / Visitor Log */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-card p-10 rounded-3xl relative overflow-hidden flex flex-col justify-center border-t-4 border-t-cyber-purple"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-purple/20 blur-3xl rounded-full"></div>
          
          <h3 className="text-xl font-bold mb-6 flex items-center gap-3 relative z-10">
            <UserCheck className="text-cyber-purple" size={20} /> <span className="uppercase tracking-widest text-cyber-purple">Sign The Guestbook</span>
          </h3>
          
          <p className="text-gray-400 mb-8 relative z-10 text-sm leading-relaxed">
            Leave your mark on this simulation. Your identifier will be stored permanently in the mainframe archive.
          </p>

          <div className="relative z-10 space-y-4">
            <AnimatePresence mode="wait">
              {loggedVisit ? (
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-cyber-blue/5 border border-cyber-blue/30 p-8 rounded-2xl text-center space-y-4"
                >
                  <div className="inline-block p-4 bg-cyber-blue/20 rounded-full mb-2">
                    <Award size={40} className="text-cyber-blue" />
                  </div>
                  <h4 className="text-lg font-bold text-white italic uppercase tracking-widest">Access Finalized!</h4>
                  <p className="text-cyber-blue font-mono text-sm leading-relaxed">{status}</p>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  <div className="relative group">
                    <input 
                      type="text" 
                      placeholder="ENTER IDENTIFIER (NAME)" 
                      className="w-full bg-black/50 border-2 border-white/10 rounded-xl p-5 text-white outline-none focus:border-cyber-purple transition-all font-mono uppercase tracking-widest"
                      value={visitorName}
                      onChange={(e) => setVisitorName(e.target.value)}
                    />
                  </div>
                  <button 
                    onClick={handleLeaveTrace}
                    className="cyber-button w-full flex justify-center items-center gap-3 py-5 text-sm"
                  >
                    LEAVE A TRACE
                  </button>
                  {status && <p className="text-center text-xs text-red-400 font-mono mt-2 animate-pulse">{status}</p>}
                </div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
