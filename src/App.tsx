/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedFlavor } from './components/FeaturedFlavor';
import { FlavorCatalog } from './components/FlavorCatalog';
import { PackagesSection } from './components/PackagesSection';
import { LiveCalculator } from './components/LiveCalculator';
import { QualityColdChain } from './components/QualityColdChain';
import { ReviewsSection } from './components/ReviewsSection';
import { CoverageAndContact } from './components/CoverageAndContact';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { FlavorAlertModal } from './components/FlavorAlertModal';
import { IntroLoader } from './components/IntroLoader';
import { FLAVORS } from './data/flavors';
import { BottleSize, CartItem, Flavor, SpecialPackage, ProductReview } from './types';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('fruits_natural_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [reviews, setReviews] = useState<ProductReview[]>(() => {
    try {
      const saved = localStorage.getItem('fruits_natural_reviews');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toast, setToast] = useState<{ isVisible: boolean; message: string }>({
    isVisible: false,
    message: '',
  });

  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('fruits_natural_cart', JSON.stringify(cart));
    } catch {
      // Storage unavailable or disabled
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('fruits_natural_reviews', JSON.stringify(reviews));
    } catch {
      // Storage unavailable or disabled
    }
  }, [reviews]);

  const handleAddReview = (newReviewData: Omit<ProductReview, 'id' | 'createdAt' | 'likes'>) => {
    const newReview: ProductReview = {
      ...newReviewData,
      id: `rev-${Date.now()}`,
      createdAt: new Date().toLocaleDateString('es-MX', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      likes: 0,
    };
    setReviews((prev) => [newReview, ...prev]);
    showNotification('¡Muchas gracias por calificar y compartir tu opinión!');
  };

  const handleLikeReview = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, likes: r.likes + 1 } : r))
    );
  };

  const showNotification = (message: string) => {
    setToast({ isVisible: true, message });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, isVisible: false }));
    }, 4000);
  };

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getItemQuantity = (flavorId: string, size: BottleSize): number => {
    const item = cart.find((i) => i.flavorId === flavorId && i.size === size);
    return item ? item.quantity : 0;
  };

  const updateQuantity = (flavor: Flavor, size: BottleSize, delta: number) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.flavorId === flavor.id && i.size === size
      );

      const price = size === '1L' ? flavor.price1L : flavor.price500ml;
      const sizeLabel = size === '1L' ? '1 Litro' : '1/2 Litro';

      if (existingIndex > -1) {
        const newQty = prev[existingIndex].quantity + delta;
        if (newQty <= 0) {
          return prev.filter((_, idx) => idx !== existingIndex);
        }
        const updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], quantity: newQty };
        return updated;
      } else if (delta > 0) {
        return [
          ...prev,
          {
            id: `${flavor.id}-${size}`,
            flavorId: flavor.id,
            flavorName: flavor.name,
            size,
            sizeLabel,
            unitPrice: price,
            quantity: delta,
          },
        ];
      }
      return prev;
    });

    if (delta > 0) {
      showNotification(`Agregado al cotizador: ${flavor.name} (${size === '1L' ? '1 Litro' : '1/2 Litro'})`);
    }
  };

  const updateCartItem = (id: string, delta: number) => {
    setCart((prev) => {
      const index = prev.findIndex((i) => i.id === id);
      if (index === -1) return prev;
      const newQty = prev[index].quantity + delta;
      if (newQty <= 0) {
        return prev.filter((i) => i.id !== id);
      }
      const updated = [...prev];
      updated[index] = { ...updated[index], quantity: newQty };
      return updated;
    });
  };

  const removeCartItem = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    showNotification('Cotizador vaciado correctamente');
  };

  const addTaroQuick = () => {
    const taro = FLAVORS.find((f) => f.id === 'taro');
    if (!taro) return;

    setCart((prev) => {
      const existing = prev.find((i) => i.flavorId === 'taro' && i.size === '1L');
      if (existing) {
        return prev.map((item) =>
          item.id === existing.id ? { ...item, quantity: item.quantity + 2 } : item
        );
      }
      return [
        ...prev,
        {
          id: 'taro-1L',
          flavorId: 'taro',
          flavorName: taro.name,
          size: '1L',
          sizeLabel: '1 Litro',
          unitPrice: taro.price1L,
          quantity: 2,
        },
      ];
    });

    showNotification("¡Se agregaron +2 botellas de Taro Cremoso (1L)!");
    scrollTo('#cotizador');
  };

  const loadPackage = (pkg: SpecialPackage) => {
    const newItems: CartItem[] = [];

    pkg.defaultAssortment.forEach((item) => {
      const flavor = FLAVORS.find((f) => f.id === item.flavorId);
      if (flavor) {
        const price = item.size === '1L' ? flavor.price1L : flavor.price500ml;
        const sizeLabel = item.size === '1L' ? '1 Litro' : '1/2 Litro';
        newItems.push({
          id: `${flavor.id}-${item.size}`,
          flavorId: flavor.id,
          flavorName: flavor.name,
          size: item.size,
          sizeLabel,
          unitPrice: price,
          quantity: item.quantity,
        });
      }
    });

    setCart(newItems);
    showNotification(`¡${pkg.name} cargado con éxito al cotizador!`);
    scrollTo('#cotizador');
  };

  const quickAddPopular = () => {
    // Adds a starter pack of 15 bottles (3 each of 5 favorite flavors) to activate wholesale!
    const starter: CartItem[] = [
      {
        id: 'horchata-1L',
        flavorId: 'horchata',
        flavorName: 'Horchata Casera',
        size: '1L',
        sizeLabel: '1 Litro',
        unitPrice: 21,
        quantity: 3,
      },
      {
        id: 'jamaica-1L',
        flavorId: 'jamaica',
        flavorName: 'Jamaica Tradicional',
        size: '1L',
        sizeLabel: '1 Litro',
        unitPrice: 21,
        quantity: 3,
      },
      {
        id: 'limon-1L',
        flavorId: 'limon',
        flavorName: 'Lima Real',
        size: '1L',
        sizeLabel: '1 Litro',
        unitPrice: 21,
        quantity: 3,
      },
      {
        id: 'taro-1L',
        flavorId: 'taro',
        flavorName: 'Taro Especial',
        size: '1L',
        sizeLabel: '1 Litro',
        unitPrice: 21,
        quantity: 3,
      },
      {
        id: 'guayaba-1L',
        flavorId: 'guayaba',
        flavorName: 'Guayaba Natural',
        size: '1L',
        sizeLabel: '1 Litro',
        unitPrice: 21,
        quantity: 3,
      },
    ];
    setCart(starter);
    showNotification('¡Paquete de 15 botellas cargado! 🎉 ¡Tarifa de Mayoreo activada!');
    scrollTo('#cotizador');
  };

  const totalBottlesCount = cart.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FFF8F5] text-[#311302] selection:bg-[#F39200] selection:text-white">
      {/* Intro animado con contador del 1 al 100 de colores y rebote de logo */}
      {showIntro && (
        <IntroLoader onComplete={() => setShowIntro(false)} />
      )}

      {/* Top Navbar */}
      <Navbar
        cartCount={totalBottlesCount}
        onNavigateToCotizador={() => scrollTo('#cotizador')}
        onOpenFlavorAlert={() => setIsAlertModalOpen(true)}
        onReplayIntro={() => setShowIntro(true)}
      />

      {/* Main Content Container */}
      <main>
        {/* 1. Hero Section */}
        <Hero
          onOrderClick={() => scrollTo('#cotizador')}
          onExploreClick={() => scrollTo('#sabores')}
          onNoveltyClick={() => scrollTo('#nuevo-sabor')}
          onOpenFlavorAlert={() => setIsAlertModalOpen(true)}
          onReplayIntro={() => setShowIntro(true)}
        />

        {/* 2. Featured Flavor: Taro Cremoso */}
        <FeaturedFlavor onAddTaroQuick={addTaroQuick} />

        {/* 3. Catálogo de Sabores Artesanales */}
        <FlavorCatalog
          flavors={FLAVORS}
          getItemQuantity={getItemQuantity}
          onUpdateQuantity={updateQuantity}
        />

        {/* 4. Paquetes Especiales */}
        <PackagesSection onLoadPackage={loadPackage} />

        {/* 5. Calculadora y Cotizador en Vivo */}
        <LiveCalculator
          cart={cart}
          onUpdateCartItem={updateCartItem}
          onRemoveCartItem={removeCartItem}
          onClearCart={clearCart}
          onQuickAddPopular={quickAddPopular}
          onOpenFlavorAlert={() => setIsAlertModalOpen(true)}
        />

        {/* 6. Compromiso de Calidad y Cadena de Frío */}
        <QualityColdChain />

        {/* 7. Opiniones, Calificaciones con Estrellas y Fotos */}
        <ReviewsSection
          reviews={reviews}
          onAddReview={handleAddReview}
          onLikeReview={handleLikeReview}
        />

        {/* 8. Zona de Cobertura y Taller Artesanal */}
        <CoverageAndContact />
      </main>

      {/* Botón Flotante para Ver/Repetir Intro */}
      <button
        type="button"
        onClick={() => setShowIntro(true)}
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#1A0901]/95 hover:bg-[#311302] text-amber-300 hover:text-white border-2 border-amber-400/50 shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer text-xs font-black tracking-wide group"
        title="Ver Intro Animado de Carga (Contador 1 al 100)"
      >
        <span className="flex h-2.5 w-2.5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400"></span>
        </span>
        <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
        <span>Ver Intro Animado</span>
      </button>

      {/* Footer */}
      <Footer 
        onReplayIntro={() => setShowIntro(true)} 
        onShowToast={showNotification}
      />

      {/* Modal Avisarme de Nuevos Sabores al Teléfono */}
      <FlavorAlertModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        onShowToast={showNotification}
      />

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={() => setToast((prev) => ({ ...prev, isVisible: false }))}
        onViewCart={() => scrollTo('#cotizador')}
      />
    </div>
  );
}
