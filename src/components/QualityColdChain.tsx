import React from 'react';
import { Snowflake, Truck, ShieldCheck, Award } from 'lucide-react';

export const QualityColdChain: React.FC = () => {
  return (
    <section id="calidad" className="py-16 bg-[#FFF8F5]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Cold Chain Protocol */}
          <div className="lg:col-span-7">
            <span className="block text-xs font-black uppercase tracking-widest text-[#5B8C2A] mb-2">
              COMPROMISO INQUEBRANTABLE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#311302] tracking-tight mb-4">
              Cuidado y Cadena de Frío Estricta
            </h2>
            <p className="text-sm sm:text-base text-[#544434] leading-relaxed mb-8">
              Las aguas de <strong className="text-[#311302]">Fru'its Natural</strong> no contienen conservadores químicos artificiales. Por eso, cada fase de nuestra elaboración y logística sigue un protocolo riguroso de temperatura:
            </p>

            <div className="space-y-6">
              {/* Point 1 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#EDF5E5] text-[#3C6A05] flex items-center justify-center shrink-0 shadow-xs border border-[#B8F081]/60">
                  <Snowflake className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-black text-[#311302] mb-1">
                    Congeladores de Temperatura Óptima
                  </h3>
                  <p className="text-xs sm:text-sm text-[#544434] leading-relaxed">
                    Inmediatamente después de envasarse, las botellas pasan a congelación controlada para sellar el sabor y vitaminas de la fruta fresca.
                  </p>
                </div>
              </div>

              {/* Point 2 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF1EA] text-[#8A5100] flex items-center justify-center shrink-0 shadow-xs border border-[#FFB86E]/60">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-black text-[#311302] mb-1">
                    Traslado en Hieleras Especiales
                  </h3>
                  <p className="text-xs sm:text-sm text-[#544434] leading-relaxed">
                    Toda entrega en Cocula y alrededores viaja en hieleras herméticas aisladas para garantizar que recibas tus aguas a la temperatura justa: heladas y refrescantes.
                  </p>
                </div>
              </div>

              {/* Point 3 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FFDAD6] text-[#820009] flex items-center justify-center shrink-0 shadow-xs border border-[#FF867A]/60">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-black text-[#311302] mb-1">
                    Garantía Incondicional Fru'its Natural
                  </h3>
                  <p className="text-xs sm:text-sm text-[#544434] leading-relaxed">
                    Cualquier botella que no cumpla con nuestro estricto norma de frescura o presente desperfecto se cambia inmediatamente <strong className="text-[#820009]">SIN NINGÚN COSTO</strong> adicional.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Artisan Certificate Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#4A2811] text-white rounded-3xl p-8 sm:p-10 shadow-xl border-2 border-[#8A5100]/40 relative overflow-hidden">
              {/* Subtle decorative glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#F39200]/10 rounded-full blur-2xl pointer-events-none" />

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FFDCBD] text-xs font-bold mb-6 border border-white/20">
                <Award className="w-3.5 h-3.5 text-[#F39200]" />
                <span>CERTIFICACIÓN ARTESANAL</span>
              </div>

              {/* Headline */}
              <h3 className="text-2xl sm:text-3xl font-black leading-tight tracking-tight mb-4 text-[#FFF8F5]">
                Sabor Puro. Saludable. Tradición Viva en cada Botella.
              </h3>

              {/* Quote */}
              <blockquote className="text-xs sm:text-sm text-[#FFEDE5] leading-relaxed italic mb-8 border-l-2 border-[#F39200] pl-4">
                "En Cocula la tradición culinaria se respeta. Elaboramos cada sabor como si fuera para nuestra propia familia: fruta lavada y desinfectada, recetas de herencia y servicio rápido."
              </blockquote>

              {/* Author and Address */}
              <div className="flex items-center gap-3.5 pt-6 border-t border-white/15">
                <div className="w-12 h-12 rounded-full bg-[#F39200] text-[#311302] font-black text-sm flex items-center justify-center shrink-0 shadow-md">
                  FN
                </div>
                <div>
                  <span className="block font-black text-sm text-white">
                    Familia Fru'its Natural
                  </span>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=CALLE+139+Nicol%C3%A1s+Bravo,+BARRIO+LA+ASCENSI%C3%93N,+Cocula,+Jalisco,+M%C3%A9xico"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#DAC2AE] hover:text-white transition-colors underline decoration-[#F39200]/60 flex items-center gap-1"
                    title="Ver en Google Maps"
                  >
                    <span>CALLE 139 Nicolás Bravo, BARRIO LA ASCENSIÓN, Cocula, Jal.</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
