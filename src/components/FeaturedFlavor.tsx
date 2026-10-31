import React from 'react';
import { Sparkles, ShoppingCart, CheckCircle2 } from 'lucide-react';

interface FeaturedFlavorProps {
  onAddTaroQuick: () => void;
}

export const FeaturedFlavor: React.FC<FeaturedFlavorProps> = ({ onAddTaroQuick }) => {
  return (
    <section id="nuevo-sabor" className="py-12 bg-[#FFF8F5]">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
        <div className="bg-[#FFFFFF] border-2 border-[#FFE3D4] rounded-2xl p-6 sm:p-10 shadow-md hover:shadow-lg transition-shadow">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Image Column */}
            <div className="md:col-span-5 relative flex justify-center items-center">
              <div className="relative rounded-2xl overflow-hidden bg-[#FBF0EA] max-w-[280px] sm:max-w-[330px] shadow-lg border border-[#FFE3D4] group transition-transform duration-300 hover:scale-[1.02]">
                <img
                  src="/assets/aistudio/rrr_5b94939b.jpeg"
                  alt="Taro - Nuevo Sabor Fru'its Natural"
                  className="w-full h-auto object-contain block"
                />
              </div>
            </div>

            {/* Right Details Column */}
            <div className="md:col-span-7 flex flex-col items-start text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-100 to-amber-100 text-[#6B21A8] text-xs font-black mb-3 border border-purple-300 shadow-xs">
                <Sparkles className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
                <span>¡LANZAMIENTO EXCLUSIVO DE TEMPORADA!</span>
              </div>

              {/* Title & Subtitle */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#311302] tracking-tight mb-2">
                Nuevo Sabor Taro Cremoso
              </h2>
              <p className="text-base sm:text-lg font-bold text-[#7C3AED] mb-4">
                Frescura artesanal con textura suave, raíces selectas y notas sutiles de vainilla
              </p>

              {/* Paragraph */}
              <p className="text-sm sm:text-base text-[#544434] leading-relaxed mb-6">
                Nuestro más reciente lanzamiento preparado artesanalmente con raíces selectas de taro, leche deslactosada infusionada y el balance justo de dulzor para disfrutar bien helada. ¡El preferido de chicos y grandes!
              </p>

              {/* Presentaciones Box */}
              <div className="w-full bg-[#FFF1EA]/70 border border-[#EADBCE] rounded-xl p-4 mb-6">
                <span className="block text-[11px] font-extrabold uppercase tracking-widest text-[#8A5100] mb-2">
                  PRESENTACIONES
                </span>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4 text-sm sm:text-base">
                    <div>
                      <span className="font-extrabold text-[#311302]">1 Litro: </span>
                      <span className="font-bold text-[#8A5100]">$21 MXN</span>
                    </div>
                    <span className="text-gray-300">|</span>
                    <div>
                      <span className="font-extrabold text-[#311302]">1/2 Litro: </span>
                      <span className="font-bold text-[#8A5100]">$14 MXN</span>
                    </div>
                  </div>

                  <button
                    onClick={onAddTaroQuick}
                    className="btn-primary-glow btn-icon-hover inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#8A5100] hover:bg-[#5C3400] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-98 cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4 transition-transform" />
                    <span>+2 Taro (1L) al Cotizador</span>
                  </button>
                </div>
              </div>

              {/* Features List */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm font-semibold text-[#406E0B]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5B8C2A]" />
                  <span>100% Refrigerada</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5B8C2A]" />
                  <span>Sin Conservadores</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5B8C2A]" />
                  <span>Botella Sellada Higiénica</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
