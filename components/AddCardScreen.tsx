
import React, { useState } from 'react';
import { LinkedCard } from '../App';

interface AddCardScreenProps {
  onBack: () => void;
  onAddCard: (card: Omit<LinkedCard, 'id' | 'balance' | 'color'>) => void;
}

export const AddCardScreen: React.FC<AddCardScreenProps> = ({ onBack, onAddCard }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [pin, setPin] = useState('');

  const handleAdd = () => {
    if (name && number) {
      onAddCard({ name, number });
    }
  };

  return (
    <div className="h-full w-full bg-white flex flex-col relative animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="pt-14 px-6 pb-6 flex items-center justify-between bg-white border-b border-slate-50">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-[#f8fafc] flex items-center justify-center text-[#0f172a] hover:bg-slate-200 transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <h2 className="text-base font-extrabold text-[#0f172a] absolute left-1/2 -translate-x-1/2 whitespace-nowrap">Agregar tarjeta</h2>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pt-10 pb-10 no-scrollbar">
        <p className="text-[#64748b] text-sm font-medium mb-10">Ingresa los datos de tu tarjeta para vincularla.</p>
        <div className="space-y-8 mb-10">
          {['NOMBRE DE LA TARJETA', 'NÚMERO DE GIFTCARD', 'CLAVE'].map((label, idx) => (
            <div key={label}>
              <label className="block text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider mb-2">{label}</label>
              <input 
                type={idx === 2 ? 'password' : 'text'} 
                value={idx === 0 ? name : idx === 1 ? number : pin}
                onChange={(e) => idx === 0 ? setName(e.target.value) : idx === 1 ? setNumber(e.target.value) : setPin(e.target.value)}
                className="w-full bg-[#f8fafc] border-none rounded-2xl py-4 px-5 text-[#334155] font-semibold focus:ring-2 focus:ring-[#24d4bc] outline-none text-sm" 
              />
            </div>
          ))}
        </div>
        <button onClick={handleAdd} disabled={!name || !number} className={`w-full text-white font-extrabold py-5 rounded-[1.5rem] shadow-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-all text-sm ${name && number ? 'bg-gradient-to-r from-[#24d4bc] to-[#1c7cbc] shadow-[#1c7cbc]/20' : 'bg-slate-300 cursor-not-allowed'}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          Agregar
        </button>
      </div>

      <div className="absolute bottom-0 w-full px-6 pb-12 pt-6 bg-[#f8fafc] border-t border-slate-50">
        <div className="flex gap-4">
          <div className="w-5 h-5 rounded-full border-2 border-[#1c7cbc] flex items-center justify-center text-[#1c7cbc] text-[10px] font-extrabold italic">i</div>
          <p className="text-[11px] text-[#94a3b8] font-bold leading-relaxed">Puedes encontrar los datos al reverso de tu tarjeta.</p>
        </div>
      </div>
    </div>
  );
};
