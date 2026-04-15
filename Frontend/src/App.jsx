import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import API_BASE from './config';
import Navbar from './components/ui/Navbar';
import CustomCursor from './components/ui/CustomCursor';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Photography from './components/sections/Photography';
import Timeline from './components/sections/Timeline';
import Contact from './components/sections/Contact';
import AdminPanel from './components/admin/AdminPanel';

function Portfolio({ content }) {
  if (!content) return <div className="h-screen w-screen flex items-center justify-center text-cyber-blue">Loading System...</div>;

  return (
    <div className="relative w-full">
      <div className="fixed inset-0 z-[-2] bg-grid opacity-20"></div>
      <div className="fixed inset-0 z-[-1] bg-noise"></div>
      
      <CustomCursor />
      <Navbar />
      
      <main className="flex flex-col items-center w-full">
        <Hero data={content.hero} resumeUrl={content.resume} />
        <About data={content.about} resumeUrl={content.resume} />
        <Skills data={content.skills} />
        <Projects data={content.projects} />
        <Timeline data={content.timeline} />
        <Photography data={content.photography} />
        <Contact data={content.contact} />
      </main>
      
      <footer className="w-full text-center py-6 border-t border-white/10 text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Rajesh Praharaj. Built with React & Node.</p>
        <p className="mt-2 text-xs opacity-50">Authorized Personnel Only: <a href="/admin" className="hover:text-cyber-blue transition-colors">Admin Access</a></p>
      </footer>
    </div>
  );
}

import portfolioData from './data/content.json';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio content={portfolioData} />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
