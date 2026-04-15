import React from 'react';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300 } }
};

export default function Skills({ data }) {
  if (!data) return null;

  return (
    <section id="skills" className="w-full py-20 px-6 max-w-6xl mx-auto">
      <div className="mb-12">
        <h2 className="text-3xl font-bold flex items-center gap-4">
          <span className="text-cyber-purple font-mono text-sm uppercase tracking-widest">&lt;02&gt;</span>
          <span className="neon-text-blue">Technical Arsenal</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((skillGroup, idx) => (
          <motion.div 
            key={idx}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={container}
            className="glass-card p-6 rounded-xl border-t border-t-cyber-blue/30"
          >
            <h3 className="text-xl font-bold mb-4 text-white/90 border-b border-white/10 pb-2">
              {skillGroup.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {skillGroup.items.map((skill, sIdx) => (
                <motion.span 
                  key={sIdx}
                  variants={item}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(0, 243, 255, 0.1)', color: '#00f3ff' }}
                  className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-sm text-gray-300 cursor-default transition-colors"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
