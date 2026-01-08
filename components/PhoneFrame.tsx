
import React from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  return (
    <div className="relative mx-auto border-[8px] border-[#0f172a] rounded-[3rem] h-[720px] w-[340px] shadow-2xl bg-[#0f172a]">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-7 w-36 bg-[#0f172a] rounded-b-2xl z-50 flex items-center justify-center">
        {/* Speaker line */}
        <div className="w-10 h-1 bg-white/10 rounded-full mb-1"></div>
      </div>

      {/* Side Buttons (Silent/Volume) */}
      <div className="absolute -left-[10px] top-24 h-8 w-[2px] bg-[#1e293b] rounded-l-sm"></div>
      <div className="absolute -left-[10px] top-36 h-12 w-[2px] bg-[#1e293b] rounded-l-sm"></div>
      <div className="absolute -left-[10px] top-52 h-12 w-[2px] bg-[#1e293b] rounded-l-sm"></div>

      {/* Power Button */}
      <div className="absolute -right-[10px] top-40 h-16 w-[2px] bg-[#1e293b] rounded-r-sm"></div>

      {/* Inner Screen */}
      <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden bg-black ring-1 ring-white/10">
        {children}
        
        {/* Home Indicator Bar */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full z-50 pointer-events-none"></div>
      </div>
    </div>
  );
};
