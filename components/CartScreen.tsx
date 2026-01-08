
import React from 'react';
import { CartItem } from '../App';

interface CartScreenProps {
  items: CartItem[];
  onBack: () => void;
  onRemoveItem: (id: string) => void;
}

export const CartScreen: React.FC<CartScreenProps> = ({ items, onBack, onRemoveItem }) => {
  const totalAmount = items.reduce((sum, item) => sum + item.total, 0);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(val).replace('CLP', '$');
  };

  return (
    <div className="h-full w-full bg-white flex flex-col relative animate-in fade-in slide-in-from-right-4 duration-500">
      
      <div className="pt-14 px-6 pb-6 flex items-center justify-between bg-white border-b border-slate-50">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-[#f8fafc] flex items-center justify-center text-[#0f172a] hover:bg-slate-200 transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <h2 className="text-base font-extrabold text-[#0f172a] absolute left-1/2 -translate-x-1/2">Carrito</h2>
        <div className="bg-[#f0f9f9] px-3 py-1 rounded-full">
          <span className="text-[10px] font-bold text-[#1c7cbc]">
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pt-10 pb-40 no-scrollbar">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
            </div>
            <p className="text-slate-400 font-bold text-sm">Tu carrito está vacío</p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white border border-slate-100 rounded-[1rem] p-5 shadow-sm flex items-center gap-5 relative">
                <div className="w-16 h-16 bg-[#f8fafc] rounded-2xl flex items-center justify-center shrink-0">
                  <div className="text-[#1c7cbc]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><path d="M12 18h.01"/>
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-extrabold text-[#0f172a] mb-0.5">Gift Card {item.type === 'full' ? 'Full' : 'Select'}</h4>
                  <p className="text-[10px] text-[#94a3b8] font-bold">Cantidad: {item.quantity}</p>
                  <div className="mt-2 text-right">
                    <span className="text-sm font-extrabold text-[#1c7cbc]">{formatCurrency(item.total)}</span>
                  </div>
                </div>
                <button onClick={() => onRemoveItem(item.id)} className="absolute top-4 right-4 text-slate-200 hover:text-red-400">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="absolute bottom-0 w-full bg-white px-6 pb-12 pt-6 border-t border-slate-50 rounded-t-[3rem] shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider mb-1">Total a pagar</p>
            <h3 className="text-2xl font-extrabold text-[#0f172a]">{formatCurrency(totalAmount)}</h3>
          </div>
        </div>
        <button disabled={items.length === 0} className={`w-full py-5 rounded-[1rem] font-extrabold text-sm transition-all shadow-lg flex items-center justify-center gap-2 ${items.length > 0 ? 'bg-gradient-to-r from-[#24d4bc] to-[#1c7cbc] text-white active:scale-[0.98]' : 'bg-slate-200 text-white cursor-not-allowed'}`}>
          Ir a pagar
        </button>
      </div>
    </div>
  );
};
