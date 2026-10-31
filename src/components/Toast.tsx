import React from 'react';
import { CheckCircle2, ShoppingBag } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  onViewCart?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  isVisible,
  onClose,
  onViewCart,
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div className="bg-[#311302] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-[#F39200]/40 flex items-center gap-3">
        <CheckCircle2 className="w-5 h-5 text-[#5B8C2A] shrink-0" />
        <span className="text-xs sm:text-sm font-bold">{message}</span>
        {onViewCart && (
          <button
            onClick={onViewCart}
            className="ml-2 px-3 py-1 bg-[#F39200] hover:bg-[#E06800] text-white text-xs font-black rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Ver Cotizador</span>
          </button>
        )}
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white text-sm font-bold ml-1 p-1"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
