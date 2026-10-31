import React from 'react';
import { Zap, Check, Star } from 'lucide-react';
import { SPECIAL_PACKAGES } from '../data/packages';
import { SpecialPackage } from '../types';

interface PackagesSectionProps {
  onLoadPackage: (pkg: SpecialPackage) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({ onLoadPackage }) => {
  return (
    <section id="paquetes" className="py-16 bg-[#FFF1EA]/60 border-y border-[#FFE3D4]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-[800px] mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#8A5100] text-white text-xs font-black uppercase tracking-widest mb-3 shadow-xs">
            <span>🏷️ MAYOREO A PARTIR DE 15 BOTELLAS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-[#311302] tracking-tight mb-4">
            Paquetes Especiales de Mayoreo
          </h2>
          <p className="text-sm sm:text-base text-[#544434] leading-relaxed">
            Aprovecha nuestros <strong className="text-[#311302]">precios de mayoreo a partir de 15 botellas</strong>. Elige un paquete prediseñado para cargar rápidamente a tu orden con un solo clic o ajusta los sabores a tu gusto.
          </p>
        </div>

        {/* 3 Packages Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {SPECIAL_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative bg-[#FFFFFF] rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ease-out will-change-transform cursor-pointer transform hover:-translate-y-3.5 hover:scale-[1.03] active:-translate-y-2 active:scale-[1.02] hover:z-20 ${
                pkg.isRecommended
                  ? 'border-2 border-[#F39200] shadow-xl md:-translate-y-2 ring-4 ring-[#F39200]/15 hover:ring-8 hover:ring-[#F39200]/25 hover:shadow-2xl hover:md:-translate-y-5'
                  : 'border border-[#EADBCE] shadow-sm hover:border-[#F39200]/60 hover:shadow-2xl ring-0 hover:ring-6 hover:ring-[#F39200]/10'
              }`}
            >
              {/* Recommended Badge on Top of the 50-Bottle card */}
              {pkg.isRecommended && (
                <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-[#8A5100] text-white px-4 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                  <Star className="w-3.5 h-3.5 fill-current text-[#F39200]" />
                  <span>★ EL MÁS PREFERIDO / RECOMENDADO</span>
                </div>
              )}

              <div>
                {/* Category Tag */}
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#FFF1EA] text-[#8A5100]">
                    {pkg.categoryBadge}
                  </span>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-black bg-[#EDF5E5] text-[#3C6A05] border border-[#B8F081]">
                    Mayoreo (15+ pzas)
                  </span>
                </div>

                {/* Package Name */}
                <h3 className="text-2xl font-black text-[#311302] mb-3">
                  {pkg.name}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#544434] leading-relaxed mb-6">
                  {pkg.description}
                </p>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#311302]">
                      <span className="mt-0.5 w-4 h-4 rounded-full bg-[#EDF5E5] text-[#5B8C2A] flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price & Action Button */}
              <div className="pt-6 border-t border-[#FFF1EA]">
                <div className="mb-4">
                  <span className="text-xs font-bold text-[#8A5100] block">Precio con Descuento Mayoreo</span>
                  <span className="text-2xl sm:text-3xl font-black text-[#311302]">
                    ${pkg.startingPrice.toLocaleString()} MXN
                  </span>
                </div>

                <button
                  onClick={() => onLoadPackage(pkg)}
                  className={`w-full py-3.5 px-4 rounded-full font-extrabold text-sm flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer btn-icon-hover ${
                    pkg.isRecommended
                      ? 'btn-primary-glow bg-[#F39200] hover:bg-[#E06800] text-white shadow-md hover:shadow-lg'
                      : 'btn-subtle-lift bg-[#FFF1EA] hover:bg-[#FFE3D4] text-[#8A5100]'
                  }`}
                >
                  <Zap className="w-4 h-4 fill-current transition-transform" />
                  <span>{pkg.buttonLabel}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
