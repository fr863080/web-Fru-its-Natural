import React from 'react';
import { ShoppingCart, Sparkles, Leaf, Snowflake, ShieldCheck, Truck, UtensilsCrossed, BellRing } from 'lucide-react';

interface HeroProps {
  onOrderClick: () => void;
  onExploreClick: () => void;
  onNoveltyClick?: () => void;
  onOpenFlavorAlert?: () => void;
  onReplayIntro?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onOrderClick, 
  onExploreClick, 
  onNoveltyClick = () => {
    const el = document.querySelector('#nuevo-sabor');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  },
  onOpenFlavorAlert,
  onReplayIntro,
}) => {
  return (
    <section id="inicio" className="relative min-h-[580px] lg:min-h-[640px] flex items-center justify-center overflow-hidden">
      {/* Background Graphic from Asset Image_1 */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/aistudio/Image_1_18df0b39.png"
          alt="Frutas naturales frescas de Cocula"
          className="w-full h-full object-cover object-center"
        />
        {/* Warm amber & cacao radial gradient overlay to ensure perfect readability of center text while keeping the edges vibrant */}
        <div className="absolute inset-0 bg-radial from-[#311302]/75 via-[#42210B]/60 to-[#2A0E00]/40 backdrop-blur-[1px]" />
      </div>

      <div className="relative z-10 max-w-[1040px] mx-auto px-4 sm:px-6 py-14 text-center flex flex-col items-center">
        {/* Brand Stamp Emblem at Top */}
        <div 
          onClick={onReplayIntro}
          className="mb-4 group cursor-pointer"
          title="Toca para ver el intro animado"
        >
          <img
            src="/assets/aistudio/Image_3_5c12d091.jpeg"
            alt="Sello Fru'its Natural"
            className="w-24 h-24 sm:w-28 sm:h-28 object-contain rounded-full shadow-2xl ring-4 ring-white/20 bg-white/95 animate-brinquitos hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Seasonal Novelty Banner right in Hero */}
        <div 
          onClick={onNoveltyClick}
          className="group inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#6B21A8]/95 via-[#8B5CF6]/90 to-[#D97706]/95 text-white border-2 border-purple-300/40 shadow-xl hover:shadow-purple-500/30 hover:scale-[1.02] active:scale-98 transition-all duration-300 cursor-pointer mb-5 backdrop-blur-md"
          title="Ver el nuevo sabor de temporada Taro Cremoso"
        >
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400"></span>
          </span>
          <span className="text-xs sm:text-sm font-black tracking-wide flex items-center gap-1.5 uppercase">
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
            <span>¡Novedad de Temporada!</span>
          </span>
          <span className="hidden sm:inline text-white/50">•</span>
          <span className="text-xs sm:text-sm font-bold text-purple-100 group-hover:text-white transition-colors">
            Descubre nuestro <strong className="text-white underline decoration-amber-400 decoration-2 underline-offset-2">Nuevo Sabor Taro Cremoso</strong>
          </span>
          <span className="text-xs font-black bg-amber-400 text-[#311302] px-2 py-0.5 rounded-full ml-1">
            ¡NUEVO! →
          </span>
        </div>

        {/* Free Shipping & Mayoreo Announcement Pill */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-[#3C6A05]/90 text-[#B8F081] border border-[#B8F081]/30 shadow-md mb-6 backdrop-blur-xs">
          <Truck className="w-4 h-4 text-[#B8F081]" />
          <span className="text-xs sm:text-sm font-bold tracking-wide text-white">
            ¡Envío local GRATIS en Cocula!
          </span>
          <span className="text-white/60 hidden sm:inline">•</span>
          <span className="text-xs sm:text-sm font-black text-amber-300">
            🏷️ Mayoreo a partir de 15 botellas
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black tracking-tight text-white leading-[1.15] mb-5 max-w-[900px] drop-shadow-md">
          100% Naturales, Frescas y Artesanales de Cocula, Jalisco
        </h1>

        {/* Quick Real Bottles Preview Strip with Taro Highlighted as Seasonal Novelty */}
        <div
          className="mb-8 p-3 sm:p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md transition-all max-w-[660px] w-full"
        >
          <div className="flex items-center justify-between gap-3 text-left mb-2">
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-[#B8F081] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>NUESTRAS AGUAS EN ENVASE REAL (1L Y 1/2L)</span>
            </span>
            <button
              onClick={onExploreClick}
              className="text-[11px] text-[#FFEDE5] underline hover:text-white font-bold cursor-pointer"
            >
              Ver catálogo completo →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5">
            {/* Jamaica */}
            <div 
              onClick={onExploreClick}
              className="bg-white/90 hover:bg-white rounded-xl p-2 flex flex-col items-center justify-center text-center shadow-md transition-all duration-200 cursor-pointer hover:scale-105"
            >
              <div className="h-20 sm:h-24 w-full flex items-center justify-center overflow-hidden">
                <img
                  src="/assets/aistudio/image_2bcd5423.jpg"
                  alt="Agua de Jamaica Tradicional"
                  className="h-full object-contain filter drop-shadow-md"
                />
              </div>
              <span className="text-xs font-black text-[#311302] mt-1 line-clamp-1">Jamaica</span>
              <span className="text-[10px] font-bold text-[#C81E32]">Flor Natural</span>
            </div>

            {/* Horchata */}
            <div 
              onClick={onExploreClick}
              className="bg-white/90 hover:bg-white rounded-xl p-2 flex flex-col items-center justify-center text-center shadow-md transition-all duration-200 cursor-pointer hover:scale-105"
            >
              <div className="h-20 sm:h-24 w-full flex items-center justify-center overflow-hidden">
                <img
                  src="/assets/aistudio/vblv8_b03a3379.jpg"
                  alt="Agua de Horchata Casera"
                  className="h-full object-contain filter drop-shadow-md"
                />
              </div>
              <span className="text-xs font-black text-[#311302] mt-1 line-clamp-1">Horchata</span>
              <span className="text-[10px] font-bold text-[#8A5100]">Canela & Arroz</span>
            </div>

            {/* Tamarindo */}
            <div 
              onClick={onExploreClick}
              className="bg-white/90 hover:bg-white rounded-xl p-2 flex flex-col items-center justify-center text-center shadow-md transition-all duration-200 cursor-pointer hover:scale-105"
            >
              <div className="h-20 sm:h-24 w-full flex items-center justify-center overflow-hidden">
                <img
                  src="/assets/aistudio/UDCbq_137cd3d7.jpg"
                  alt="Agua de Tamarindo"
                  className="h-full object-contain filter drop-shadow-md"
                />
              </div>
              <span className="text-xs font-black text-[#311302] mt-1 line-clamp-1">Tamarindo</span>
              <span className="text-[10px] font-bold text-[#8A5100]">Pulpa Real</span>
            </div>

            {/* Lima */}
            <div 
              onClick={onExploreClick}
              className="bg-white/90 hover:bg-white rounded-xl p-2 flex flex-col items-center justify-center text-center shadow-md transition-all duration-200 cursor-pointer hover:scale-105"
            >
              <div className="h-20 sm:h-24 w-full flex items-center justify-center overflow-hidden">
                <img
                  src="/assets/aistudio/fb5yI_39e3338b.jpg"
                  alt="Agua de Lima Real Fresca"
                  className="h-full object-contain filter drop-shadow-md"
                />
              </div>
              <span className="text-xs font-black text-[#311302] mt-1 line-clamp-1">Lima Real</span>
              <span className="text-[10px] font-bold text-[#5B8C2A]">Lima Fresca Cítrica</span>
            </div>

            {/* Guayaba */}
            <div 
              onClick={onExploreClick}
              className="bg-white/90 hover:bg-white rounded-xl p-2 flex flex-col items-center justify-center text-center shadow-md transition-all duration-200 cursor-pointer hover:scale-105"
            >
              <div className="h-20 sm:h-24 w-full flex items-center justify-center overflow-hidden">
                <img
                  src="/assets/aistudio/6iw5k_458bfcf3.jpg"
                  alt="Agua de Guayaba Natural"
                  className="h-full object-contain filter drop-shadow-md"
                />
              </div>
              <span className="text-xs font-black text-[#311302] mt-1 line-clamp-1">Guayaba</span>
              <span className="text-[10px] font-bold text-[#5B8C2A]">Pulpa Fresca</span>
            </div>

            {/* Taro - ESTRELLA NOVEDAD DE TEMPORADA */}
            <div 
              onClick={onNoveltyClick}
              className="relative bg-gradient-to-b from-purple-50 via-white to-purple-100 rounded-xl p-2 flex flex-col items-center justify-center text-center shadow-xl border-2 border-purple-400 ring-2 ring-purple-300/60 transform sm:-translate-y-1 sm:scale-105 hover:scale-110 transition-all duration-300 cursor-pointer group"
              title="¡Novedad de temporada! Clic para ver el Taro Cremoso"
            >
              {/* Pulsing Novelty Badge */}
              <div className="absolute -top-2.5 -right-2 bg-gradient-to-r from-purple-600 to-amber-500 text-white font-black text-[9px] px-2 py-0.5 rounded-full shadow-md flex items-center gap-0.5 animate-pulse uppercase tracking-tight">
                <Sparkles className="w-2.5 h-2.5" />
                <span>¡NOVEDAD!</span>
              </div>

              <div className="h-20 sm:h-24 w-full flex items-center justify-center overflow-hidden">
                <img
                  src="/assets/aistudio/oqJZE_dbb0f67d.jpg"
                  alt="Agua de Taro Especial - Nuevo Sabor de Temporada"
                  className="h-full object-contain filter drop-shadow-md group-hover:rotate-2 transition-transform duration-300"
                />
              </div>
              <span className="text-xs font-black text-[#6B21A8] mt-1 line-clamp-1 flex items-center gap-1">
                Taro Cremoso
              </span>
              <span className="text-[9px] font-black text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded-full mt-0.5">
                De Temporada
              </span>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto mb-10">
          <button
            onClick={onOrderClick}
            className="btn-primary-glow btn-icon-hover w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#F39200] hover:bg-[#E06800] text-white font-extrabold text-base shadow-lg hover:shadow-xl transform active:scale-98 transition-all duration-200 cursor-pointer"
          >
            <ShoppingCart className="w-5 h-5 transition-transform" />
            <span>Armar mi Pedido</span>
          </button>

          {onOpenFlavorAlert && (
            <button
              onClick={onOpenFlavorAlert}
              className="btn-subtle-lift btn-icon-hover w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/95 hover:bg-white text-[#311302] hover:text-[#8A5100] font-black text-base shadow-lg backdrop-blur-xs transition-all duration-200 active:scale-98 cursor-pointer border border-[#FFE3D4]"
              title="Recibe una notificación en tu teléfono cuando salga un nuevo sabor"
            >
              <BellRing className="w-5 h-5 text-[#F39200] animate-bounce" />
              <span>Avisarme de nuevos sabores</span>
            </button>
          )}

          <button
            onClick={onNoveltyClick}
            className="btn-primary-glow btn-icon-hover w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-extrabold text-base shadow-lg hover:shadow-purple-500/30 transform active:scale-98 transition-all duration-200 cursor-pointer border border-purple-300/40"
          >
            <Sparkles className="w-5 h-5 text-amber-300 transition-transform" />
            <span>Ver Nuevo Taro (Temporada)</span>
          </button>

          <button
            onClick={onExploreClick}
            className="btn-subtle-lift btn-icon-hover w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/90 hover:bg-white text-[#311302] hover:text-[#8A5100] font-bold text-base shadow-md backdrop-blur-xs transition-all duration-200 active:scale-98 cursor-pointer"
          >
            <UtensilsCrossed className="w-5 h-5 text-[#8A5100] transition-transform" />
            <span>Todos los Sabores</span>
          </button>
        </div>

        {/* Trust Badges Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 pt-4 border-t border-white/20 w-full max-w-[880px]">
          <div className="flex items-center justify-center gap-2 text-white/95 text-xs sm:text-sm font-semibold">
            <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-[#B8F081]" />
            <span>Fruta 100% Natural</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-white/95 text-xs sm:text-sm font-semibold">
            <Snowflake className="w-4 h-4 sm:w-5 sm:h-5 text-[#B8F081]" />
            <span>Cadena de Frío Estricta</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-white/95 text-xs sm:text-sm font-semibold">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#B8F081]" />
            <span>Garantía Inmediata</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-white/95 text-xs sm:text-sm font-semibold">
            <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-[#B8F081]" />
            <span>Entrega Rápida</span>
          </div>
        </div>
      </div>
    </section>
  );
};
