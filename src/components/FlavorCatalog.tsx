import React, { useState } from 'react';
import { Minus, Plus, Sparkles, Flower2, Flame, Droplet, Citrus, Heart, Eye, X, ZoomIn, Check } from 'lucide-react';
import { Flavor, BottleSize } from '../types';

interface FlavorCatalogProps {
  flavors: Flavor[];
  getItemQuantity: (flavorId: string, size: BottleSize) => number;
  onUpdateQuantity: (flavor: Flavor, size: BottleSize, delta: number) => void;
}

// Artisan bottle illustration component for flavors awaiting studio photos
const ArtisanBottleIllustration: React.FC<{ flavorId: string; name: string }> = ({ flavorId, name }) => {
  const getColors = () => {
    switch (flavorId) {
      case 'jamaica':
        return {
          liquidTop: '#C81E32',
          liquidBottom: '#7A0A16',
          cap: '#FFFFFF',
          accent: 'Flor de Jamaica 100% hervida',
        };
      case 'horchata':
        return {
          liquidTop: '#FFF8F0',
          liquidBottom: '#EBD5BE',
          cap: '#FFFFFF',
          accent: 'Arroz molido & Canela en vara',
        };
      case 'guayaba':
      default:
        return {
          liquidTop: '#F8988C',
          liquidBottom: '#D85444',
          cap: '#FFFFFF',
          accent: 'Pulpa de Guayaba dulce natural',
        };
    }
  };

  const c = getColors();

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-3 select-none">
      {/* Bottle Silhouette with realistic ridges like the Fru'its Natural bottles */}
      <svg
        viewBox="0 0 160 320"
        className="w-36 sm:w-40 h-52 sm:h-56 filter drop-shadow-xl transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          <linearGradient id={`grad-${flavorId}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={c.liquidTop} stopOpacity="0.95" />
            <stop offset="35%" stopColor={c.liquidBottom} stopOpacity="0.9" />
            <stop offset="70%" stopColor={c.liquidTop} stopOpacity="0.95" />
            <stop offset="100%" stopColor={c.liquidBottom} stopOpacity="0.98" />
          </linearGradient>
          <linearGradient id={`shine-${flavorId}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
            <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Bottle Cap */}
        <rect x="66" y="8" width="28" height="18" rx="3" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1.5" />
        <line x1="70" y1="12" x2="70" y2="22" stroke="#E5E7EB" strokeWidth="1" />
        <line x1="75" y1="12" x2="75" y2="22" stroke="#E5E7EB" strokeWidth="1" />
        <line x1="80" y1="12" x2="80" y2="22" stroke="#E5E7EB" strokeWidth="1" />
        <line x1="85" y1="12" x2="85" y2="22" stroke="#E5E7EB" strokeWidth="1" />
        <line x1="90" y1="12" x2="90" y2="22" stroke="#E5E7EB" strokeWidth="1" />

        {/* Bottle Neck */}
        <path d="M 69 26 L 69 46 Q 69 64 48 90 L 48 300 Q 48 312 60 312 L 100 312 Q 112 312 112 300 L 112 90 Q 91 64 91 46 L 91 26 Z" fill={`url(#grad-${flavorId})`} stroke="#FFFFFF" strokeWidth="1.5" />

        {/* Ribbed Plastic Ridges (Exact characteristic of Fru'its Natural bottles) */}
        <path d="M 47 160 Q 80 166 113 160" stroke="rgba(255,255,255,0.45)" strokeWidth="2" fill="none" />
        <path d="M 47 175 Q 80 181 113 175" stroke="rgba(255,255,255,0.45)" strokeWidth="2" fill="none" />
        <path d="M 47 190 Q 80 196 113 190" stroke="rgba(255,255,255,0.45)" strokeWidth="2" fill="none" />
        <path d="M 47 205 Q 80 211 113 205" stroke="rgba(255,255,255,0.45)" strokeWidth="2" fill="none" />
        <path d="M 47 220 Q 80 226 113 220" stroke="rgba(255,255,255,0.45)" strokeWidth="2" fill="none" />
        <path d="M 47 235 Q 80 241 113 235" stroke="rgba(255,255,255,0.45)" strokeWidth="2" fill="none" />

        {/* Cold condensation bubbles / froth at the neck */}
        <ellipse cx="80" cy="55" rx="10" ry="3" fill="#FFFFFF" fillOpacity="0.4" />
        <circle cx="74" cy="62" r="2" fill="#FFFFFF" fillOpacity="0.6" />
        <circle cx="86" cy="64" r="2.5" fill="#FFFFFF" fillOpacity="0.6" />
        <circle cx="80" cy="70" r="1.5" fill="#FFFFFF" fillOpacity="0.5" />

        {/* Fru'its Natural Label Band */}
        <rect x="46" y="98" width="68" height="50" rx="3" fill="#DEF3B8" stroke="#A6CE39" strokeWidth="1" />
        <circle cx="80" cy="123" r="18" fill="#FFF100" stroke="#F39200" strokeWidth="1.5" />
        <text x="80" y="121" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#311302">fru'its</text>
        <text x="80" y="128" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#311302">Natural</text>
        <text x="50" y="108" fontSize="4" fill="#311302" fontWeight="bold">100%</text>
        <text x="50" y="113" fontSize="4" fill="#311302">natural</text>
        <text x="109" y="108" textAnchor="end" fontSize="4" fill="#311302" fontWeight="bold">1L /</text>
        <text x="109" y="113" textAnchor="end" fontSize="4" fill="#311302">500ml</text>

        {/* Vertical glass light reflection stripe */}
        <path d="M 52 90 L 52 300 Q 52 308 60 308 L 64 308 L 64 90 Z" fill={`url(#shine-${flavorId})`} />
      </svg>
      <span className="mt-1 text-[11px] font-extrabold text-[#8A5100] bg-white/90 px-3 py-0.5 rounded-full shadow-xs border border-[#EADBCE]">
        {c.accent}
      </span>
    </div>
  );
};

export const FlavorCatalog: React.FC<FlavorCatalogProps> = ({
  flavors,
  getItemQuantity,
  onUpdateQuantity,
}) => {
  const [previewImage, setPreviewImage] = useState<{ url: string; title: string } | null>(null);

  const getBadgeIcon = (id: string) => {
    switch (id) {
      case 'jamaica':
        return <Flower2 className="w-3.5 h-3.5 text-[#D92525]" />;
      case 'horchata':
        return <Flame className="w-3.5 h-3.5 text-[#E06800]" />;
      case 'tamarindo':
        return <Droplet className="w-3.5 h-3.5 text-[#8A5100]" />;
      case 'limon':
        return <Citrus className="w-3.5 h-3.5 text-[#5B8C2A]" />;
      case 'guayaba':
        return <Heart className="w-3.5 h-3.5 text-[#D92525]" />;
      case 'taro':
      default:
        return <Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" />;
    }
  };

  const getBadgeStyles = (id: string) => {
    switch (id) {
      case 'jamaica':
      case 'guayaba':
        return 'bg-[#FFDAD6] text-[#820009] border-[#FF867A]/50';
      case 'horchata':
        return 'bg-[#FFF1EA] text-[#8A5100] border-[#FFB86E]/50';
      case 'tamarindo':
        return 'bg-[#FFEADF] text-[#5C3400] border-[#DAC2AE]';
      case 'limon':
        return 'bg-[#EDF5E5] text-[#3C6A05] border-[#B8F081]';
      case 'taro':
      default:
        return 'bg-[#F3E8FF] text-[#6B21A8] border-[#D8B4FE]';
    }
  };

  // Dedicated background showcase tint per flavor
  const getShowcaseBackground = (id: string) => {
    switch (id) {
      case 'tamarindo':
        return 'bg-gradient-to-b from-[#FFF5EC] via-[#F9ECE0] to-[#EFE0D1] border-b border-[#E7D0BC]';
      case 'limon':
        return 'bg-gradient-to-b from-[#F7FDE8] via-[#EDF9D9] to-[#DFEFBE] border-b border-[#CBE49D]';
      case 'taro':
        return 'bg-gradient-to-b from-[#FAF5FF] via-[#F3E8FF] to-[#E9D5FF] border-b border-[#D8B4FE]';
      case 'jamaica':
        return 'bg-gradient-to-b from-[#FFF0F2] via-[#FCE4E7] to-[#F8D2D7] border-b border-[#F5B8BF]';
      case 'horchata':
        return 'bg-gradient-to-b from-[#FFFBF7] via-[#FBF2E7] to-[#F5E6D4] border-b border-[#EED7BF]';
      case 'guayaba':
        return 'bg-gradient-to-b from-[#F6FDF0] via-[#EEF9E4] to-[#E1F3D2] border-b border-[#CDE8B5]';
      default:
        return 'bg-gradient-to-b from-[#FFF2F0] via-[#FDE6E3] to-[#FAD4CE] border-b border-[#F7BCB2]';
    }
  };

  const getCardBorder = (id: string) => {
    switch (id) {
      case 'jamaica':
        return 'border-2 border-[#C81E32]/60 shadow-md ring-2 ring-[#C81E32]/20 hover:ring-4 hover:ring-[#C81E32]/35';
      case 'horchata':
        return 'border-2 border-[#E06800]/60 shadow-md ring-2 ring-[#E06800]/20 hover:ring-4 hover:ring-[#E06800]/35';
      case 'tamarindo':
        return 'border-2 border-[#D29E74] shadow-md ring-2 ring-[#D29E74]/20 hover:ring-4 hover:ring-[#D29E74]/35';
      case 'limon':
        return 'border-2 border-[#82C341] shadow-md ring-2 ring-[#82C341]/25 hover:ring-4 hover:ring-[#82C341]/40';
      case 'guayaba':
        return 'border-2 border-[#5B8C2A]/60 shadow-md ring-2 ring-[#5B8C2A]/20 hover:ring-4 hover:ring-[#5B8C2A]/35';
      case 'taro':
        return 'border-2 border-[#B388D9] shadow-md ring-2 ring-[#B388D9]/20 hover:ring-4 hover:ring-[#B388D9]/35';
      default:
        return 'border border-[#EADBCE] hover:border-[#8A5100]/50 shadow-xs hover:shadow-md';
    }
  };

  return (
    <section id="sabores" className="py-16 bg-[#FFF8F5]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-[800px] mx-auto mb-10">
          <span className="block text-xs font-black uppercase tracking-widest text-[#5B8C2A] mb-2">
            ENVASES REALES 100% ARTESANALES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#311302] tracking-tight mb-4">
            Catálogo de Sabores y Aguas Frescas
          </h2>
          <p className="text-sm sm:text-base text-[#544434] leading-relaxed mb-6">
            Observa con total claridad nuestras botellas selladas con agua de fruta natural recién preparada. Elige tus sabores favoritos por litro o medio litro y agrégalos a tu orden.
          </p>

          {/* Price Badges & Mayoreo Notice */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 bg-[#FFFFFF] px-6 py-2.5 rounded-2xl sm:rounded-full border border-[#EADBCE] shadow-xs">
            <span className="text-xs sm:text-sm font-extrabold text-[#311302]">
              Botella de 1 Litro: <span className="text-[#8A5100] font-black">$21 MXN</span>
            </span>
            <span className="text-gray-300 hidden sm:inline">•</span>
            <span className="text-xs sm:text-sm font-extrabold text-[#311302]">
              Botella de 1/2 Litro: <span className="text-[#8A5100] font-black">$14 MXN</span>
            </span>
            <span className="text-gray-300 hidden sm:inline">•</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDF5E5] text-[#3C6A05] text-xs font-black border border-[#B8F081]">
              <span>🏷️ Mayoreo a partir de 15 botellas</span>
            </span>
          </div>
        </div>

        {/* Flavors Grid (3 columns x 2 rows) - Prominent Bottle Visibility */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {flavors.map((flavor) => {
            const qty1L = getItemQuantity(flavor.id, '1L');
            const qty500ml = getItemQuantity(flavor.id, '500ml');
            const hasCustomImage = !!flavor.image;

            return (
              <div
                key={flavor.id}
                className={`bg-white rounded-3xl transition-all duration-300 flex flex-col justify-between group overflow-hidden ${getCardBorder(
                  flavor.id
                )} hover:-translate-y-1`}
              >
                {/* TOP HERO SHOWCASE: THE WATER BOTTLE IS PROMINENT, CLEAR, VISIBLE */}
                <div
                  className={`relative h-64 sm:h-72 w-full flex items-center justify-center overflow-hidden cursor-pointer ${getShowcaseBackground(
                    flavor.id
                  )}`}
                  onClick={() => {
                    if (flavor.image) {
                      setPreviewImage({
                        url: flavor.image,
                        title: `${flavor.name} - Envase Real`,
                      });
                    }
                  }}
                  title={flavor.image ? 'Clic para ver el envase en tamaño completo' : flavor.name}
                >
                  {/* Floating Top Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-xs ${getBadgeStyles(
                        flavor.id
                      )}`}
                    >
                      {getBadgeIcon(flavor.id)}
                      <span>{flavor.badge}</span>
                    </span>
                  </div>

                  {/* Photo Real Button or Quick Lightbox Hint */}
                  <div className="absolute top-3 right-3 z-10">
                    {hasCustomImage ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewImage({
                            url: flavor.image!,
                            title: `${flavor.name} - Envase Real`,
                          });
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-white/95 hover:bg-white text-[#311302] border border-[#EADBCE] shadow-md transition-all active:scale-95 cursor-pointer hover:shadow-lg"
                      >
                        <ZoomIn className="w-3.5 h-3.5 text-[#F39200]" />
                        <span>Foto Real</span>
                      </button>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/90 text-[#311302] border border-[#EADBCE] shadow-xs">
                        <Sparkles className="w-3 h-3 text-[#5B8C2A]" />
                        <span>100% Fresca</span>
                      </span>
                    )}
                  </div>

                  {/* BOTTLE DISPLAY: Prominently Visible */}
                  {hasCustomImage ? (
                    <div className="relative w-full h-full flex items-center justify-center p-3">
                      <img
                        src={flavor.image}
                        alt={`Botella de Agua Fresca de ${flavor.name}`}
                        className="max-h-full max-w-full object-contain filter drop-shadow-2xl transition-transform duration-300 group-hover:scale-108 group-hover:rotate-1"
                      />
                      {/* Subtle hover prompt pill at bottom of image */}
                      <div className="absolute bottom-2.5 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/75 text-white text-[11px] font-bold px-3 py-0.5 rounded-full backdrop-blur-xs flex items-center gap-1 pointer-events-none shadow-md">
                        <Eye className="w-3 h-3" />
                        <span>Clic para ampliar</span>
                      </div>
                    </div>
                  ) : (
                    <ArtisanBottleIllustration flavorId={flavor.id} name={flavor.name} />
                  )}

                  {/* Bottom indicator of fresh temperature */}
                  <div className="absolute bottom-2.5 right-3 z-10 hidden sm:block">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#311302]/70 bg-white/70 backdrop-blur-xs px-2 py-0.5 rounded-md">
                      Bien Helada
                    </span>
                  </div>
                </div>

                {/* BOTTOM CONTENT: FLAVOR INFO & ORDER CONTROLS */}
                <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 bg-white">
                  <div>
                    {/* Flavor Name */}
                    <h3 className="text-xl sm:text-2xl font-black text-[#311302] mb-2 group-hover:text-[#8A5100] transition-colors">
                      {flavor.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-[13px] leading-relaxed mb-5 text-[#544434] font-medium min-h-[48px]">
                      {flavor.description}
                    </p>
                  </div>

                  {/* Size Selectors & Steppers */}
                  <div className="space-y-3 pt-3 border-t border-[#FFF1EA]">
                    {/* 1 Litro */}
                    <div className="flex items-center justify-between bg-[#FFFDF7] p-2.5 rounded-xl border border-[#FFF1EA] shadow-xs">
                      <div>
                        <span className="block text-xs font-black text-[#311302]">1 Litro</span>
                        <span className="text-xs font-bold text-[#8A5100]">$21 MXN</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(flavor, '1L', -1)}
                          disabled={qty1L === 0}
                          aria-label={`Reducir 1L de ${flavor.name}`}
                          className="btn-stepper w-8 h-8 rounded-full flex items-center justify-center bg-[#FFF1EA] text-[#8A5100] hover:bg-[#FFE3D4] disabled:opacity-30 disabled:cursor-not-allowed transition-all font-bold cursor-pointer"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-6 text-center text-sm font-black text-[#311302]">
                          {qty1L}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(flavor, '1L', 1)}
                          aria-label={`Añadir 1L de ${flavor.name}`}
                          className="btn-stepper w-8 h-8 rounded-full flex items-center justify-center bg-[#F39200] hover:bg-[#E06800] text-white transition-all font-bold shadow-xs cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* 1/2 Litro */}
                    <div className="flex items-center justify-between bg-[#FFFDF7] p-2.5 rounded-xl border border-[#FFF1EA] shadow-xs">
                      <div>
                        <span className="block text-xs font-black text-[#311302]">1/2 Litro</span>
                        <span className="text-xs font-bold text-[#8A5100]">$14 MXN</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(flavor, '500ml', -1)}
                          disabled={qty500ml === 0}
                          aria-label={`Reducir 1/2L de ${flavor.name}`}
                          className="btn-stepper w-8 h-8 rounded-full flex items-center justify-center bg-[#FFF1EA] text-[#8A5100] hover:bg-[#FFE3D4] disabled:opacity-30 disabled:cursor-not-allowed transition-all font-bold cursor-pointer"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-6 text-center text-sm font-black text-[#311302]">
                          {qty500ml}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(flavor, '500ml', 1)}
                          aria-label={`Añadir 1/2L de ${flavor.name}`}
                          className="btn-stepper w-8 h-8 rounded-full flex items-center justify-center bg-[#5B8C2A] hover:bg-[#3C6A05] text-white transition-all font-bold shadow-xs cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal for Photo Preview */}
      {previewImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative bg-white rounded-3xl max-w-lg w-full p-5 sm:p-7 shadow-2xl border border-white/20 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewImage(null)}
              aria-label="Cerrar vista previa"
              className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full text-center mb-3">
              <span className="text-[11px] font-black uppercase tracking-widest text-[#8A5100]">
                ENVASE 100% ARTESANAL REAL
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#311302]">{previewImage.title}</h3>
            </div>

            <div className="relative rounded-2xl overflow-hidden bg-[#FAF6F0] w-full max-h-[68vh] flex items-center justify-center p-3 shadow-inner border border-[#EADBCE]">
              <img
                src={previewImage.url}
                alt={previewImage.title}
                className="max-h-[62vh] w-auto object-contain rounded-xl drop-shadow-xl"
              />
            </div>

            <div className="w-full mt-4 p-3 bg-[#FFF1EA] rounded-xl border border-[#FFDFC9] flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#8A5100] text-white flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <p className="text-xs text-[#544434] font-medium leading-relaxed">
                Elaborada con fruta fresca seleccionada y envasada el mismo día en Cocula, Jalisco. Entrega directa en hieleras térmicas para conservar el frío extremo.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
