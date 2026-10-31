import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface IntroLoaderProps {
  onComplete: () => void;
}

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const [count, setCount] = useState(1);
  const [stage, setStage] = useState<'counting' | 'logo' | 'closing' | 'done'>('counting');

  // Dynamic vibrant colors that change as the counter climbs
  const getGradientColor = (num: number) => {
    if (num < 20) {
      // Jamaica
      return 'from-[#FF3366] via-[#C81E32] to-[#7A0A16]';
    } else if (num < 40) {
      // Horchata & Canela
      return 'from-[#F59E0B] via-[#D97706] to-[#92400E]';
    } else if (num < 60) {
      // Tamarindo
      return 'from-[#FB923C] via-[#EA580C] to-[#9A3412]';
    } else if (num < 80) {
      // Lima Real Fresca
      return 'from-[#BEF264] via-[#65A30D] to-[#3F6212]';
    } else {
      // Guayaba & Taro Especial
      return 'from-[#F472B6] via-[#A855F7] to-[#F59E0B]';
    }
  };

  const getFlavorName = (num: number) => {
    if (num < 20) return 'Flor de Jamaica';
    if (num < 40) return 'Horchata & Canela';
    if (num < 60) return 'Tamarindo Real';
    if (num < 80) return 'Lima Real Fresca';
    return 'Taro & Guayaba Especial';
  };

  useEffect(() => {
    // Smooth counting from 1 to 100
    const durationMs = 1750;
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      
      // Easing for a smooth, natural count
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.max(1, Math.floor(easeOut * 100));

      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setCount(100);
        // Step 2: Show logo and text when counter reaches 100
        setStage('logo');
      }
    };

    const animFrame = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  useEffect(() => {
    if (stage === 'logo') {
      // Allow time for the bouncing logo animation and reading the text
      const timer = setTimeout(() => {
        // Step 3: Close the intro window so the main waters page appears
        setStage('closing');
      }, 1500);

      return () => clearTimeout(timer);
    }

    if (stage === 'closing') {
      // Transition duration for shutters/curtain to close and reveal the page
      const timer = setTimeout(() => {
        setStage('done');
        window.scrollTo({ top: 0, behavior: 'instant' });
        onComplete();
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [stage, onComplete]);

  const handleSkip = () => {
    setStage('closing');
    setTimeout(() => {
      setStage('done');
      window.scrollTo({ top: 0, behavior: 'instant' });
      onComplete();
    }, 350);
  };

  if (stage === 'done') {
    return null;
  }

  const isClosing = stage === 'closing';

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col justify-between overflow-hidden select-none transition-opacity duration-300 ${
        isClosing ? 'pointer-events-none' : ''
      }`}
      aria-label="Cargando Fru'its Natural"
    >
      {/* Top Shutter Panel (Closes/Opens smoothly to reveal the waters) */}
      <div
        className={`absolute top-0 left-0 w-full h-1/2 bg-[#1A0901] transition-transform duration-700 ease-in-out z-10 ${
          isClosing ? '-translate-y-full' : 'translate-y-0'
        }`}
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 50% 100%, rgba(243, 146, 0, 0.2), transparent 75%)',
        }}
      />

      {/* Bottom Shutter Panel */}
      <div
        className={`absolute bottom-0 left-0 w-full h-1/2 bg-[#1A0901] transition-transform duration-700 ease-in-out z-10 ${
          isClosing ? 'translate-y-full' : 'translate-y-0'
        }`}
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 50% 0%, rgba(91, 140, 42, 0.2), transparent 75%)',
        }}
      />

      {/* Foreground Content */}
      <div
        className={`relative z-20 w-full h-full flex flex-col justify-between p-6 sm:p-10 md:p-16 transition-all duration-500 ${
          isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        {/* Top Header bar with status and skip button */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B8F081] animate-ping" />
            <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-amber-200/90">
              Fru'its Natural • Cocula, Jalisco
            </span>
          </div>

          <button
            onClick={handleSkip}
            className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white border border-white/20 text-xs font-bold transition-all cursor-pointer backdrop-blur-md active:scale-95"
            title="Saltar intro"
          >
            <span>Saltar intro</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Main Body */}
        <div className="relative w-full flex-1 flex flex-col justify-center max-w-[1240px] mx-auto">
          {/* STAGE 1: Counting from 1 to 100 on the LEFT SIDE of the page with colorful shifting typography */}
          {stage === 'counting' && (
            <div className="w-full flex flex-col items-start justify-center text-left">
              {/* Active Flavor Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs sm:text-sm text-white/90 mb-4 backdrop-blur-md shadow-sm">
                <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '3s' }} />
                <span className="text-white/60">Destilando sabor:</span>
                <span className="font-extrabold text-[#B8F081]">{getFlavorName(count)}</span>
              </div>

              {/* Large Bold Left-Side Counter with Multi-Color Shifting Gradient */}
              <div className="flex items-baseline gap-2">
                <span
                  className={`text-8xl sm:text-[140px] md:text-[180px] lg:text-[210px] font-black font-mono tracking-tighter leading-none bg-gradient-to-br ${getGradientColor(
                    count
                  )} bg-clip-text text-transparent drop-shadow-[0_10px_35px_rgba(243,146,0,0.35)] transition-all duration-100`}
                >
                  {count}
                </span>
                <span className="text-4xl sm:text-6xl md:text-7xl font-black text-amber-400 font-mono opacity-80">
                  %
                </span>
              </div>

              {/* Multicolor Progress Bar */}
              <div className="w-full max-w-md sm:max-w-xl mt-5 h-2.5 sm:h-3 bg-white/10 rounded-full overflow-hidden border border-white/10">
                <div
                  className={`h-full bg-gradient-to-r ${getGradientColor(
                    count
                  )} transition-all duration-100 rounded-full shadow-[0_0_15px_rgba(243,146,0,0.8)]`}
                  style={{ width: `${count}%` }}
                />
              </div>

              {/* Subtitle underneath counter on left side */}
              <p className="text-white/65 text-xs sm:text-sm font-semibold tracking-wide mt-3.5 flex items-center gap-2">
                <span>Cargando aguas 100% naturales en envase real</span>
                <span className="text-white/30">•</span>
                <span className="text-[#B8F081]">Cocula, Jal.</span>
              </p>
            </div>
          )}

          {/* STAGE 2: Reached 100! Logo appears with bouncy animation + text 'artesanal de cocula,jalisco' */}
          {(stage === 'logo' || stage === 'closing') && (
            <div className="w-full flex flex-col items-center justify-center text-center">
              <div className="relative flex flex-col items-center justify-center">
                {/* Radiant Glow Behind Logo */}
                <div className="absolute w-52 h-52 sm:w-72 sm:h-72 rounded-full bg-gradient-to-tr from-amber-500/40 via-purple-500/30 to-lime-500/40 blur-3xl animate-pulse" />

                {/* Bouncing Logo */}
                <div className="relative animate-intro-bounce z-20">
                  <div className="relative p-2.5 rounded-full bg-gradient-to-tr from-[#F39200] via-[#5B8C2A] to-[#8B5CF6] shadow-[0_0_50px_rgba(243,146,0,0.6)]">
                    <img
                      src="/assets/aistudio/Image_3_5c12d091.jpeg"
                      alt="Fru'its Natural Logo"
                      className="w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full object-contain bg-white shadow-2xl ring-4 ring-white"
                    />
                  </div>

                  {/* Sparkle badge attached to logo */}
                  <div className="absolute -top-2 -right-2 bg-amber-400 text-[#311302] p-1.5 rounded-full shadow-lg animate-bounce">
                    <Sparkles className="w-5 h-5 text-[#311302]" />
                  </div>
                </div>

                {/* Tagline directly underneath the logo as requested by user */}
                <div className="mt-6 z-20 flex flex-col items-center animate-fadeIn">
                  <div className="inline-flex items-center gap-2.5 px-5 py-1.5 rounded-full bg-white/10 border border-white/25 backdrop-blur-md shadow-xl">
                    <span className="text-amber-400 text-xs">✦</span>
                    <p className="text-xs sm:text-sm md:text-base font-extrabold tracking-widest uppercase text-[#FFE3D4]">
                      artesanal de cocula,jalisco
                    </p>
                    <span className="text-amber-400 text-xs">✦</span>
                  </div>

                  <span className="text-white/60 text-[11px] sm:text-xs font-semibold tracking-wider mt-2.5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B8F081] animate-ping" />
                    <span>¡Listo! Entrando a las aguas frescas...</span>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Palette dots */}
        <div className="w-full flex items-center justify-between text-[11px] text-white/50 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C81E32]" title="Jamaica" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]" title="Horchata" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#EA580C]" title="Tamarindo" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#5B8C2A]" title="Lima Real" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#F43F5E]" title="Guayaba" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" title="Taro" />
            <span className="hidden sm:inline text-white/40 ml-1">6 Sabores Naturales</span>
          </div>

          <div className="text-right font-medium">
            <span className="text-white/60">Cocula, Jalisco y Alrededores</span>
          </div>
        </div>
      </div>
    </div>
  );
};
