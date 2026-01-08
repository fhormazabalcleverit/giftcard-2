
import React, { useEffect, useState } from 'react';

export const GiftCardSplash: React.FC = () => {
  const [activeDot, setActiveDot] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDot((prev) => (prev % 3) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full w-full bg-gradient-to-br from-[#24d4bc] via-[#1c7cbc] to-[#1c4c9c] flex flex-col items-center justify-center relative select-none overflow-hidden font-sans">
      
      {/* Emulated Image Decorative Elements (Background) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[80%] bg-white/10 blur-[120px] rounded-full"></div>
        
        {/* Diagonal Light Streaks (Top Left) */}
        <div className="absolute top-[-10%] left-[5%] w-[120%] h-12 bg-white/10 rotate-[-45deg] blur-md"></div>
        <div className="absolute top-[15%] left-[-15%] w-[120%] h-8 bg-white/5 rotate-[-45deg] blur-sm"></div>
        
        {/* Small decorative pill shape (Top Left) */}
        <div className="absolute top-[10%] left-[10%] w-16 h-8 bg-white/20 rounded-full rotate-[-45deg] blur-sm"></div>

        {/* Diagonal Light Streaks (Bottom Right) */}
        <div className="absolute bottom-[20%] right-[-10%] w-[100%] h-10 bg-white/10 rotate-[-45deg] blur-md"></div>
        <div className="absolute bottom-[5%] right-[-20%] w-[100%] h-6 bg-white/5 rotate-[-45deg] blur-sm"></div>

        {/* The Star/Shimmer (Bottom Right) */}
        <div className="absolute bottom-8 right-8 text-white/40 animate-pulse">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        </div>
      </div>

      {/* Main Logo (Recreated as SVG to avoid broken links) */}
      <div className="animate-in fade-in zoom-in-95 duration-1000 relative z-10">
        <div className="relative w-28 h-28 rounded-[1.2rem] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] border border-white/20 group">
          
          {/* Internal SVG Logo for Gift Card 2.0 */}
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="cardGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#24d4bc" />
                <stop offset="0.5" stopColor="#1c7cbc" />
                <stop offset="1" stopColor="#1c4c9c" />
              </linearGradient>
            </defs>
            <rect width="100" height="100" fill="url(#cardGrad)" />
            
            {/* Background Lines in Logo */}
            <line x1="10" y1="20" x2="110" y2="20" stroke="white" strokeWidth="0.5" strokeOpacity="0.2" transform="rotate(-45 50 50)" />
            <line x1="10" y1="50" x2="110" y2="50" stroke="white" strokeWidth="0.5" strokeOpacity="0.1" transform="rotate(-45 50 50)" />
            
            {/* 2.0 Text */}
            <text x="50" y="32" fill="white" fontSize="16" fontWeight="900" textAnchor="middle" fontFamily="Inter, sans-serif" style={{ letterSpacing: '-0.05em' }}>2.0</text>
            
            {/* GIFT CARD Text */}
            <text x="50" y="52" fill="white" fontSize="18" fontWeight="300" textAnchor="middle" fontFamily="Inter, sans-serif" style={{ letterSpacing: '0.05em' }}>GIFT</text>
            <text x="50" y="68" fill="white" fontSize="18" fontWeight="300" textAnchor="middle" fontFamily="Inter, sans-serif" style={{ letterSpacing: '0.05em' }}>CARD</text>
            
            {/* Cencosud Text */}
            <text x="50" y="88" fill="white" fontSize="9" fontWeight="700" textAnchor="middle" fontFamily="Inter, sans-serif" opacity="0.9">cencosud</text>
          </svg>

          {/* Dynamic Shine effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1500 ease-in-out pointer-events-none"></div>
        </div>
      </div>

      {/* Loading Indicator */}
      <div className="absolute bottom-20 flex flex-col items-center gap-4 z-10">
        <p className="text-white/60 text-[8px] font-black uppercase tracking-[0.4em] drop-shadow-sm">
          Cargando Sistema
        </p>
        <div className="flex gap-2.5">
          {[1, 2, 3].map((dot) => (
            <div 
              key={dot}
              className={`w-1 h-1 rounded-full transition-all duration-700 ${
                activeDot === dot ? 'bg-white w-4' : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>

    </div>
  );
};
