import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export default function Projects({ data }) {
  if (!data) return null;

  return (
    <section id="projects" className="w-full py-20 px-6 max-w-6xl mx-auto">
      <div className="mb-12">
        <h2 className="text-3xl font-bold flex items-center gap-4">
          <span className="text-cyber-purple font-mono text-sm uppercase tracking-widest">&lt;03&gt;</span>
          <span className="neon-text-blue">Projects</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {data.map((project, idx) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="glass-card group p-8 rounded-2xl flex flex-col h-full relative overflow-hidden"
          >
            {/* Hover Glow Effect */}
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-cyber-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <div className="flex justify-between items-start mb-6 z-10">
              <h3 className="text-2xl font-bold text-white group-hover:text-cyber-blue transition-colors">
                {project.title}
              </h3>
              <div className="flex gap-3">
                {project.githubLink && (
                  <a href={project.githubLink} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                    <FaGithub size={20} />
                  </a>
                )}
                {project.liveLink && (
                  <a href={project.liveLink} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                    <ExternalLink size={20} />
                  </a>
                )}
              </div>
            </div>
            
            <p className="text-gray-400 mb-6 flex-grow z-10">
              {project.description}
            </p>

            <div className="mb-6 z-10 border-l-2 border-cyber-purple pl-4">
              <p className="text-sm font-mono text-gray-300">
                <span className="text-cyber-purple drop-shadow-[0_0_5px_rgba(176,38,255,0.8)]">Metrics:</span> {project.metrics}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-auto z-10 text-xs font-mono text-cyber-blue">
              {project.techStack.map((tech, tIdx) => (
                <span key={tIdx} className="bg-cyber-blue/10 px-2 py-1 rounded border border-cyber-blue/30">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
