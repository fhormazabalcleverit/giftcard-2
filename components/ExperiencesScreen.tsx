
import React, { useState, useRef } from 'react';

interface ExperiencesScreenProps {
  onBack: () => void;
}

const CATEGORIES = [
  { id: 'all', label: 'Toda ocasión', icon: (color: string) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  )},
  { id: 'love', label: 'Amor', icon: (color: string) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
    </svg>
  )},
];

const EXPERIENCES_DATA = [
  { id: 1, title: 'Escape Room', subtitle: 'Desafío mental para grupos.', pts: '3500 PTS', img: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=400' },
  { id: 2, title: 'Cata de Vinos', subtitle: 'Degustación de cepas premium.', pts: '6200 PTS', img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=400' },
];

export const ExperiencesScreen: React.FC<ExperiencesScreenProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  return (
    <div className="h-full w-full bg-[#f8fbfb] flex flex-col relative animate-in fade-in duration-500">
      <div className="pt-14 px-6 pb-6 flex items-center justify-between bg-white shadow-sm">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-[#f8fafc] flex items-center justify-center"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg></button>
        <h2 className="text-lg font-extrabold text-[#0f172a] absolute left-1/2 -translate-x-1/2">Experiencias</h2>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="px-6 py-6 flex gap-6 overflow-x-auto no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className="flex flex-col items-center gap-2 shrink-0">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all ${selectedCategory === cat.id ? 'border-[#24d4bc] bg-white scale-110 shadow-lg shadow-[#24d4bc]/20' : 'border-slate-100 bg-[#fcfcfc]'}`}>
                {cat.icon(selectedCategory === cat.id ? '#1c7cbc' : '#94a3b8')}
              </div>
              <span className={`text-[10px] font-bold ${selectedCategory === cat.id ? 'text-[#1c7cbc]' : 'text-slate-400'}`}>{cat.label}</span>
            </button>
          ))}
        </div>

        <div className="p-6 grid grid-cols-2 gap-4">
          {EXPERIENCES_DATA.map((exp) => (
            <div key={exp.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full">
              <div className="h-28 w-full bg-slate-100 relative">
                <img src={exp.img} className="w-full h-full object-cover" alt={exp.title} />
                <div className="absolute top-2 left-2 bg-[#1c7cbc] px-2 py-0.5 rounded-lg">
                  <span className="text-[8px] font-extrabold text-white">{exp.pts}</span>
                </div>
              </div>
              <div className="p-3 flex flex-col flex-1">
                <h5 className="text-[11px] font-extrabold text-[#0f172a] mb-0.5">{exp.title}</h5>
                <button className="mt-auto w-full bg-[#f0f9f9] text-[#1c7cbc] text-[10px] font-bold py-2 rounded-xl">Canjear</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
