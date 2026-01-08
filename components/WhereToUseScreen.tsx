
import React, { useState, useMemo, useRef } from 'react';

interface WhereToUseScreenProps {
  onBack: () => void;
  onOpenCart: () => void;
  onOpenAddCard: () => void;
  onGoHome: () => void;
  cartCount: number;
}

interface StoreCategory {
  id: string;
  label: string;
  icon: (color: string) => React.ReactNode;
}

const STORE_CATEGORIES: StoreCategory[] = [
  { id: 'all', label: 'Todos', icon: (color: string) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  )},
  { id: 'cafe', label: 'Cafetería', icon: (color: string) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
    </svg>
  )},
  { id: 'restaurante', label: 'Restaurante', icon: (color: string) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
    </svg>
  )},
  { id: 'moda', label: 'Moda', icon: (color: string) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.37 4.91l-3.37-2.1a2 2 0 0 0-2.12 0l-3.37 2.1a2 2 0 0 1-2.12 0l-3.37-2.1a2 2 0 0 0-2.12 0l-3.37 2.1A2 2 0 0 0 2 6.57V21a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6.57a2 2 0 0 0-1.63-1.66z"/>
      <path d="M12 23V7"/>
    </svg>
  )},
  { id: 'supermercado', label: 'Supermercado', icon: (color: string) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
  )},
];

