import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ChevronRight } from 'lucide-react';
import API_BASE from '../../config';

export default function Hero({ data, resumeUrl }) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    if (!data?.typingTexts) return;
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % data.typingTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [data]);

  const resumeLink = resumeUrl;

  if (!data) return null;

  return (
    <section id="home" className="min-h-screen w-full flex items-center justify-center pt-20 px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyber-blue/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-purple/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-5xl text-center relative z-10">
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-cyber-purple font-mono mb-6 tracking-[0.4em] text-xs md:text-sm uppercase font-bold"
        >
          // DATABASE CONNECTED // SESSION: ACTIVE
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl md:text-8xl font-black mb-6 tracking-tighter italic uppercase leading-none"
        >
          {data.heading}
        </motion.h1>

        <div className="h-12 md:h-20 mb-8 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.h2
              key={currentTextIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="text-xl md:text-4xl font-mono text-cyber-blue drop-shadow-[0_0_8px_rgba(0,243,255,0.6)]"
            >
              &lt;{data.typingTexts?.[currentTextIndex]} /&gt;
            </motion.h2>
          </AnimatePresence>
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-gray-400 max-w-2xl mx-auto mb-12 text-sm md:text-lg leading-relaxed font-medium px-4"
        >
          {data.subheading}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a href="#projects" className="cyber-button px-10 py-4 group flex items-center gap-2">
            View Matrix <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          
          {resumeUrl && (
            <a 
              href={resumeLink} 
              target="_blank" 
              rel="noreferrer" 
              className="glass px-10 py-4 border border-white/20 rounded-lg font-black uppercase tracking-widest hover:bg-white/5 transition-all text-sm flex items-center gap-3 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-cyber-purple/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <FileText size={18} className="text-cyber-purple relative z-10" /> 
              <span className="relative z-10">Get Resume</span>
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
