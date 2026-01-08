
import React, { useState, useMemo, useRef } from 'react';

interface ExperiencesScreenProps {
  onBack: () => void;
  onOpenCart: () => void;
  onOpenAddCard: () => void;
  onGoHome: () => void;
  cartCount: number;
}

interface Category {
  id: string;
  label: string;
  icon: (color: string) => React.ReactNode;
}

const CATEGORIES: Category[] = [
  { id: 'all', label: 'Toda ocasión', icon: (color: string) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
      <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
  )},
  { id: 'navidad', label: 'Navidad', icon: (color: string) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <circle cx="12" cy="5" r="1" fill={color}/>
      <circle cx="17" cy="7" r="1" fill={color}/>
      <circle cx="19" cy="12" r="1" fill={color}/>
      <circle cx="17" cy="17" r="1" fill={color}/>
      <circle cx="12" cy="19" r="1" fill={color}/>
      <circle cx="7" cy="17" r="1" fill={color}/>
      <circle cx="5" cy="12" r="1" fill={color}/>
      <circle cx="7" cy="7" r="1" fill={color}/>
    </svg>
  )},
  { id: 'agradecimiento', label: 'Agradecimiento', icon: (color: string) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  )},
  { id: 'amistad', label: 'Amistad', icon: (color: string) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  )},
  { id: 'amor', label: 'Amor', icon: (color: string) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
    </svg>
  )},
  { id: 'babyshower', label: 'Baby Shower', icon: (color: string) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
    </svg>
  )},
  { id: 'cumpleanos', label: 'Cumpleaños', icon: (color: string) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 13.5V20h12v-6.5M6 20a2 2 0 0 1-2-2v-4.5M18 20a2 2 0 0 0 2-2v-4.5M6 13.5l6-3 6 3M12 10.5V4M9 4h6"/>
    </svg>
  )},
  { id: 'felicidades', label: 'Felicidades', icon: (color: string) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  )},
];

const EXPERIENCES_DATA = [
  { id: 1, title: 'Escape Room Misterio', subtitle: 'Desafío mental intenso.', pts: '3500 PTS', category: 'amistad', img: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=400' },
  { id: 2, title: 'Cata de Vinos Premium', subtitle: 'Selección de cepas exclusivas.', pts: '6200 PTS', category: 'amor', img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=400' },
  { id: 3, title: 'Cena Navideña Mágica', subtitle: 'Menú especial de temporada.', pts: '4500 PTS', category: 'navidad', img: 'https://images.unsplash.com/photo-1544333346-64e4fe1fefe0?auto=format&fit=crop&q=80&w=400' },
  { id: 4, title: 'Gift Card de Regalo', subtitle: 'Elige tu propio detalle.', pts: '2000 PTS', category: 'agradecimiento', img: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=400' },
  { id: 5, title: 'Sesión Fotográfica Bebé', subtitle: 'Recuerdos inolvidables.', pts: '8000 PTS', category: 'babyshower', img: 'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?auto=format&fit=crop&q=80&w=400' },
  { id: 6, title: 'Tarta Personalizada', subtitle: 'El sabor de tu cumpleaños.', pts: '1500 PTS', category: 'cumpleanos', img: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&q=80&w=400' },
  { id: 7, title: 'Trofeo Cristal Personalizado', subtitle: 'Reconocimiento al esfuerzo.', pts: '5000 PTS', category: 'felicidades', img: 'https://images.unsplash.com/photo-1578351644158-4561b680eb5c?auto=format&fit=crop&q=80&w=400' },
  { id: 8, title: 'Vuelo en Globo Parejas', subtitle: 'Aventura romántica.', pts: '12000 PTS', category: 'amor', img: 'https://images.unsplash.com/photo-1507502707541-f369a3b18502?auto=format&fit=crop&q=80&w=400' },
  { id: 9, title: 'Taller de Manualidades', subtitle: 'Diversión entre amigos.', pts: '2500 PTS', category: 'amistad', img: 'https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&q=80&w=400' },
  { id: 10, title: 'Spa Relajante', subtitle: 'Cuidado personal completo.', pts: '5000 PTS', category: 'agradecimiento', img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=400' },
  { id: 11, title: 'Clase de Yoga Privada', subtitle: 'Encuentra tu paz interior.', pts: '3000 PTS', category: 'amistad', img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400' },
  { id: 12, title: 'Kit de Pastelería', subtitle: 'Todo para hornear en casa.', pts: '2500 PTS', category: 'cumpleanos', img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=400' },
];

export const ExperiencesScreen: React.FC<ExperiencesScreenProps> = ({ 
  onBack, 
  onOpenCart, 
  onOpenAddCard, 
  onGoHome,
  cartCount 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  
  // Drag logic for carousel
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

  const handleImageError = (id: number) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  const filteredExperiences = useMemo(() => {
    let data = EXPERIENCES_DATA;
    if (selectedCategory !== 'all') {
      data = data.filter(exp => exp.category === selectedCategory);
    }
    if (searchQuery.trim() !== '') {
      data = data.filter(exp => 
        exp.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        exp.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return data;
  }, [selectedCategory, searchQuery]);

  const getCategoryIcon = (categoryId: string) => {
    const cat = CATEGORIES.find(c => c.id === categoryId);
    return cat ? cat.icon('#94a3b8') : null;
  };
  
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
        <h2 className="text-xl font-extrabold text-[#0f172a] ml-4">Experiencias</h2>
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
            placeholder="Buscar experiencias..." 
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
          {CATEGORIES.map((cat) => (
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

        {/* Dynamic Grid of Experiences */}
        <div className="px-6 pb-40">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-extrabold text-[#0f172a]">Resultados</h3>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{filteredExperiences.length} disponibles</span>
          </div>

          {filteredExperiences.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {filteredExperiences.map((exp) => (
                <div 
                  key={exp.id} 
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full group hover:shadow-md transition-shadow"
                >
                  <div className="h-32 w-full bg-[#f8fafc] relative overflow-hidden flex items-center justify-center">
                    {/* Placeholder Icon as Background/Fallback */}
                    <div className="absolute inset-0 flex items-center justify-center text-[#e2e8f0] opacity-50 scale-150">
                        {getCategoryIcon(exp.category)}
                    </div>
                    
                    {!imageErrors[exp.id] && (
                        <img 
                          src={exp.img} 
                          onError={() => handleImageError(exp.id)}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 z-10" 
                          alt={exp.title} 
                        />
                    )}
                    
                    <div className="absolute top-3 left-3 bg-[#1c7cbc] px-2.5 py-1 rounded-full shadow-lg z-20">
                      <span className="text-[9px] font-extrabold text-white tracking-wider">{exp.pts}</span>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h5 className="text-[11px] font-extrabold text-[#0f172a] mb-1 line-clamp-1">{exp.title}</h5>
                    <p className="text-[9px] text-slate-400 font-bold mb-4 line-clamp-2 leading-tight">{exp.subtitle}</p>
                    <button className="mt-auto w-full bg-[#f0f9f9] text-[#1c7cbc] text-[10px] font-bold py-3 rounded-xl hover:bg-[#1c7cbc] hover:text-white transition-all active:scale-95">
                      Canjear
                    </button>
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
              <p className="text-[#0f172a] text-sm font-extrabold mb-1">No hay coincidencias</p>
              <p className="text-slate-400 text-xs font-medium px-10">Prueba con otra palabra clave o categoría.</p>
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
