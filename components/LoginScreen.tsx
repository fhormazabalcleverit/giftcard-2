
import React, { useState } from 'react';

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="h-full w-full bg-white flex flex-col px-8 pt-20 pb-10 overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* Welcome Header */}
      <div className="mb-10">
        <h1 className="text-xl font-extrabold text-[#0f172a] mb-3">
          ¡Te damos la bienvenida!
        </h1>
        <p className="text-[#64748b] text-sm leading-relaxed">
          Ingresa a tu portal optimizado y disfruta de Gift Card 2.0 de Cencosud.
        </p>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="flex flex-col flex-1">
        <div className="space-y-6 mb-8">
          {/* Email Field */}
          <div>
            <label className="block text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider mb-2">
              Correo electrónico
            </label>
            <div className="relative">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nombre@ejemplo.com"
                className="w-full bg-[#f8fafc] border-none rounded-2xl py-4 px-5 text-[#334155] placeholder-[#cbd5e1] focus:ring-2 focus:ring-[#24d4bc] transition-all outline-none text-sm"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider">
                Contraseña
              </label>
              <button type="button" className="text-[10px] font-bold text-[#1c7cbc]">
                ¿Olvidaste la contraseña?
              </button>
            </div>
            <div className="relative">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="........"
                className="w-full bg-[#f8fafc] border-none rounded-2xl py-4 px-5 text-[#334155] placeholder-[#cbd5e1] focus:ring-2 focus:ring-[#24d4bc] transition-all outline-none text-sm"
                required
              />
            </div>
          </div>
        </div>

        {/* Login Button with Splash Gradient */}
        <button 
          type="submit"
          className="w-full bg-gradient-to-r from-[#24d4bc] to-[#1c7cbc] text-white font-bold py-4 rounded-2xl shadow-lg shadow-[#1c7cbc]/20 hover:opacity-90 active:scale-[0.98] transition-all mb-10"
        >
          Iniciar Sesión
        </button>
      </form>

      {/* Quick Access Separator */}
      <div className="relative flex items-center justify-center mb-8">
        <div className="absolute w-full border-t border-[#f1f5f9]"></div>
        <span className="relative bg-white px-4 text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest">
          O accede rápido
        </span>
      </div>

      {/* Social/Auth Buttons */}
      <div className="space-y-4 mb-8">
        <button className="w-full bg-white border border-[#f1f5f9] flex items-center justify-center py-3.5 rounded-2xl hover:bg-slate-50 transition-colors group">
          <div className="mr-3 text-[#1c7cbc]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
              <path d="M12 6a6 6 0 1 0 6 6 6 6 0 0 0-6-6zm0 10a4 4 0 1 1 4-4 4 4 0 0 1-4 4z" />
              <circle cx="12" cy="12" r="1.5" />
            </svg>
          </div>
          <span className="text-sm font-bold text-[#334155]">Huella Digital / FaceID</span>
        </button>

        <button className="w-full bg-white border border-[#f1f5f9] flex items-center justify-center py-3.5 rounded-2xl hover:bg-slate-50 transition-colors">
          <div className="mr-3">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          </div>
          <span className="text-sm font-bold text-[#334155]">Continuar con Google</span>
        </button>
      </div>

      {/* Footer link */}
      <div className="text-center">
        <p className="text-xs font-bold text-[#94a3b8]">
          ¿No tienes cuenta? <span className="text-[#1c7cbc] cursor-pointer">Regístrate</span>
        </p>
      </div>

      {/* Bottom Bar Spacer */}
      <div className="h-6 w-full"></div>
    </div>
  );
};
