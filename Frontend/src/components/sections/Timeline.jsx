import React from 'react';
import { motion } from 'framer-motion';

export default function Timeline({ data }) {
  if (!data) return null;

  return (
    <section id="timeline" className="w-full py-20 px-6 max-w-4xl mx-auto">
      <div className="mb-16">
        <h2 className="text-3xl font-bold flex items-center gap-4">
          <span className="text-cyber-purple font-mono text-sm uppercase tracking-widest">&lt;04&gt;</span>
          <span className="neon-text-blue">Timeline</span>
        </h2>
      </div>

      <div className="relative border-l border-white/20 ml-4 md:ml-0 md:pl-0">
        {data.map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="mb-10 ml-6 md:ml-10 relative"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[31px] md:-left-[45px] top-1 w-4 h-4 rounded-full bg-black border-2 border-cyber-blue shadow-[0_0_10px_rgba(0,243,255,0.8)]"></div>
            
            <div className="glass-card p-6 rounded-xl hover:-translate-y-1 transition-transform duration-300">
              <span className="inline-block py-1 px-3 rounded-full bg-cyber-purple/20 text-cyber-purple text-xs font-bold mb-3 font-mono border border-cyber-purple/30">
                {item.year}
              </span>
              <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
              <h4 className="text-gray-400 font-medium mb-3">{item.subtitle}</h4>
              <p className="text-gray-500 text-sm">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
