
import React, { useRef, useState } from 'react';
import { LinkedCard } from '../App';

interface HomeScreenProps {
  onStartQuote: () => void;
  onOpenCart: () => void;
  onOpenAddCard: () => void;
  onOpenExperiences: () => void;
  onOpenWhereToUse: () => void;
  cartCount: number;
  linkedCards: LinkedCard[];
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ 
  onStartQuote, 
  onOpenCart, 
  onOpenAddCard, 
  onOpenExperiences,
  onOpenWhereToUse,
  cartCount,
  linkedCards 
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardScrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent, ref: React.RefObject<HTMLDivElement>) => {
    if (!ref.current) return;
    setIsDragging(true);
    setStartX(e.pageX - ref.current.offsetLeft);
    setScrollLeft(ref.current.scrollLeft);
    ref.current.style.scrollSnapType = 'none';
    ref.current.style.cursor = 'grabbing';
  };

  const handleMouseLeave = (ref: React.RefObject<HTMLDivElement>) => {
    if (!isDragging || !ref.current) return;
    setIsDragging(false);
    ref.current.style.scrollSnapType = 'x mandatory';
    ref.current.style.cursor = 'grab';
  };

  const handleMouseUp = (ref: React.RefObject<HTMLDivElement>) => {
    if (!isDragging || !ref.current) return;
    setIsDragging(false);
    ref.current.style.scrollSnapType = 'x mandatory';
    ref.current.style.cursor = 'grab';
  };

  const handleMouseMove = (e: React.MouseEvent, ref: React.RefObject<HTMLDivElement>) => {
    if (!isDragging || !ref.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX) * 1.5; 
    ref.current.scrollLeft = scrollLeft - walk;
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(val).replace('CLP', '$');
  };

  const maskCardNumber = (num: string) => {
    const last4 = num.slice(-4) || 'xxxx';
    return `•••• •••• •••• ${last4}`;
  };

  return (
    <div className="h-full w-full bg-[#f8fbfb] flex flex-col relative overflow-hidden animate-in fade-in duration-700">
      
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto px-6 pt-16 pb-40 no-scrollbar">
        
        {/* Header Branding */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[#1c7cbc] uppercase tracking-[0.2em] mb-1">
              Gift Card 2.0
            </span>
            <h2 className="text-xl font-bold text-[#0f172a]">
              Hola, Francisco
            </h2>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={onOpenCart}
              className="relative w-10 h-10 rounded-full bg-[#f1f5f9] flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {cartCount > 0 && (
                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#24d4bc] rounded-full border-2 border-[#f8fbfb] flex items-center justify-center animate-in zoom-in duration-300">
                  <span className="text-white text-[9px] font-extrabold">{cartCount}</span>
                </div>
              )}
            </button>
            <button className="w-10 h-10 rounded-full bg-[#f1f5f9] flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>
          </div>
        </div>

        {/* Balance Card - Updated to Splash Gradient */}
        <div className="relative w-full h-48 rounded-[0.8rem] bg-gradient-to-tr from-[#24d4bc] via-[#1c7cbc] to-[#1c4c9c] p-7 flex flex-col justify-between shadow-xl shadow-[#1c7cbc]/20 overflow-hidden group mb-8">
          <div className="relative z-10">
            <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest mb-1">
              Saldo total disponible
            </p>
            <h3 className="text-white text-2xl font-extrabold tracking-tight">
              $1,250.00
            </h3>
          </div>
          
          <button 
            onClick={onOpenAddCard}
            className="relative z-10 w-fit px-6 py-2.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold flex items-center gap-2 hover:bg-white/30 transition-all active:scale-95"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Agregar tarjeta
          </button>

          <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-32 h-32 bg-black/10 rounded-full blur-2xl"></div>
        </div>

        {/* Mis tarjetas Section */}
        {linkedCards.length > 0 && (
          <div className="mb-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-extrabold text-[#0f172a]">Mis tarjetas</h4>
              <div className="bg-slate-100 px-2 py-0.5 rounded-full">
                <span className="text-[10px] font-bold text-slate-500">{linkedCards.length} activas</span>
              </div>
            </div>
            
            <div 
              ref={cardScrollRef}
              onMouseDown={(e) => handleMouseDown(e, cardScrollRef)}
              onMouseLeave={() => handleMouseLeave(cardScrollRef)}
              onMouseUp={() => handleMouseUp(cardScrollRef)}
              onMouseMove={(e) => handleMouseMove(e, cardScrollRef)}
              className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6 snap-x snap-mandatory cursor-grab select-none active:cursor-grabbing scroll-smooth"
            >
              {linkedCards.map((card) => (
                <div 
                  key={card.id}
                  className={`flex-shrink-0 w-[240px] h-[140px] rounded-[2rem] ${card.color} p-6 flex flex-col justify-between shadow-lg snap-center relative overflow-hidden`}
                >
                  <div className="relative z-10">
                    <p className="text-white/80 text-[10px] font-bold uppercase mb-1">{card.name}</p>
                    <h3 className="text-white text-2xl font-extrabold">{formatCurrency(card.balance)}</h3>
                  </div>
                  
                  <div className="relative z-10">
                    <p className="text-white/60 text-[8px] font-bold uppercase tracking-wider mb-1">Número de tarjeta</p>
                    <p className="text-white text-[11px] font-bold tracking-widest">{maskCardNumber(card.number)}</p>
                  </div>

                  <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experiencias Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-extrabold text-[#0f172a]">Experiencias</h4>
            <button 
              onClick={onOpenExperiences}
              className="text-[11px] font-bold text-[#1c7cbc] flex items-center gap-1 hover:underline"
            >
              Ver todas
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
          
          <div 
            ref={scrollRef}
            onMouseDown={(e) => handleMouseDown(e, scrollRef)}
            onMouseLeave={() => handleMouseLeave(scrollRef)}
            onMouseUp={() => handleMouseUp(scrollRef)}
            onMouseMove={(e) => handleMouseMove(e, scrollRef)}
            className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6 snap-x snap-mandatory cursor-grab select-none active:cursor-grabbing scroll-smooth"
          >
            {[
              { title: "Spa Day Relajante", img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=400" },
              { title: "Cena Gourmet", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=400" },
              { title: "Cine Premium 2D", img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=400" },
              { title: "Escape Room Aventura", img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=400" },
              { title: "Salto Tándem Sky", img: "https://images.unsplash.com/photo-1521673419360-fc463e275992?auto=format&fit=crop&q=80&w=400" }
            ].map((exp, idx) => (
              <div 
                key={idx}
                tabIndex={0}
                className="flex-shrink-0 w-48 rounded-3xl bg-white shadow-sm border border-slate-100 overflow-hidden snap-center outline-none focus:ring-2 focus:ring-[#24d4bc] group transition-all"
              >
                <div className="h-28 w-full bg-slate-200 overflow-hidden pointer-events-none">
                  <img 
                    src={exp.img} 
                    draggable="false"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 select-none" 
                    alt={exp.title} 
                  />
                </div>
                <div className="p-4">
                  <h5 className="text-[11px] font-extrabold text-[#0f172a] mb-3 line-clamp-1 select-none">{exp.title}</h5>
                  <button className="w-full bg-[#f0f9f9] text-[#1c7cbc] text-[10px] font-bold py-2.5 rounded-xl active:bg-[#e0f4f4] transition-colors pointer-events-auto">
                    Canjear
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Donde Usarlas Section */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-extrabold text-[#0f172a]">Dónde usarlas</h4>
            <button 
              onClick={onOpenWhereToUse}
              className="text-[11px] font-bold text-[#1c7cbc] hover:underline"
            >
              Ver todos
            </button>
          </div>
          
          <div className="flex flex-col gap-4">
            {[
              { name: "Café Central", address: "Av. Principal 123", discount: "15% OFF", img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=200" },
              { name: "Restaurante El Olivo", address: "Av. Las Flores 456", discount: "10% OFF", img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=200" },
              { name: "Moda & Estilo", address: "Calle Comercio 789", discount: "20% OFF", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=200" }
            ].map((place, idx) => (
              <div key={idx} className="bg-white rounded-[1rem] p-4 border border-slate-100 shadow-sm flex items-center justify-between active:bg-slate-50 transition-colors cursor-pointer hover:shadow-md">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-200">
                    <img src={place.img} draggable="false" className="w-full h-full object-cover" alt={place.name} />
                  </div>
                  <div>
                    <h5 className="text-sm font-extrabold text-[#0f172a]">{place.name}</h5>
                    <p className="text-[10px] text-[#94a3b8] font-bold">{place.address}</p>
                  </div>
                </div>
                <div className="px-3 py-1 bg-cyan-50 text-[#1c7cbc] text-[10px] font-bold rounded-full">
                  {place.discount}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Business Banner with Splash Gradient */}
        <div className="w-full bg-gradient-to-br from-[#1c7cbc] to-[#1c4c9c] rounded-[1rem] p-8 flex flex-col gap-6 shadow-xl shadow-cyan-100 mb-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-white text-xl font-extrabold leading-tight">
              ¿Eres una empresa?
            </h3>
            <p className="text-white/80 text-sm font-medium leading-relaxed">
              Cotiza GiftCards para tus colaboradores y mejora su bienestar.
            </p>
          </div>
          
          <button 
            onClick={onStartQuote}
            className="w-full border-2 border-white/40 bg-transparent text-white font-extrabold py-3.5 rounded-2xl hover:bg-white/10 transition-all active:scale-[0.98] text-sm"
          >
            Solicitar cotización
          </button>
        </div>

      </div>

      {/* Bottom Navigation Bar */}
      <div className="absolute bottom-0 w-full bg-white/90 backdrop-blur-xl border-t border-slate-100 px-6 py-4 flex justify-between items-center z-20">
        <button className="flex flex-col items-center gap-1 group">
          <svg className="text-[#1c7cbc]" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
          <span className="text-[9px] font-bold text-[#1c7cbc]">Inicio</span>
        </button>
        
        <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
