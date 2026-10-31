import React, { useState } from 'react';
import { Phone, Menu, X, ShoppingBag, BellRing, Sparkles } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onNavigateToCotizador: () => void;
  onOpenFlavorAlert: () => void;
  onReplayIntro?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  cartCount, 
  onNavigateToCotizador, 
  onOpenFlavorAlert,
  onReplayIntro
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: '✨ Nuevo Sabor (Taro)', href: '#nuevo-sabor' },
    { label: 'Sabores y Menú', href: '#sabores' },
    { label: 'Arma tu Pedido / Cotizador', href: '#cotizador' },
    { label: 'Paquetes Especiales', href: '#paquetes' },
    { label: 'Garantía y Calidad', href: '#calidad' },
    { label: 'Opiniones y Fotos', href: '#opiniones' },
    { label: 'Cobertura y Contacto', href: '#cobertura' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FFFDF7]/95 backdrop-blur-md border-b border-[#EADBCE] shadow-xs transition-all">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <div 
          onClick={() => {
            if (onReplayIntro) {
              onReplayIntro();
            } else {
              handleNavClick('#inicio');
            }
          }}
          className="flex items-center gap-3 group cursor-pointer"
          title="Ver intro / Ir al inicio"
        >
          <img
            src="/assets/aistudio/Image_3_5c12d091.jpeg"
            alt="Fru'its Natural Logo"
            className="w-12 h-12 rounded-full object-contain shadow-xs border border-[#f39200]/20 group-hover:scale-105 group-hover:rotate-6 transition-all duration-300"
          />
          <div className="flex flex-col">
            <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-[#311302] leading-tight">
              Fru'its Natural
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-[#5B8C2A] uppercase">
              AGUAS FRESCAS ARTESANALES
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center space-x-6 text-[14px] font-semibold text-[#544434]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="hover:text-[#F39200] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#F39200] hover:after:w-full after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA & Cart count */}
        <div className="flex items-center gap-3">
          {/* Botón Ver Intro */}
          {onReplayIntro && (
            <button
              type="button"
              onClick={onReplayIntro}
              className="btn-subtle-lift hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1A0901] hover:bg-[#311302] text-amber-300 hover:text-white border border-amber-500/40 font-bold text-xs shadow-xs transition-all cursor-pointer active:scale-95"
              title="Ver Intro Animado de Carga"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Ver Intro</span>
            </button>
          )}

          {cartCount > 0 && (
            <button
              onClick={onNavigateToCotizador}
              className="btn-subtle-lift relative p-2.5 rounded-full bg-[#FFF1EA] text-[#8A5100] hover:bg-[#FFE3D4] transition-all cursor-pointer"
              title="Ver Cotizador"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-[#D92525] text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            </button>
          )}

          {/* Botón Avisarme de nuevos sabores al lado de Pedido Rápido */}
          <button
            type="button"
            onClick={onOpenFlavorAlert}
            className="btn-subtle-lift btn-icon-hover hidden md:inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FFF1EA] hover:bg-[#FFE3D4] border border-[#FFE3D4] text-[#8A5100] hover:text-[#5C3400] font-bold text-xs shadow-xs transition-all active:scale-95 cursor-pointer"
            title="Recibe avisos de nuevos sabores en tu teléfono"
          >
            <BellRing className="w-4 h-4 text-[#F39200] animate-bounce shrink-0" />
            <div className="flex flex-col text-left leading-none">
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#F39200]">
                Avisos al Teléfono
              </span>
              <span className="text-xs font-black text-[#311302]">
                Avisarme de nuevos sabores
              </span>
            </div>
          </button>

          <a
            href="https://wa.me/523320414321?text=Hola%20Fru'its%20Natural,%20me%20gustar%C3%ADa%20hacer%20un%20pedido%20r%C3%A1pido"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary-glow btn-icon-hover hidden sm:inline-flex items-center gap-2.5 bg-[#F39200] hover:bg-[#E06800] text-[#311302] hover:text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-sm transition-all duration-200 active:scale-98"
          >
            <Phone className="w-4 h-4 fill-current text-white/90" />
            <div className="flex flex-col text-left leading-none">
              <span className="text-[10px] uppercase tracking-wider text-white/90 font-bold">Pedido Rápido</span>
              <span className="text-sm font-black text-white">33 2041 4321</span>
            </div>
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn-subtle-lift xl:hidden p-2 rounded-lg text-[#311302] hover:bg-[#FFF1EA] transition-colors cursor-pointer"
            aria-label="Abrir Menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-[#EADBCE] bg-[#FFFDF7] px-6 py-5 shadow-lg space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="block py-2 text-base font-bold text-[#311302] hover:text-[#F39200] border-b border-[#FFF1EA] last:border-none"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 space-y-2.5">
            {onReplayIntro && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onReplayIntro();
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#1A0901] text-amber-300 hover:text-white py-3 rounded-full font-black text-sm shadow-xs transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Ver Intro Animado (1 a 100)</span>
              </button>
            )}

            <a
              href="https://wa.me/523320414321?text=Hola%20Fru'its%20Natural,%20me%20gustar%C3%ADa%20hacer%20un%20pedido%20r%C3%A1pido"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#F39200] text-white py-3 rounded-full font-bold text-sm shadow-sm"
            >
              <Phone className="w-4 h-4 fill-white" />
              <span>Pedido Rápido: 33 2041 4321</span>
            </a>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenFlavorAlert();
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#FFF1EA] hover:bg-[#FFE3D4] border border-[#FFE3D4] text-[#8A5100] py-3 rounded-full font-black text-sm shadow-xs transition-all cursor-pointer"
            >
              <BellRing className="w-4 h-4 text-[#F39200] animate-bounce" />
              <span>Avisarme de nuevos sabores al teléfono</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
