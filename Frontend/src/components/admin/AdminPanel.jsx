import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE from '../../config';
import { 
  Shield, Eye, MessageSquare, Database, ArrowLeft, 
  Save, Plus, Trash2, Upload, Terminal, User, 
  Briefcase, Camera, FileText, Send 
} from 'lucide-react';

export default function AdminPanel() {
  const [content, setContent] = useState(null);
  const [visits, setVisits] = useState(null);
  const [activeTab, setActiveTab] = useState('hero');
  const [status, setStatus] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [contentRes, visitsRes] = await Promise.all([
        axios.get(`${API_BASE}/api/content`),
        axios.get(`${API_BASE}/api/visits`)
      ]);
      setContent(contentRes.data);
      setVisits(visitsRes.data);
    } catch (err) {
      console.error(err);
      setStatus('Mainframe Connection Failed.');
    }
  };

  const saveAll = async (newContent = content) => {
    try {
      await axios.post(`${API_BASE}/api/content`, newContent);
      setStatus('System Memory Synchronized.');
      setContent(newContent);
      setTimeout(() => setStatus(''), 3000);
    } catch (err) {
      setStatus('Storage Sync Failed.');
    }
  };

  const handleFileUpload = async (e, type = 'photo') => {
    const file = e.target.files[0];
    if (!file) return;
    
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post(`${API_BASE}/api/upload`, formData);
      if (type === 'resume') {
        const updated = { ...content, resume: res.data.url };
        saveAll(updated);
      } else {
        const newPhoto = {
          id: Date.now(),
          category: 'Creative',
          url: res.data.url,
          caption: 'New Upload'
        };
        const updated = { ...content, photography: [...content.photography, newPhoto] };
        saveAll(updated);
      }
      setStatus('Upload Sequence Complete.');
    } catch (err) {
      setStatus('Upload Vector Fault.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleAiCommand = async () => {
    if (!aiPrompt) return;
    setStatus('Contacting Gemini AI...');
    try {
      const res = await axios.post(`${API_BASE}/api/chat`, { prompt: aiPrompt });
      setContent(res.data.updatedContent);
      setStatus('AI Rewrite Successful.');
      setAiPrompt('');
    } catch (err) {
      setStatus('AI Neural Link Interrupted.');
    }
  };

  if (!content || !visits) return <div className="h-screen flex justify-center items-center text-cyber-blue font-mono animate-pulse">INITIATING ADMIN PROTOCOLS...</div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Shield className="text-cyber-blue shadow-[0_0_10px_rgba(0,243,255,0.5)]" />
              <span className="neon-text-blue tracking-tighter uppercase italic">Control Center v2.0</span>
            </h1>
            <p className="text-xs text-gray-500 mt-1 font-mono uppercase tracking-widest">Operator: Rajesh Praharaj // Auth: Root</p>
          </div>
          <div className="flex gap-4">
            {status && <span className="text-xs bg-cyber-blue/10 text-cyber-blue px-3 py-2 border border-cyber-blue/30 rounded font-mono animate-pulse">{status}</span>}
            <a href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-mono border border-white/10 px-4 py-2 rounded">
              <ArrowLeft size={16} /> EXIT
            </a>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Navigation - Horizontal on Mobile, Vertical on Desktop */}
          <nav className="lg:col-span-3 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-hide">
            {[
              { id: 'hero', label: 'Identity', icon: <User size={18} /> },
              { id: 'projects', label: 'Projects', icon: <Briefcase size={18} /> },
              { id: 'visuals', label: 'Visuals', icon: <Camera size={18} /> },
              { id: 'resume', label: 'Resume', icon: <FileText size={18} /> },
              { id: 'security', label: 'Security', icon: <Database size={18} /> },
              { id: 'ai', label: 'AI Nexus', icon: <Terminal size={18} /> },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 lg:w-full flex items-center gap-3 md:gap-4 px-4 md:px-5 py-3 md:py-4 rounded-lg text-left transition-all border ${activeTab === tab.id ? 'bg-cyber-blue/10 text-cyber-blue border-cyber-blue/50 shadow-[0_0_15px_rgba(0,243,255,0.1)]' : 'hover:bg-white/5 text-gray-400 border-transparent'}`}
              >
                {tab.icon} <span className="font-mono text-[10px] md:text-sm uppercase tracking-widest whitespace-nowrap">{tab.label}</span>
              </button>
            ))}
          </nav>

          {/* Main Workspace */}
          <main className="lg:col-span-9 glass-card p-4 md:p-6 rounded-2xl border border-white/10 overflow-hidden">
            
            {/* Identity Tab */}
            {activeTab === 'hero' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold border-b border-white/10 pb-3 mb-6 font-mono text-cyber-purple uppercase italic tracking-widest">Identity Settings</h2>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="text-xs text-cyber-blue uppercase font-mono mb-2 block">Hero Heading</label>
                    <input className="w-full bg-black/50 border border-white/20 rounded-lg p-3 outline-none focus:border-cyber-blue transition-colors text-lg font-bold" value={content.hero.heading} onChange={(e) => setContent({...content, hero: {...content.hero, heading: e.target.value}})} />
                  </div>
                  <div>
                    <label className="text-xs text-cyber-blue uppercase font-mono mb-2 block">Hero Subheading</label>
                    <textarea className="w-full bg-black/50 border border-white/20 rounded-lg p-3 outline-none focus:border-cyber-blue transition-colors h-24" value={content.hero.subheading} onChange={(e) => setContent({...content, hero: {...content.hero, subheading: e.target.value}})} />
                  </div>
                  <div>
                    <label className="text-xs text-cyber-blue uppercase font-mono mb-2 block">About Narrative</label>
                    <textarea className="w-full bg-black/50 border border-white/20 rounded-lg p-3 outline-none focus:border-cyber-blue transition-colors h-40" value={content.about.text} onChange={(e) => setContent({...content, about: { text: e.target.value }})} />
                  </div>
                  <button onClick={() => saveAll()} className="cyber-button w-full">Commit Identity Changes</button>
                </div>
              </div>
            )}

            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-3">
                  <h2 className="text-xl font-bold font-mono text-cyber-purple uppercase italic tracking-widest">Project Matrix</h2>
                  <button onClick={() => {
                    const newProject = { id: Date.now(), title: "New Lab Project", description: "Design overview...", techStack: [], metrics: "0.0% Efficiency", githubLink: "" };
                    setContent({...content, projects: [...content.projects, newProject]});
                  }} className="text-xs bg-cyber-blue/10 border border-cyber-blue/30 text-cyber-blue px-4 py-2 rounded flex items-center gap-2 hover:bg-cyber-blue/20 transition-all uppercase tracking-widest font-mono">
                    <Plus size={14} /> Add Project
                  </button>
                </div>
                
                <div className="space-y-4">
                  {content.projects.map((p, idx) => (
                    <div key={p.id} className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-4">
                      <div className="flex justify-between items-start">
                        <input className="bg-transparent text-xl font-bold outline-none border-b border-white/10 focus:border-cyber-blue pb-1 w-full mr-4" value={p.title} onChange={(e) => {
                          const updated = [...content.projects];
                          updated[idx].title = e.target.value;
                          setContent({...content, projects: updated});
                        }} />
                        <button onClick={() => {
                          const updated = content.projects.filter((_, i) => i !== idx);
                          setContent({...content, projects: updated});
                        }} className="text-red-500/50 hover:text-red-500 transition-colors p-2"><Trash2 size={18} /></button>
                      </div>
                      <textarea className="w-full bg-black/30 border border-white/10 p-2 text-sm text-gray-400 focus:border-cyber-blue rounded outline-none" value={p.description} onChange={(e) => {
                        const updated = [...content.projects];
                        updated[idx].description = e.target.value;
                        setContent({...content, projects: updated});
                      }} />
                      <div className="grid grid-cols-2 gap-4">
                        <input className="bg-black/30 border border-white/10 p-2 text-xs rounded outline-none" placeholder="GitHub Link" value={p.githubLink} onChange={(e) => {
                           const updated = [...content.projects];
                           updated[idx].githubLink = e.target.value;
                           setContent({...content, projects: updated});
                        }} />
                        <input className="bg-black/30 border border-white/10 p-2 text-xs rounded outline-none" placeholder="Metrics" value={p.metrics} onChange={(e) => {
                           const updated = [...content.projects];
                           updated[idx].metrics = e.target.value;
                           setContent({...content, projects: updated});
                        }} />
                      </div>
                    </div>
                  ))}
                  <button onClick={() => saveAll()} className="cyber-button w-full mt-4">Save Project Matrix</button>
                </div>
              </div>
            )}

            {/* Visuals Tab */}
            {activeTab === 'visuals' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-3">
                  <h2 className="text-xl font-bold font-mono text-cyber-purple uppercase italic tracking-widest">Visual Assets</h2>
                  <div className="relative">
                    <input type="file" id="photo-upload" className="hidden" onChange={handleFileUpload} />
                    <label htmlFor="photo-upload" className="text-xs bg-white/5 border border-white/20 text-white px-4 py-3 rounded flex items-center gap-2 hover:bg-white/10 cursor-pointer transition-all uppercase tracking-widest font-mono">
                      <Upload size={14} /> {isUploading ? 'Transferring...' : 'Upload Core Image'}
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {content.photography.map((p, idx) => (
                    <div key={idx} className="group relative aspect-square rounded-lg overflow-hidden border border-white/10">
                      <img src={p.url} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <button onClick={() => {
                          const updated = content.photography.filter((_, i) => i !== idx);
                          setContent({...content, photography: updated});
                        }} className="text-red-500 hover:scale-125 transition-transform"><Trash2 size={24} /></button>
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={() => saveAll()} className="cyber-button w-full mt-4">Save Visual State</button>
              </div>
            )}

            {/* Resume Tab */}
            {activeTab === 'resume' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold border-b border-white/10 pb-3 mb-6 font-mono text-cyber-purple uppercase italic tracking-widest">Personnel Credentials</h2>
                <div className="glass-card p-12 border-dashed border-2 border-white/10 rounded-2xl flex flex-col items-center justify-center space-y-6 text-center">
                  <FileText size={64} className="text-cyber-blue opacity-50" />
                  <div>
                    <h3 className="text-lg font-bold mb-2">Resume Artifact</h3>
                    <p className="text-sm text-gray-500 max-w-sm">Upload your latest professional credentials (PDF or Image) to update the global download link.</p>
                  </div>
                  {content.resume && (
                    <div className="text-xs font-mono text-cyber-blue py-1 px-3 bg-cyber-blue/10 border border-cyber-blue/30 rounded max-w-full overflow-hidden truncate">
                      ACTIVE LINK: {content.resume}
                    </div>
                  )}
                  <div className="relative">
                    <input type="file" id="resume-upload" className="hidden" onChange={(e) => handleFileUpload(e, 'resume')} />
                    <label htmlFor="resume-upload" className="cyber-button px-10 flex items-center gap-2 cursor-pointer">
                      <Upload size={18} /> {isUploading ? 'MODULATING...' : 'UPGRADE CREDENTIALS'}
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div>
                <h2 className="text-xl font-bold mb-6 border-b border-white/10 pb-3 font-mono text-cyber-purple uppercase italic tracking-widest">Access Logs Matrix</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-gray-400">
                    <thead className="bg-white/5 font-mono text-cyber-blue uppercase text-xs">
                      <tr>
                        <th className="px-6 py-4">TIMESTAMP</th>
                        <th className="px-6 py-4">OPERATOR ID</th>
                        <th className="px-6 py-4">COM LINK</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visits.visitors.map((v, i) => (
                        <tr key={i} className="border-b border-white/5 hover:bg-white/5">
                          <td className="px-6 py-4 font-mono text-xs">{new Date(v.created_at).toLocaleString()}</td>
                          <td className="px-6 py-4 text-white uppercase font-bold text-xs">{v.name}</td>
                          <td className="px-6 py-4 italic text-xs">{v.email || 'SIGNAL_LOST'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* AI nexus Tab */}
            {activeTab === 'ai' && (
              <div className="space-y-6 flex flex-col h-[60vh]">
                <h2 className="text-xl font-bold border-b border-white/10 pb-3 font-mono text-cyber-blue uppercase italic tracking-widest flex items-center gap-3">
                  <Terminal size={20} /> AI Command Nexus (Gemini 1.5)
                </h2>
                <div className="flex-grow bg-[#020202] border border-cyber-blue/20 rounded-xl p-6 font-mono text-sm overflow-y-auto space-y-4">
                  <div className="text-cyber-blue/60 leading-relaxed">
                    [SYSTEM READY]<br />
                    [NEURAL LINK: GOOGLE GEMINI]<br />
                    <br />
                    Enter command parameters to modify the simulation. Examples:<br />
                    - "I am now a Lead Data Scientist at AI Research Lab"<br />
                    - "Make my projects sound more professional and impact-driven"<br />
                    - "Set the hero heading to 'Engineering the Future of Data'"
                  </div>
                </div>
                <div className="relative group">
                  <div className="absolute inset-0 bg-cyber-blue/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative flex items-center">
                    <input 
                      className="w-full bg-black border-2 border-white/10 rounded-xl p-5 outline-none focus:border-cyber-blue transition-all font-mono placeholder:text-gray-700"
                      placeholder="ENTER COMMAND SEQUENCE..."
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAiCommand()}
                    />
                    <button 
                      onClick={handleAiCommand}
                      className="absolute right-4 p-3 text-cyber-blue hover:scale-110 transition-transform"
                    >
                      <Send size={24} />
                    </button>
                  </div>
                </div>
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
}
