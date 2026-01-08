
import React, { useState } from 'react';
import { CartItem } from '../App';

interface QuoteFlowProps {
  onBack: () => void;
  onAddToCart: (item: Omit<CartItem, 'id'>) => void;
}

export const QuoteFlow: React.FC<QuoteFlowProps> = ({ onBack, onAddToCart }) => {
  const [step, setStep] = useState(1);
  const [selectedFormat, setSelectedFormat] = useState<'physical' | 'digital' | null>(null);
  const [selectedType, setSelectedType] = useState<'full' | 'select' | null>(null);
  
  const [unitAmount, setUnitAmount] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');

  const subtotal = (Number(unitAmount) || 0) * (Number(quantity) || 0);

  const handleNextStep = () => {
    if (step === 1 && selectedFormat) {
      setStep(2);
    } else if (step === 2 && selectedType) {
      setStep(3);
    } else if (step === 3 && unitAmount && quantity) {
      setStep(4);
    }
  };

  const handlePrevStep = () => {
    if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
    else if (step === 4) setStep(3);
    else onBack();
  };

  const handleFinalAddToCart = () => {
    if (selectedFormat && selectedType) {
      onAddToCart({
        format: selectedFormat,
        type: selectedType,
        unitAmount: Number(unitAmount),
        quantity: Number(quantity),
        total: subtotal
      });
    }
  };

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
        <button onClick={handlePrevStep} className="w-10 h-10 rounded-full bg-[#f8fafc] flex items-center justify-center text-[#0f172a] hover:bg-slate-200 transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h2 className="text-base font-extrabold text-[#0f172a] absolute left-1/2 -translate-x-1/2 whitespace-nowrap">Cotización Empresa</h2>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pt-10 pb-10 no-scrollbar">
        
        <div className="flex justify-center gap-2 mb-10">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className={`h-1.5 w-8 rounded-full transition-colors duration-300 ${step >= s ? 'bg-[#24d4bc]' : 'bg-[#f1f5f9]'}`}></div>
          ))}
        </div>

        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-2 duration-300">
            <div className="mb-10">
              <h3 className="text-xl font-extrabold text-[#0f172a] mb-2">Selecciona el formato</h3>
              <p className="text-[#64748b] text-sm font-medium">Elige cómo quieres entregar tus Gift Cards.</p>
            </div>

            <div className="space-y-6 mb-12">
              <button 
                onClick={() => setSelectedFormat('physical')}
                className={`w-full p-5 rounded-[1rem] border-2 transition-all flex flex-col gap-4 text-left ${
                  selectedFormat === 'physical' ? 'bg-[#f0f9f9] border-[#24d4bc]' : 'bg-[#f8fafc] border-transparent'
                }`}
              >
                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors shrink-0 ${selectedFormat === 'physical' ? 'bg-white' : 'bg-white shadow-sm'}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1c7cbc" strokeWidth="2">
                      <rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-[#0f172a] mb-0.5">Gift Card Física</h4>
                    <p className="text-[11px] text-[#94a3b8] font-bold">Tarjetas de PVC de alta calidad.</p>
                  </div>
                </div>
                {selectedFormat === 'physical' && (
                  <div className="w-full pt-4 border-t border-[#24d4bc]/20 animate-in fade-in slide-in-from-top-2 duration-300">
                    <ul className="space-y-3">
                      <li className="flex gap-3 items-start">
                        <div className="w-2 h-2 rounded-full bg-[#24d4bc] mt-1.5 shrink-0"></div>
                        <p className="text-[#334155] text-[11px] font-semibold leading-relaxed">Las Gift Card se enviarán físicamente a una dirección de despacho.</p>
                      </li>
                      <li className="flex gap-3 items-start">
                        <div className="w-2 h-2 rounded-full bg-[#24d4bc] mt-1.5 shrink-0"></div>
                        <p className="text-[#334155] text-[11px] font-semibold leading-relaxed">Tiempo de entrega: 3 a 5 días hábiles posterior a la compra.</p>
                      </li>
                    </ul>
                  </div>
                )}
              </button>

              <button 
                onClick={() => setSelectedFormat('digital')}
                className={`w-full p-5 rounded-[1rem] border-2 transition-all flex flex-col gap-4 text-left ${
                  selectedFormat === 'digital' ? 'bg-[#f0f9f9] border-[#24d4bc]' : 'bg-[#f8fafc] border-transparent'
                }`}
              >
                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors shrink-0 ${selectedFormat === 'digital' ? 'bg-white' : 'bg-white shadow-sm'}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1c7cbc" strokeWidth="2">
                      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><path d="M12 18h.01" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-[#0f172a] mb-0.5">Gift Card Digital</h4>
                    <p className="text-[11px] text-[#94a3b8] font-bold">Envío instantáneo por email o SMS.</p>
                  </div>
                </div>
                {selectedFormat === 'digital' && (
                  <div className="w-full pt-4 border-t border-[#24d4bc]/20 animate-in fade-in slide-in-from-top-2 duration-300">
                    <ul className="space-y-3">
                      <li className="flex gap-3 items-start">
                        <div className="w-2 h-2 rounded-full bg-[#24d4bc] mt-1.5 shrink-0"></div>
                        <p className="text-[#334155] text-[11px] font-semibold leading-relaxed">Las Gift Card se generarán en formato digital y podrán ser descargadas desde la sección "Mi Cuenta".</p>
                      </li>
                      <li className="flex gap-3 items-start">
                        <div className="w-2 h-2 rounded-full bg-[#24d4bc] mt-1.5 shrink-0"></div>
                        <p className="text-[#334155] text-[11px] font-semibold leading-relaxed">Tiempo de entrega: 24 a 48 hrs hábiles posterior a la compra.</p>
                      </li>
                      <li className="flex gap-3 items-start">
                        <div className="w-2 h-2 rounded-full bg-[#24d4bc] mt-1.5 shrink-0"></div>
                        <p className="text-[#334155] text-[11px] font-semibold leading-relaxed">No existe costo de despacho.</p>
                      </li>
                    </ul>
                  </div>
                )}
              </button>
            </div>

            <button onClick={handleNextStep} disabled={!selectedFormat} className={`w-full py-5 rounded-[1rem] font-extrabold text-sm transition-all shadow-lg ${selectedFormat ? 'bg-gradient-to-r from-[#24d4bc] to-[#1c7cbc] text-white shadow-[#1c7cbc]/20 active:scale-[0.98]' : 'bg-[#cbd5e1] text-white cursor-not-allowed'}`}>
              Continuar
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-2 duration-300">
            <div className="mb-10">
              <h3 className="text-xl font-extrabold text-[#0f172a] mb-2">Selecciona el tipo</h3>
              <p className="text-[#64748b] text-sm font-medium">Elige la flexibilidad de uso para tus Gift Cards.</p>
            </div>

            <div className="space-y-6 mb-12">
              {/* Gift Card Full */}
              <button 
                onClick={() => setSelectedType('full')}
                className={`w-full p-5 rounded-[1rem] border-2 transition-all flex flex-col gap-4 text-left ${
                  selectedType === 'full' ? 'bg-[#fdfaff] border-[#a855f7]' : 'bg-[#f8fafc] border-transparent'
                }`}
              >
                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors shrink-0 ${selectedType === 'full' ? 'bg-white shadow-sm' : 'bg-white shadow-sm'}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2.5">
                      <path d="M12 2l2.4 7.2h7.6l-6.2 4.5 2.4 7.3-6.2-4.5-6.2 4.5 2.4-7.3-6.2-4.5h7.6z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-[#0f172a] mb-0.5">Gift Card Full</h4>
                    <p className="text-[11px] text-[#94a3b8] font-bold">Canjeable en todas las tiendas asociadas.</p>
                  </div>
                </div>

                {selectedType === 'full' && (
                  <div className="w-full pt-4 border-t border-[#a855f7]/20 animate-in fade-in slide-in-from-top-2 duration-300">
                    <ul className="space-y-3">
                      <li className="flex gap-3 items-start">
                        <div className="w-2 h-2 rounded-full bg-[#a855f7] mt-1.5 shrink-0"></div>
                        <p className="text-[#334155] text-[11px] font-semibold leading-relaxed">Habilitada para compras en Paris, Jumbo, Santa Isabel, Easy, Spid.</p>
                      </li>
                      <li className="flex gap-3 items-start">
                        <div className="w-2 h-2 rounded-full bg-[#a855f7] mt-1.5 shrink-0"></div>
                        <p className="text-[#334155] text-[11px] font-semibold leading-relaxed">Válida para compras en jumbo.cl, santaisabel.cl y paris.cl incluido productos marketplace.</p>
                      </li>
                      <li className="flex gap-3 items-start">
                        <div className="w-2 h-2 rounded-full bg-[#a855f7] mt-1.5 shrink-0"></div>
                        <p className="text-[#a855f7] text-[11px] font-extrabold leading-relaxed">Recibe una Factura Exenta.</p>
                      </li>
                    </ul>
                  </div>
                )}
              </button>

              {/* Gift Card Select */}
              <button 
                onClick={() => setSelectedType('select')}
                className={`w-full p-5 rounded-[1rem] border-2 transition-all flex flex-col gap-4 text-left ${
                  selectedType === 'select' ? 'bg-[#fdfaff] border-[#a855f7]' : 'bg-[#f8fafc] border-transparent'
                }`}
              >
                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors shrink-0 ${selectedType === 'select' ? 'bg-white shadow-sm' : 'bg-white shadow-sm'}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2.5">
                      <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M9 12l2 2 4-4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-[#0f172a] mb-0.5">Gift Card Select</h4>
                    <p className="text-[11px] text-[#94a3b8] font-bold">Canjeable en rubros específicos seleccionados.</p>
                  </div>
                </div>

                {selectedType === 'select' && (
                  <div className="w-full pt-4 border-t border-[#a855f7]/20 animate-in fade-in slide-in-from-top-2 duration-300">
                    <ul className="space-y-3">
                      <li className="flex gap-3 items-start">
                        <div className="w-2 h-2 rounded-full bg-[#a855f7] mt-1.5 shrink-0"></div>
                        <p className="text-[#334155] text-[11px] font-semibold leading-relaxed">Habilitada para compras en todos los comercios a excepción de Easy.</p>
                      </li>
                      <li className="flex gap-3 items-start">
                        <div className="w-2 h-2 rounded-full bg-[#a855f7] mt-1.5 shrink-0"></div>
                        <p className="text-[#334155] text-[11px] font-semibold leading-relaxed">Válida para compras en paris.cl, a excepción de productos Marketplace.</p>
                      </li>
                      <li className="flex gap-3 items-start">
                        <div className="w-2 h-2 rounded-full bg-[#a855f7] mt-1.5 shrink-0"></div>
                        <p className="text-[#a855f7] text-[11px] font-extrabold leading-relaxed">Recibe una Factura Afecta.</p>
                      </li>
                    </ul>
                  </div>
                )}
              </button>
            </div>

            <button onClick={handleNextStep} disabled={!selectedType} className={`w-full py-5 rounded-[1rem] font-extrabold text-sm transition-all shadow-lg ${selectedType ? 'bg-gradient-to-r from-[#24d4bc] to-[#1c7cbc] text-white shadow-[#1c7cbc]/20 active:scale-[0.98]' : 'bg-[#cbd5e1] text-white cursor-not-allowed'}`}>
              Continuar
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right-2 duration-300">
            <div className="mb-8">
              <h3 className="text-xl font-extrabold text-[#0f172a] mb-2">Montos y cantidades</h3>
              <p className="text-[#64748b] text-sm font-medium">Define el valor unitario y cuántas necesitas.</p>
            </div>
            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider mb-2">MONTO UNITARIO ($)</label>
                <input type="number" value={unitAmount} onChange={(e) => setUnitAmount(e.target.value)} placeholder="Ej: 50000" className="w-full bg-[#f8fafc] border-none rounded-2xl py-4 px-5 text-[#334155] font-semibold focus:ring-2 focus:ring-[#24d4bc] transition-all outline-none text-sm" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider mb-2">CANTIDAD DE TARJETAS</label>
                <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Ej: 10" className="w-full bg-[#f8fafc] border-none rounded-2xl py-4 px-5 text-[#334155] font-semibold focus:ring-2 focus:ring-[#24d4bc] transition-all outline-none text-sm" />
              </div>
              <div className="bg-[#f8fafc] border border-dashed border-[#e2e8f0] rounded-2xl p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[11px] font-bold text-[#94a3b8]">Subtotal estimado</span>
                  <span className="text-[11px] font-extrabold text-[#64748b]">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-sm font-extrabold text-[#0f172a]">Total</span>
                  <span className="text-lg font-extrabold text-[#1c7cbc]">{formatCurrency(subtotal)}</span>
                </div>
              </div>
            </div>
            <button onClick={handleNextStep} disabled={!unitAmount || !quantity} className={`w-full py-5 rounded-[1rem] font-extrabold text-sm transition-all shadow-lg ${unitAmount && quantity ? 'bg-gradient-to-r from-[#24d4bc] to-[#1c7cbc] text-white active:scale-[0.98]' : 'bg-[#cbd5e1] text-white cursor-not-allowed'}`}>
              Siguiente paso
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="animate-in fade-in slide-in-from-right-2 duration-300">
            <div className="mb-8">
              <h3 className="text-xl font-extrabold text-[#0f172a] mb-2">Resumen</h3>
            </div>
            <div className="bg-[#f8fafc] rounded-[1rem] p-8 mb-10 shadow-sm border border-slate-50">
              <div className="space-y-4 border-b border-slate-200 pb-4 mb-4">
                 <div className="flex justify-between">
                   <span className="text-[10px] font-bold text-slate-400 uppercase">Formato</span>
                   <span className="text-[10px] font-bold text-slate-700 uppercase">{selectedFormat === 'physical' ? 'Físico' : 'Digital'}</span>
                 </div>
                 <div className="flex justify-between">
                   <span className="text-[10px] font-bold text-slate-400 uppercase">Tipo</span>
                   <span className="text-[10px] font-bold text-slate-700 uppercase">{selectedType === 'full' ? 'Full' : 'Select'}</span>
                 </div>
              </div>
              <div className="flex justify-between items-center pt-4">
                <span className="text-sm font-extrabold text-[#0f172a]">Total Final</span>
                <span className="text-xl font-extrabold text-[#1c7cbc]">{formatCurrency(subtotal)}</span>
              </div>
            </div>
            <button onClick={handleFinalAddToCart} className="w-full bg-gradient-to-r from-[#24d4bc] to-[#1c7cbc] text-white font-extrabold py-5 rounded-[1rem] shadow-lg flex items-center justify-center gap-3 active:scale-[0.98] text-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              Agregar al carrito
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
