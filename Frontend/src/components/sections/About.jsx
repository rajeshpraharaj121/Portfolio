import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import API_BASE from '../../config';

export default function About({ data, resumeUrl }) {
  if (!data) return null;

  const resumeLink = resumeUrl;

  return (
    <section id="about" className="w-full py-24 px-6 max-w-5xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="glass-card p-10 md:p-16 rounded-3xl relative overflow-hidden border-r-4 border-r-cyber-purple/50"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyber-blue opacity-5 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyber-purple opacity-5 blur-[100px] rounded-full"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <h2 className="text-3xl font-bold flex items-center gap-4">
            <span className="text-cyber-purple font-mono text-xs uppercase tracking-[0.3em] font-bold">&lt;01&gt;</span>
            <span className="neon-text-blue italic uppercase tracking-tighter">The Narrative</span>
          </h2>
          
          {resumeUrl && (
            <a 
              href={resumeLink} 
              target="_blank" 
              rel="noreferrer" 
              className="group flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-xl hover:border-cyber-blue/50 transition-all"
            >
              <FileText size={20} className="text-cyber-blue group-hover:scale-110 transition-transform" />
              <span className="text-xs font-mono uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">Download Dossier</span>
            </a>
          )}
        </div>
        
        <p className="text-gray-300 text-lg md:text-xl leading-relaxed whitespace-pre-wrap relative z-10 font-medium">
          {data.text}
        </p>
      </motion.div>
    </section>
  );
}
