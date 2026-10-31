import React from 'react';
import { MapPin, Clock, Phone, Mail, ShieldCheck, ExternalLink, Leaf } from 'lucide-react';

interface FooterProps {
  onReplayIntro?: () => void;
  onShowToast?: (msg: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onReplayIntro, onShowToast }) => {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#FFF1EA] border-t border-[#FFE3D4] text-[#311302] pt-14 pb-8">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#EADBCE]">
          {/* Column 1: Brand Info */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img
                src="/assets/aistudio/Image_3_5c12d091.jpeg"
                alt="Fru'its Natural Logo"
                className="w-10 h-10 rounded-full object-contain shadow-xs border border-[#F39200]/30"
              />
              <h3 className="text-xl font-black text-[#311302]">Fru'its Natural</h3>
            </div>
            <p className="text-xs sm:text-[13px] text-[#544434] leading-relaxed mb-4">
              Tradición artesanal y fruta 100% natural. Elaboradas día a día con recetas tradicionales de México para endulzar tus reuniones, eventos familiares y antojos diarios.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EDF5E5] text-[#3C6A05] text-xs font-bold border border-[#B8F081]">
              <Leaf className="w-3.5 h-3.5 text-[#5B8C2A]" />
              <span>Entrega Local Gratis en Cocula y alrededores</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-wider text-[#311302] mb-4">
              Navegación
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-semibold text-[#544434]">
              <li>
                <button
                  onClick={() => scrollTo('#inicio')}
                  className="hover:text-[#F39200] transition-colors cursor-pointer text-left"
                >
                  Inicio y Especialidades
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#sabores')}
                  className="hover:text-[#F39200] transition-colors cursor-pointer text-left"
                >
                  Catálogo de Sabores
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#cotizador')}
                  className="hover:text-[#F39200] transition-colors cursor-pointer text-left"
                >
                  Cotizador Personalizado
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#paquetes')}
                  className="hover:text-[#F39200] transition-colors cursor-pointer text-left"
                >
                  Paquetes y Eventos
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#calidad')}
                  className="hover:text-[#F39200] transition-colors cursor-pointer text-left"
                >
                  Proceso de Calidad
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#opiniones')}
                  className="hover:text-[#F39200] transition-colors cursor-pointer text-left"
                >
                  Opiniones y Fotos
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#cobertura')}
                  className="hover:text-[#F39200] transition-colors cursor-pointer text-left"
                >
                  Zona de Cobertura
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Location and Hours */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-wider text-[#311302] mb-4">
              Ubicación y Horario
            </h4>
            <div className="space-y-3.5 text-xs sm:text-sm text-[#544434]">
              <a
                href="https://www.google.com/maps/search/?api=1&query=CALLE+139+Nicol%C3%A1s+Bravo,+BARRIO+LA+ASCENSI%C3%93N,+Cocula,+Jalisco,+M%C3%A9xico"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 hover:text-[#8A5100] transition-colors"
                title="Abrir ubicación exacta en Google Maps"
              >
                <MapPin className="w-4 h-4 text-[#8A5100] mt-0.5 shrink-0" />
                <span>
                  <strong>Taller Artesanal:</strong> CALLE 139 Nicolás Bravo, BARRIO LA ASCENSIÓN, Cocula, Jal.
                </span>
              </a>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#5B8C2A] mt-0.5 shrink-0" />
                <span>
                  <strong>Lunes a Domingo:</strong> 8:00 AM – 6:00 PM
                </span>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=CALLE+139+Nicol%C3%A1s+Bravo,+BARRIO+LA+ASCENSI%C3%93N,+Cocula,+Jalisco,+M%C3%A9xico"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8A5100] hover:text-[#5C3400] underline mt-1"
              >
                <span>Ver en Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Column 4: Direct Contact */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-wider text-[#311302] mb-4">
              Contacto Directo
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-[#544434]">
              <a
                href="https://wa.me/523320414321"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#F39200] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#8A5100]" />
                <span>33 2041 4321 (Atención y Pedidos)</span>
              </a>
              <a
                href="tel:+523310270108"
                className="flex items-center gap-2 hover:text-[#8A5100] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#8A5100]" />
                <span>33 1027 0108 (Eventos Especiales)</span>
              </a>
              <a
                href="mailto:Fruitsnatural.22@gmail.com"
                className="flex items-center gap-2 hover:text-[#8A5100] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#8A5100]" />
                <span>Fruitsnatural.22@gmail.com</span>
              </a>

              <div className="pt-2">
                <div className="bg-[#FFFFFF] p-2.5 rounded-xl border border-[#EADBCE] text-[11px] leading-relaxed flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#5B8C2A] shrink-0 mt-0.5" />
                  <span>
                    <strong>Garantía de Frescura:</strong> Preparadas con fruta de temporada el mismo día de tu entrega en Cocula y alrededores.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#877362] gap-3">
          <p>© 2025 Fru'its Natural - Aguas Frescas. Tradición y Frescura en Cocula, Jalisco. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4 font-medium">
            <a href="#aviso" onClick={(e) => { e.preventDefault(); alert("Aviso de Privacidad: Fru'its Natural protege sus datos personales de entrega únicamente para la logística de pedidos en Cocula, Jalisco."); }} className="hover:underline">
              Aviso de Privacidad
            </a>
            <span>•</span>
            <a href="#terminos" onClick={(e) => { e.preventDefault(); alert("Términos de Servicio: Las aguas frescas son artesanales de consumo inmediato. Garantía incondicional de frescura en cada entrega."); }} className="hover:underline">
              Términos de Servicio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