const STORES_DATA = [
  { id: 1, name: 'Café Central', category: 'cafe', address: 'Av. Principal 123', discount: '15% OFF', img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=400' },
  { id: 2, name: 'Restaurante El Olivo', category: 'restaurante', address: 'Av. Las Flores 456', discount: '10% OFF', img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=400' },
  { id: 3, name: 'Moda & Estilo', category: 'moda', address: 'Calle Comercio 789', discount: '20% OFF', img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=400' },
  { id: 4, name: 'Jumbo', category: 'supermercado', address: 'Mall Costanera Center', discount: '5% acumula', img: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&q=80&w=400' },
  { id: 5, name: 'Paris', category: 'moda', address: 'Av. Libertador 1000', discount: '15% OFF', img: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=400' },
];

export const WhereToUseScreen: React.FC<WhereToUseScreenProps> = ({ 
  onBack, 
  onOpenCart, 
  onOpenAddCard, 
  onGoHome,
  cartCount 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
    carouselRef.current.style.scrollSnapType = 'none';
    carouselRef.current.style.cursor = 'grabbing';
  };

  const handleMouseLeave = () => {
    if (!isDragging || !carouselRef.current) return;
    setIsDragging(false);
    carouselRef.current.style.scrollSnapType = 'x mandatory';
    carouselRef.current.style.cursor = 'grab';
  };

  const handleMouseUp = () => {
    if (!isDragging || !carouselRef.current) return;
    setIsDragging(false);
    carouselRef.current.style.scrollSnapType = 'x mandatory';
    carouselRef.current.style.cursor = 'grab';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; 
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const filteredStores = useMemo(() => {
    let data = STORES_DATA;
    if (selectedCategory !== 'all') {
      data = data.filter(store => store.category === selectedCategory);
    }
    if (searchQuery.trim() !== '') {
      data = data.filter(store => 
        store.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        store.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return data;
  }, [selectedCategory, searchQuery]);
  
  return (
    <div className="h-full w-full bg-white flex flex-col relative animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="pt-14 px-6 pb-4 flex items-center bg-white border-b border-slate-50 relative z-20">
        <button 
          onClick={onBack} 
          className="w-10 h-10 rounded-full bg-[#f8fafc] flex items-center justify-center text-[#0f172a] shadow-sm active:scale-95 transition-all"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h2 className="text-xl font-extrabold text-[#0f172a] ml-4">Dónde usarlas</h2>
      </div>

      {/* Search Bar Area */}
      <div className="px-6 py-4 bg-white sticky top-0 z-10">
        <div className="relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar comercios..." 
            className="w-full bg-[#f8fafc] border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold text-[#334155] placeholder-[#94a3b8] focus:ring-2 focus:ring-[#1c7cbc]/20 outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Categories Horizontal Carousel Filter */}
        <div 
          ref={carouselRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="px-6 py-6 flex gap-6 overflow-x-auto no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing select-none"
        >
          {STORE_CATEGORIES.map((cat) => (
            <button 
              key={cat.id} 
              onClick={() => setSelectedCategory(cat.id)} 
              className="flex flex-col items-center gap-2.5 shrink-0 group pointer-events-auto"
            >
              <div className={`w-[60px] h-[60px] rounded-full flex items-center justify-center border transition-all duration-300 pointer-events-none ${
                selectedCategory === cat.id 
                  ? 'border-[#1c7cbc] bg-[#f0f9f9]' 
                  : 'border-slate-100 bg-[#f8fafc]'
              }`}>
                {cat.icon(selectedCategory === cat.id ? '#1c7cbc' : '#94a3b8')}
              </div>
              <span className={`text-[11px] font-bold tracking-tight transition-colors whitespace-nowrap pointer-events-none ${
                selectedCategory === cat.id ? 'text-[#1c7cbc]' : 'text-slate-500'
              }`}>
                {cat.label}
              </span>
            </button>
          ))}
        </div>

        {/* List of Stores */}
        <div className="px-6 pb-40">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-extrabold text-[#0f172a]">Comercios asociados</h3>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{filteredStores.length} encontrados</span>
          </div>

          {filteredStores.length > 0 ? (
            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {filteredStores.map((store) => (
                <div 
                  key={store.id} 
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex items-center p-4 gap-4 group hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="w-20 h-20 bg-slate-100 rounded-2xl overflow-hidden shrink-0 relative">
                    <img 
                      src={store.img} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                      alt={store.name} 
                    />
                    <div className="absolute bottom-1 right-1 bg-gradient-to-r from-[#24d4bc] to-[#1c7cbc] px-2 py-0.5 rounded-lg shadow-sm">
                      <span className="text-[8px] font-extrabold text-white">{store.discount}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <span className="text-[9px] font-bold text-[#1c7cbc] uppercase tracking-wider mb-1 block">
                      {STORE_CATEGORIES.find(c => c.id === store.category)?.label}
                    </span>
                    <h4 className="text-sm font-extrabold text-[#0f172a] mb-0.5">{store.name}</h4>
                    <p className="text-[10px] text-slate-400 font-bold">{store.address}</p>
                  </div>
                  <div className="text-slate-200 group-hover:text-[#1c7cbc] transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-500">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </div>
              <p className="text-[#0f172a] text-sm font-extrabold mb-1">Sin resultados</p>
              <p className="text-slate-400 text-xs font-medium px-10">No encontramos comercios que coincidan con tu búsqueda.</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="absolute bottom-0 w-full bg-white/90 backdrop-blur-xl border-t border-slate-100 px-6 py-4 flex justify-between items-center z-20">
        <button onClick={onGoHome} className="flex flex-col items-center gap-1 group text-slate-400 hover:text-[#1c7cbc] transition-colors">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          <span className="text-[9px] font-bold">Inicio</span>
        </button>
        
        <button className="flex flex-col items-center gap-1 text-[#1c7cbc]">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <span className="text-[9px] font-bold">Buscar</span>
        </button>

        <div className="relative -top-10">
          <button 
            onClick={onOpenAddCard}
            className="bg-gradient-to-br from-[#24d4bc] to-[#1c7cbc] w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#1c7cbc]/40 border-4 border-white active:scale-95 transition-transform cursor-pointer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>

        <button 
          onClick={onOpenCart}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors relative"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          {cartCount > 0 && (
            <div className="absolute -top-1 right-2 w-4 h-4 bg-[#24d4bc] rounded-full flex items-center justify-center border border-white">
               <span className="text-white text-[8px] font-extrabold">{cartCount}</span>
            </div>
          )}
          <span className="text-[9px] font-bold">Tienda</span>
        </button>

        <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>
          </svg>
          <span className="text-[9px] font-bold">Más</span>
        </button>
      </div>

    </div>
  );
};
