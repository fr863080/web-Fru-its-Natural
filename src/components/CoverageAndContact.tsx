import React, { useState } from 'react';
import { Phone, Clock, Mail, MapPin, ExternalLink, CheckCircle, Navigation } from 'lucide-react';

export const CoverageAndContact: React.FC = () => {
  const [mapMode, setMapMode] = useState<'embed' | 'illustrated'>('embed');

  // Exact Google Maps location for CALLE 139 Nicolás Bravo, BARRIO LA ASCENSIÓN, Cocula, Jalisco, México
  const exactStreetUrl =
    'https://www.google.com/maps/search/?api=1&query=CALLE+139+Nicol%C3%A1s+Bravo,+BARRIO+LA+ASCENSI%C3%93N,+Cocula,+Jalisco,+M%C3%A9xico';

  const exactDirectionsUrl =
    'https://www.google.com/maps/dir/?api=1&destination=CALLE+139+Nicol%C3%A1s+Bravo,+BARRIO+LA+ASCENSI%C3%93N,+Cocula,+Jalisco';

  const handleOpenExactStreet = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    window.open(exactStreetUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="cobertura" className="py-16 bg-[#FFFDF7] border-t border-[#FFE3D4]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-[800px] mx-auto mb-12">
          <span className="block text-xs font-black uppercase tracking-widest text-[#8A5100] mb-2">
            PRESENCIA LOCAL
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#311302] tracking-tight mb-4">
            Zona de Cobertura y Taller Artesanal
          </h2>
          <p className="text-sm sm:text-base text-[#544434] leading-relaxed">
            Visítanos directamente o solicita tu entrega a domicilio en Cocula y comunidades aledañas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Visual Map Card */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="bg-[#FFFFFF] border-2 border-[#EADBCE] rounded-3xl p-4 sm:p-6 shadow-sm overflow-hidden">
              {/* Map View Mode Selector */}
              <div className="flex items-center justify-between pb-3 mb-2 flex-wrap gap-2">
                <button
                  onClick={handleOpenExactStreet}
                  className="text-xs font-black uppercase tracking-wider text-[#311302] hover:text-[#8A5100] flex items-center gap-1.5 cursor-pointer text-left group"
                  title="Clic para abrir Calle 139 Nicolás Bravo en Google Maps"
                >
                  <MapPin className="w-4 h-4 text-[#F39200] group-hover:scale-110 transition-transform" />
                  <span className="underline decoration-[#F39200]/60 decoration-2">
                    CALLE 139 Nicolás Bravo, BARRIO LA ASCENSIÓN
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#8A5100]" />
                </button>

                <div className="flex items-center gap-1 bg-[#FFF1EA] p-1 rounded-xl text-xs font-bold">
                  <button
                    onClick={() => setMapMode('embed')}
                    className={`btn-subtle-lift px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      mapMode === 'embed'
                        ? 'bg-[#8A5100] text-white shadow-xs'
                        : 'text-[#8A5100] hover:text-[#311302]'
                    }`}
                  >
                    Google Maps Real (Calle 139)
                  </button>
                  <button
                    onClick={() => setMapMode('illustrated')}
                    className={`btn-subtle-lift px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      mapMode === 'illustrated'
                        ? 'bg-[#8A5100] text-white shadow-xs'
                        : 'text-[#8A5100] hover:text-[#311302]'
                    }`}
                  >
                    Croquis de Cobertura
                  </button>
                </div>
              </div>

              {/* Map Canvas / Embed */}
              <div className="relative w-full h-[370px] sm:h-[430px] rounded-2xl overflow-hidden bg-[#EDF7F2] border border-[#D5EADF]">
                {mapMode === 'embed' ? (
                  <iframe
                    title="Google Maps CALLE 139 Nicolás Bravo, Barrio La Ascensión, Cocula, Jalisco"
                    src="https://maps.google.com/maps?q=CALLE+139+Nicol%C3%A1s+Bravo,+BARRIO+LA+ASCENSI%C3%93N,+Cocula,+Jalisco&t=&z=17&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0"
                    loading="lazy"
                    allowFullScreen
                  />
                ) : (
                  /* Visual SVG Map Representation of Cocula & Regional Roads */
                  <svg
                    className="w-full h-full object-cover cursor-pointer"
                    viewBox="0 0 600 400"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={handleOpenExactStreet}
                  >
                    {/* Terrain & Nature Areas */}
                    <rect width="600" height="400" fill="#E8F4EC" />
                    <path
                      d="M 50 300 Q 150 250 250 290 T 450 320 T 600 270 L 600 400 L 0 400 Z"
                      fill="#D9EEDB"
                    />
                    <path
                      d="M 0 50 Q 180 80 300 30 T 600 70 L 600 0 L 0 0 Z"
                      fill="#E2EFE5"
                    />

                    {/* Water bodies (Presa Casa Blanca & Rivers) */}
                    <path
                      d="M 120 340 C 140 330 170 350 190 340 C 210 330 220 360 180 370 C 140 380 110 360 120 340 Z"
                      fill="#C5E4E8"
                    />
                    <path
                      d="M 400 30 Q 380 120 360 200 T 320 320"
                      stroke="#B8E1E6"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray="4 2"
                    />

                    {/* Road Network */}
                    <path
                      d="M 20 280 L 140 240 L 250 260 L 380 270 L 580 250"
                      stroke="#D9BA9B"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 20 280 L 140 240 L 250 260 L 380 270 L 580 250"
                      stroke="#FFFFFF"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />

                    <path
                      d="M 140 240 L 180 150 L 300 130 L 420 100"
                      stroke="#E3CFBD"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 250 260 L 260 200 L 320 180 L 410 180"
                      stroke="#E3CFBD"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 250 260 L 240 350 L 160 370"
                      stroke="#E3CFBD"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 380 270 L 460 320 L 520 330"
                      stroke="#E3CFBD"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />

                    {/* Street highlight for Calle Nicolás Bravo */}
                    <path
                      d="M 265 245 L 300 270"
                      stroke="#D92525"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />

                    {/* Location Points & Labels */}
                    <circle cx="140" cy="240" r="5" fill="#8A5100" />
                    <text x="140" y="230" textAnchor="middle" fill="#544434" fontSize="10" fontWeight="bold">
                      El Crucero de Santa María
                    </text>

                    <text x="60" y="240" textAnchor="middle" fill="#877362" fontSize="9">
                      San Isidro Palo Verde
                    </text>

                    <circle cx="410" cy="90" r="4" fill="#5B8C2A" />
                    <text x="410" y="80" textAnchor="middle" fill="#544434" fontSize="10" fontWeight="bold">
                      La Cofradía de la Luz
                    </text>

                    <rect x="270" y="210" width="130" height="22" rx="4" fill="#C7F0F5" stroke="#71C5D4" />
                    <text x="335" y="225" textAnchor="middle" fill="#00667A" fontSize="9" fontWeight="bold">
                      🛒 Mi Bodega Aurrera 1648
                    </text>

                    <circle cx="480" cy="240" r="4" fill="#877362" />
                    <text x="480" y="235" textAnchor="middle" fill="#544434" fontSize="9" fontWeight="bold">
                      Juan Gil Preciado
                    </text>

                    <text x="500" y="270" textAnchor="middle" fill="#877362" fontSize="9">
                      Estipac
                    </text>

                    <text x="450" y="360" textAnchor="middle" fill="#877362" fontSize="9">
                      Buenavista
                    </text>

                    <text x="170" y="375" textAnchor="middle" fill="#3A8A96" fontSize="8" fontWeight="bold">
                      Cascada Presa Casa Blanca
                    </text>

                    <text x="90" y="330" textAnchor="middle" fill="#877362" fontSize="9">
                      Camajapa
                    </text>

                    {/* Exact Location Pin for CALLE 139 Nicolás Bravo, Barrio La Ascensión */}
                    <circle cx="285" cy="255" r="9" fill="#D92525" stroke="#FFFFFF" strokeWidth="2.5" />
                    <circle cx="285" cy="255" r="3" fill="#FFFFFF" />
                    <text x="285" y="278" textAnchor="middle" fill="#311302" fontSize="11" fontWeight="900">
                      CALLE 139 Nicolás Bravo
                    </text>
                    <text x="285" y="291" textAnchor="middle" fill="#8A5100" fontSize="9" fontWeight="bold">
                      BARRIO LA ASCENSIÓN
                    </text>

                    <circle cx="285" cy="255" r="18" stroke="#D92525" strokeWidth="2" opacity="0.6" />
                  </svg>
                )}

                {/* Overlay Card at Bottom - Clickable to open in Google Maps precisely */}
                <div
                  onClick={handleOpenExactStreet}
                  className="absolute bottom-3 left-3 right-3 bg-white/98 backdrop-blur-md p-3 sm:p-4 rounded-2xl shadow-xl border-2 border-[#F39200] flex flex-col sm:flex-row sm:items-center justify-between gap-3 z-10 cursor-pointer"
                >
                  <div className="group block text-left hover:opacity-95 transition-all flex-1">
                    <a
                      href={exactStreetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleOpenExactStreet}
                      className="block"
                      title="Haz clic para abrir CALLE 139 Nicolás Bravo, BARRIO LA ASCENSIÓN en Google Maps"
                    >
                      <span className="block text-[10px] font-black uppercase tracking-wider text-[#5B8C2A] group-hover:text-[#3C6A05] transition-colors flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#5B8C2A] animate-ping" />
                        <span>PUNTO DE ELABORACIÓN Y RECOLECCIÓN</span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#5B8C2A]" />
                      </span>
                      <h4 className="font-black text-sm sm:text-base text-[#311302] group-hover:text-[#8A5100] transition-colors underline decoration-[#F39200] decoration-2 underline-offset-4">
                        CALLE 139 Nicolás Bravo, BARRIO LA ASCENSIÓN
                      </h4>
                      <p className="text-xs sm:text-sm text-[#544434] group-hover:text-[#311302] transition-colors font-bold mt-0.5">
                        Cocula, Jalisco
                      </p>
                    </a>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={exactDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="btn-subtle-lift inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#FFF1EA] hover:bg-[#FFE3D4] text-[#8A5100] font-bold text-xs shadow-xs transition-all active:scale-98"
                      title="Trazar ruta GPS para llegar a CALLE 139 Nicolás Bravo"
                    >
                      <Navigation className="w-3.5 h-3.5 text-[#F39200]" />
                      <span>Cómo llegar</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleOpenExactStreet}
                      className="btn-primary-glow btn-icon-hover inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#8A5100] hover:bg-[#5C3400] text-white font-extrabold text-xs shadow-md transition-all active:scale-98 cursor-pointer"
                      title="Abrir la calle en Google Maps"
                    >
                      <MapPin className="w-4 h-4 text-[#FFB86E] transition-transform" />
                      <span>Abrir en Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5 text-white/70" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Coverage Tags List */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-4 text-xs font-bold text-[#544434]">
                <a
                  href={exactStreetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-[#8A5100] transition-colors"
                >
                  <CheckCircle className="w-4 h-4 text-[#5B8C2A]" />
                  <span>Cocula Centro y Barrios</span>
                </a>
                <a
                  href={exactStreetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-[#8A5100] transition-colors font-extrabold text-[#8A5100]"
                >
                  <CheckCircle className="w-4 h-4 text-[#5B8C2A]" />
                  <span>BARRIO LA ASCENSIÓN (CALLE 139 Nicolás Bravo)</span>
                </a>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#5B8C2A]" />
                  <span>San Martín Hidalgo (previo acuerdo)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Phone & WhatsApp Card */}
            <div className="bg-[#FFFFFF] border border-[#EADBCE] rounded-2xl p-5 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF1EA] text-[#F39200] flex items-center justify-center shrink-0 border border-[#FFB86E]/40">
                <Phone className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-black text-[#311302] mb-1">
                  Atención Telefónica y WhatsApp
                </h4>
                <p className="text-xs text-[#877362] mb-3">
                  Para cotizaciones de eventos, dudas o pedidos al mayoreo (a partir de 15 botellas):
                </p>
                <div className="space-y-1.5">
                  <a
                    href="https://wa.me/523320414321?text=Hola%20Fru'its%20Natural,%20me%20gustar%C3%ADa%20hacer%20un%20pedido%20al%20mayoreo%20(a%20partir%20de%2015%20botellas)%20o%20cotizaci%C3%B3n"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-base font-black text-[#8A5100] hover:text-[#F39200] transition-colors"
                  >
                    <span>📞 33 2041 4321</span>
                    <span className="text-[10px] bg-[#EDF5E5] text-[#3C6A05] px-2 py-0.5 rounded-full font-bold">
                      WhatsApp Activo
                    </span>
                  </a>
                  <a
                    href="tel:+523310270108"
                    className="block text-xs font-bold text-[#544434] hover:text-[#8A5100] transition-colors"
                  >
                    📱 33 1027 0108 (Eventos Especiales)
                  </a>
                </div>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="bg-[#FFFFFF] border border-[#EADBCE] rounded-2xl p-5 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EDF5E5] text-[#5B8C2A] flex items-center justify-center shrink-0 border border-[#B8F081]/60">
                <Clock className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-black text-[#311302] mb-1">
                  Horario de Servicio Continuo
                </h4>
                <div className="text-sm font-black text-[#5B8C2A]">Lunes a Domingo</div>
                <div className="text-base font-extrabold text-[#311302] mb-1">
                  8:00 AM – 6:00 PM
                </div>
                <p className="text-xs text-[#877362]">
                  Entregas de eventos especiales disponibles con reservación previa.
                </p>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-[#FFFFFF] border border-[#EADBCE] rounded-2xl p-5 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FFEADF] text-[#8A5100] flex items-center justify-center shrink-0 border border-[#DAC2AE]">
                <Mail className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-black text-[#311302] mb-1">Correo Electrónico</h4>
                <a
                  href="mailto:Fruitsnatural.22@gmail.com"
                  className="block text-sm font-bold text-[#8A5100] hover:underline mb-1"
                >
                  Fruitsnatural.22@gmail.com
                </a>
                <p className="text-xs text-[#877362]">
                  Facturación y convenios de mayoreo (a partir de 15 botellas) para empresas y restaurantes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
