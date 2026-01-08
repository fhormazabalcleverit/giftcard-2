
import React, { useState, useRef } from 'react';

interface WhereToUseScreenProps {
  onBack: () => void;
}

const STORE_CATEGORIES = [
  { id: 'all', label: 'Todos', icon: (color: string) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/>
    </svg>
  )},
  { id: 'cafe', label: 'Cafetería', icon: (color: string) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
    </svg>
  )},
];

const STORES_DATA = [
  { id: 1, name: 'Café Central', category: 'Cafetería', address: 'Av. Principal 123', discount: '15% OFF', img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=400', coords: { x: '25%', y: '30%' } },
];

export const WhereToUseScreen: React.FC<WhereToUseScreenProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isMapView, setIsMapView] = useState(false);
  
  return (
    <div className="h-full w-full bg-[#f8fbfb] flex flex-col relative animate-in fade-in duration-500 overflow-hidden">
      <div className="pt-14 px-6 pb-6 flex items-center justify-between bg-white shadow-sm z-30">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-[#f8fafc] flex items-center justify-center"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg></button>
        <h2 className="text-lg font-extrabold text-[#0f172a] absolute left-1/2 -translate-x-1/2 whitespace-nowrap">{isMapView ? 'Mapa' : 'Dónde usarlas'}</h2>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 relative overflow-hidden">
        <div className={`absolute inset-0 transition-transform duration-500 z-10 bg-[#f8fbfb] ${isMapView ? '-translate-x-full' : 'translate-x-0'}`}>
          <div className="px-6 pt-6 flex gap-3">
             <input type="text" placeholder="Buscar..." className="flex-1 bg-slate-50 border border-slate-100 rounded-2xl py-3.5 px-4 text-sm font-semibold focus:ring-2 focus:ring-[#24d4bc] outline-none" />
             <button onClick={() => setIsMapView(true)} className="w-12 h-12 rounded-2xl border flex items-center justify-center text-[#1c7cbc] bg-white"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 6l8-4 8 4 8-4v16l-8 4-8-4-8 4V6z"/></svg></button>
          </div>
          <div className="px-6 py-6 flex gap-8 overflow-x-auto no-scrollbar">
            {STORE_CATEGORIES.map((cat) => (
              <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className="flex flex-col items-center gap-2 shrink-0">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all ${selectedCategory === cat.id ? 'border-[#24d4bc] bg-white scale-110 shadow-lg shadow-[#24d4bc]/20' : 'border-slate-100 bg-[#fcfcfc]'}`}>
                  {cat.icon(selectedCategory === cat.id ? '#1c7cbc' : '#94a3b8')}
                </div>
                <span className={`text-[10px] font-bold ${selectedCategory === cat.id ? 'text-[#1c7cbc]' : 'text-slate-400'}`}>{cat.label}</span>
              </button>
            ))}
          </div>
          <div className="px-6 pb-20 space-y-4">
            {STORES_DATA.map((store) => (
              <div key={store.id} className="bg-white rounded-[2.5rem] p-4 border border-slate-100 shadow-sm flex items-center gap-4">
                <div className="w-20 h-20 rounded-3xl overflow-hidden relative shrink-0">
                  <img src={store.img} className="w-full h-full object-cover" alt={store.name} />
                  <div className="absolute bottom-2 left-2 bg-gradient-to-r from-[#24d4bc] to-[#1c7cbc] px-2 py-0.5 rounded-lg"><span className="text-[8px] font-extrabold text-white">{store.discount}</span></div>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#1c7cbc] uppercase">{store.category}</span>
                  <h4 className="text-base font-extrabold text-[#0f172a]">{store.name}</h4>
                  <p className="text-[10px] text-[#94a3b8] font-bold">{store.address}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
