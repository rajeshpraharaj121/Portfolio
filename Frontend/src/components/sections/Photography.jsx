import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';


export default function Photography({ data }) {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!data) return null;

  const getFullUrl = (url) => {
    return url;
  };

  return (
    <section id="photography" className="w-full py-20 px-6 max-w-6xl mx-auto">
      <div className="mb-12">
        <h2 className="text-3xl font-bold flex items-center gap-4">
          <span className="text-cyber-purple font-mono text-sm uppercase tracking-widest">&lt;05&gt;</span>
          <span className="neon-text-blue">Visuals</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.map((photo, idx) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group relative cursor-pointer overflow-hidden rounded-xl h-64 border border-white/10"
            onClick={() => setSelectedImage(photo.url)}
          >
            <img 
              src={getFullUrl(photo.url)} 
              alt={photo.caption} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center">
              <span className="text-cyber-blue text-sm uppercase tracking-widest border border-cyber-blue px-3 py-1 mb-2">
                {photo.category}
              </span>
              <span className="text-white font-bold">{photo.caption}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-6 right-6 text-white hover:text-cyber-purple transition-colors">
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={getFullUrl(selectedImage)}
              alt="Preview"
              className="max-w-full max-h-[90vh] object-contain rounded border border-white/20 shadow-[0_0_30px_rgba(0,243,255,0.2)]"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
