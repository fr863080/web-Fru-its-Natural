import React, { useState, useEffect } from 'react';
import {
  BellRing,
  Smartphone,
  CheckCircle2,
  X,
  Send,
  Volume2,
  Sparkles,
  MessageCircle,
  ShieldCheck,
  Bell,
} from 'lucide-react';

interface FlavorAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (message: string) => void;
}

export const FlavorAlertModal: React.FC<FlavorAlertModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [wantsWhatsApp, setWantsWhatsApp] = useState(true);
  const [wantsPush, setWantsPush] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [pushStatus, setPushStatus] = useState<'default' | 'granted' | 'denied' | 'unsupported'>('default');
  const [testNotificationSent, setTestNotificationSent] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPushStatus(Notification.permission);
    } else {
      setPushStatus('unsupported');
    }
  }, []);

  if (!isOpen) return null;

  // Gentle audio chime using standard Web Audio API
  const playAlertChime = () => {
    try {
      const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch {
      // Audio not permitted or supported
    }
  };

  const handleRequestPushPermission = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const permission = await Notification.requestPermission();
        setPushStatus(permission);
        if (permission === 'granted') {
          playAlertChime();
          new Notification("🔔 ¡Avisos al Teléfono Activados!", {
            body: "Fru'its Natural: Recibirás una alerta en tu teléfono en cuanto lancemos un nuevo sabor de temporada.",
            icon: "/assets/aistudio/Image_3_5c12d091.jpeg",
          });
          onShowToast('¡Avisos en el teléfono activados con éxito!');
        }
      } catch {
        // Ignored
      }
    }
  };

  const handleTestAlert = () => {
    playAlertChime();
    setTestNotificationSent(true);

    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      new Notification("🍉 ¡Novedad Fru'its Natural!", {
        body: "¡Prueba de aviso en tu teléfono! Cuando salga un nuevo sabor artesanal, recibirás una alerta así de fresca.",
        icon: "/assets/aistudio/Image_3_5c12d091.jpeg",
      });
    }

    onShowToast('🔔 Alerta de prueba enviada a tu teléfono');
    setTimeout(() => setTestNotificationSent(false), 4000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phoneNumber.trim().replace(/\D/g, '');

    if (cleanPhone.length < 10) {
      alert('Por favor ingresa un número de teléfono válido de 10 dígitos.');
      return;
    }

    // Save subscriber locally
    try {
      const existing = JSON.parse(localStorage.getItem('fruits_natural_subscribers') || '[]');
      const newSubscriber = {
        name: name.trim() || 'Amigo de Fru\'its Natural',
        phone: cleanPhone,
        wantsWhatsApp,
        wantsPush,
        date: new Date().toISOString(),
      };
      existing.push(newSubscriber);
      localStorage.setItem('fruits_natural_subscribers', JSON.stringify(existing));
    } catch {
      // Ignore storage errors
    }

    // Play pleasant chime
    playAlertChime();

    // Try requesting web push if enabled
    if (wantsPush && typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then((perm) => {
        setPushStatus(perm);
        if (perm === 'granted') {
          new Notification("🔔 ¡Suscripción confirmada!", {
            body: `¡Hola ${name || 'amigo'}! Te avisaremos al teléfono cada vez que haya un nuevo sabor de aguas frescas.`,
            icon: "/assets/aistudio/Image_3_5c12d091.jpeg",
          });
        }
      });
    }

    setIsSubmitted(true);
    onShowToast('¡Teléfono registrado para avisos de nuevos sabores!');
  };

  const openWhatsAppBroadcast = () => {
    const cleanPhone = phoneNumber.trim().replace(/\D/g, '');
    const clientName = name.trim() || 'Cliente';
    const message = encodeURIComponent(
      `¡Hola Fru'its Natural! 🍉 Me gustaría que me manden avisos a mi teléfono cuando saquen NUEVOS SABORES de aguas frescas y temporadas especiales.\n\n👤 Nombre: ${clientName}\n📱 Teléfono: ${cleanPhone || 'Mismo de este chat'}\n📍 Ciudad: Cocula y alrededores`
    );
    window.open(`https://wa.me/523320414321?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative bg-[#FFFFFF] border-2 border-[#F39200]/40 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-[#F39200] via-[#E06800] to-[#8A5100] p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner border border-white/30">
            <BellRing className="w-7 h-7 text-[#FFF1EA] animate-bounce" />
          </div>

          <span className="inline-block px-3 py-0.5 rounded-full bg-white/25 text-white text-[11px] font-black uppercase tracking-wider mb-1.5">
            ALERTA TEMPRANA DE LANZAMIENTOS
          </span>
          <h3 className="text-2xl font-black tracking-tight drop-shadow-sm">
            Avisarme de Nuevos Sabores
          </h3>
          <p className="text-xs sm:text-sm text-white/90 mt-1 max-w-sm mx-auto">
            ¡Recibe avisos directos en tu teléfono cada vez que saquemos una fruta o sabor de temporada!
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 bg-[#FFFDF7]">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Phone Input */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#311302] mb-1.5 flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-[#F39200]" />
                  <span>Tu Número de Teléfono (WhatsApp / Móvil) *</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-black text-[#8A5100]">
                    +52
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={14}
                    placeholder="Ej. 33 2041 4321"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full pl-14 pr-4 py-3 bg-white border border-[#EADBCE] focus:border-[#F39200] focus:ring-2 focus:ring-[#F39200]/20 rounded-xl text-base font-bold text-[#311302] placeholder:text-[#A8988B] outline-none transition-all shadow-xs"
                  />
                </div>
                <p className="text-[11px] text-[#7A6A5C] mt-1 font-medium">
                  Te avisaremos solo cuando haya nuevos sabores, recetas especiales o promociones. Cero spam.
                </p>
              </div>

              {/* Name Input (Optional) */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#311302] mb-1.5">
                  Tu Nombre (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="¿Cómo te llamas?"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-[#EADBCE] focus:border-[#F39200] focus:ring-2 focus:ring-[#F39200]/20 rounded-xl text-sm font-semibold text-[#311302] placeholder:text-[#A8988B] outline-none transition-all shadow-xs"
                />
              </div>

              {/* Notification Channels Selection */}
              <div className="bg-[#FFF1EA]/60 border border-[#FFE3D4] rounded-2xl p-3.5 space-y-2.5">
                <span className="block text-[11px] font-black uppercase tracking-wider text-[#8A5100]">
                  ¿Cómo prefieres recibir los avisos?
                </span>

                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={wantsWhatsApp}
                    onChange={(e) => setWantsWhatsApp(e.target.checked)}
                    className="mt-0.5 rounded text-[#5B8C2A] focus:ring-[#5B8C2A] w-4 h-4 cursor-pointer"
                  />
                  <div className="text-xs">
                    <span className="font-extrabold text-[#311302] flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                      Mensaje directo por WhatsApp
                    </span>
                    <span className="text-[#6B5A4B] block text-[11px]">
                      Aviso en tu WhatsApp cuando esté listo el nuevo lote fresco.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={wantsPush}
                    onChange={(e) => setWantsPush(e.target.checked)}
                    className="mt-0.5 rounded text-[#5B8C2A] focus:ring-[#5B8C2A] w-4 h-4 cursor-pointer"
                  />
                  <div className="text-xs">
                    <span className="font-extrabold text-[#311302] flex items-center gap-1">
                      <Bell className="w-3.5 h-3.5 text-[#F39200]" />
                      Notificación instantánea en pantalla de tu teléfono
                    </span>
                    <span className="text-[#6B5A4B] block text-[11px]">
                      Alerta con sonido/vibración sin necesidad de abrir la app.
                    </span>
                  </div>
                </label>
              </div>

              {/* Push Permission Quick Activator */}
              {pushStatus === 'default' && (
                <div className="flex items-center justify-between p-2.5 bg-[#F6FBEF] border border-[#C5E1A5] rounded-xl text-xs">
                  <span className="font-bold text-[#33691E] flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#558B2F]" />
                    ¿Activar avisos móviles ahora?
                  </span>
                  <button
                    type="button"
                    onClick={handleRequestPushPermission}
                    className="px-3 py-1 bg-[#558B2F] hover:bg-[#33691E] text-white rounded-lg font-bold text-[11px] shadow-xs cursor-pointer transition-colors"
                  >
                    Permitir
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full btn-primary-glow inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-[#F39200] hover:bg-[#E06800] text-white font-black text-base shadow-lg transition-all active:scale-98 cursor-pointer"
              >
                <BellRing className="w-5 h-5" />
                <span>Activar Avisos a mi Teléfono</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#7A6A5C] font-semibold text-center pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#5B8C2A]" />
                <span>Tus datos son 100% privados y únicamente para lanzamientos de aguas frescas.</span>
              </div>
            </form>
          ) : (
            /* Success State */
            <div className="text-center py-4 space-y-4 animate-fadeIn">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <h4 className="text-xl font-black text-[#311302]">
                  ¡Teléfono Registrado Exitosamente!
                </h4>
                <p className="text-xs sm:text-sm text-[#544434] mt-1 max-w-sm mx-auto">
                  Te hemos agregado a la lista preferencial. Cuando Fru'its Natural lance su próximo sabor artesanal, recibirás la alerta al instante.
                </p>
              </div>

              {/* Interactive test trigger */}
              <div className="bg-[#FFF8F5] border border-[#FFE3D4] rounded-2xl p-4 text-left space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#311302] flex items-center gap-1.5">
                    <Volume2 className="w-4 h-4 text-[#F39200]" />
                    ¿Quieres escuchar cómo suena el aviso?
                  </span>
                  <button
                    type="button"
                    onClick={handleTestAlert}
                    className="btn-subtle-lift px-3 py-1.5 bg-white border border-[#EADBCE] text-[#8A5100] hover:bg-[#FFF1EA] rounded-xl text-xs font-black shadow-xs cursor-pointer flex items-center gap-1.5 transition-all"
                  >
                    <BellRing className="w-3.5 h-3.5 text-[#F39200]" />
                    <span>Probar en mi teléfono</span>
                  </button>
                </div>
                {testNotificationSent && (
                  <p className="text-[11px] font-bold text-[#2E7D32] bg-[#E8F5E9] p-2 rounded-lg">
                    ✓ ¡Alerta sonora y notificación emitida en tu dispositivo!
                  </p>
                )}
              </div>

              {/* Confirm via WhatsApp button */}
              {wantsWhatsApp && (
                <button
                  type="button"
                  onClick={openWhatsAppBroadcast}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-2xl font-black text-sm shadow-md transition-all active:scale-98 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Confirmar por WhatsApp con 1 Clic</span>
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 text-xs font-bold text-[#8A5100] hover:text-[#5C3400] transition-colors cursor-pointer"
              >
                Cerrar y seguir explorando sabores
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
