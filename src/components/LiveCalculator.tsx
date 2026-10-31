import React, { useState } from 'react';
import {
  Calculator,
  Truck,
  Trash2,
  Minus,
  Plus,
  Send,
  Banknote,
  Building2,
  CreditCard,
  AlertCircle,
  CheckCircle2,
  User,
  ShoppingBag,
  Copy,
  ExternalLink,
  MessageCircle,
  PhoneCall,
  X,
  BellRing,
  Tag,
  Sparkles,
} from 'lucide-react';
import { CartItem, DeliveryFormData } from '../types';

interface LiveCalculatorProps {
  cart: CartItem[];
  onUpdateCartItem: (id: string, delta: number) => void;
  onRemoveCartItem: (id: string) => void;
  onClearCart: () => void;
  onQuickAddPopular: () => void;
  onOpenFlavorAlert?: () => void;
}

export const LiveCalculator: React.FC<LiveCalculatorProps> = ({
  cart,
  onUpdateCartItem,
  onRemoveCartItem,
  onClearCart,
  onQuickAddPopular,
  onOpenFlavorAlert,
}) => {
  const [formData, setFormData] = useState<DeliveryFormData>({
    fullName: '',
    phone: '',
    streetAndNumber: '',
    colony: '',
    postalCode: '',
    references: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const totalBottles = cart.reduce((acc, item) => acc + item.quantity, 0);
  const rawSubtotal = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  
  // Regla oficial: Mayoreo a partir de 15 botellas
  const minBottlesForWholesale = 15;
  const isWholesale = totalBottles >= minBottlesForWholesale;
  const remainingForWholesale = Math.max(0, minBottlesForWholesale - totalBottles);
  const wholesaleProgressPercent = Math.min(100, Math.round((totalBottles / minBottlesForWholesale) * 100));

  // Descuento de Mayoreo del 10% cuando se cumple el mínimo de 15 botellas
  const wholesaleDiscount = isWholesale ? Math.round(rawSubtotal * 0.10) : 0;
  const totalPrice = rawSubtotal - wholesaleDiscount;

  const minBottlesForFreeShipping = 10;
  const remainingForFree = Math.max(0, minBottlesForFreeShipping - totalBottles);
  const shippingProgressPercent = Math.min(100, Math.round((totalBottles / minBottlesForFreeShipping) * 100));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const buildOrderMessage = () => {
    let message = `*🍉 PEDIDO DE AGUAS FRESCAS - FRU'ITS NATURAL 🍉*\n`;
    message += `_Cocula, Jalisco_\n\n`;
    message += `*DATOS PARA MI ENTREGA:*\n`;
    message += `👤 *Cliente:* ${formData.fullName.trim() || 'No especificado'}\n`;
    message += `📞 *Teléfono:* ${formData.phone.trim() || 'No especificado'}\n`;
    message += `📍 *Dirección:* ${formData.streetAndNumber.trim() || 'No especificado'}, Col. ${
      formData.colony.trim() || 'Cocula'
    }${formData.postalCode?.trim() ? `, C.P. ${formData.postalCode.trim()}` : ''}\n`;
    if (formData.references.trim()) {
      message += `🗺️ *Referencias:* ${formData.references.trim()}\n`;
    }
    message += `\n*DESGLOSE DEL PEDIDO:*\n`;

    cart.forEach((item) => {
      message += `• ${item.quantity}x ${item.flavorName} (${item.sizeLabel}) - $${
        item.unitPrice * item.quantity
      } MXN\n`;
    });

    message += `\n*RESUMEN Y TARIFA:* \n`;
    message += `🍾 *Total de Botellas:* ${totalBottles} piezas\n`;
    message += `🏷️ *Tarifa:* ${
      isWholesale
        ? '✅ ¡MAYOREO APLICADO! (A partir de 15 botellas)'
        : `Menudeo (Faltan ${remainingForWholesale} pzas para precio de Mayoreo)`
    }\n`;
    if (isWholesale) {
      message += `💵 *Subtotal Menudeo:* $${rawSubtotal.toLocaleString()} MXN\n`;
      message += `🎉 *Descuento Mayoreo (15+ pzas):* -$${wholesaleDiscount.toLocaleString()} MXN\n`;
    }
    message += `🚚 *Envío Local:* ${
      totalBottles >= minBottlesForFreeShipping
        ? '¡GRATIS en Cocula!'
        : 'Entrega estándar / a convenir'
    }\n`;
    message += `💰 *TOTAL A PAGAR:* $${totalPrice.toLocaleString()} MXN\n\n`;
    message += `Por favor confirmen recepción para preparar mis hieleras térmicas y coordinar entrega. ¡Muchas gracias!`;
    return message;
  };

  const getWhatsAppUrls = () => {
    const msg = buildOrderMessage();
    const encoded = encodeURIComponent(msg);
    return {
      mobileUrl: `https://wa.me/523320414321?text=${encoded}`,
      webUrl: `https://web.whatsapp.com/send?phone=523320414321&text=${encoded}`,
      apiUrl: `https://api.whatsapp.com/send?phone=523320414321&text=${encoded}`,
      rawMessage: msg,
    };
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      setFormErrors({
        cart: 'Por favor agrega al menos una botella o selecciona un paquete antes de pedir por WhatsApp.',
      });
      return;
    }

    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = 'Ingresa tu nombre completo';
    if (!formData.phone.trim()) errors.phone = 'Ingresa tu teléfono móvil';
    if (!formData.streetAndNumber.trim()) errors.streetAndNumber = 'Ingresa calle y número';
    if (!formData.colony.trim()) errors.colony = 'Ingresa colonia o barrio';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Open WhatsApp directly
    const { mobileUrl } = getWhatsAppUrls();
    // Also open our interactive modal as guaranteed visual backup and confirmation
    setOrderModalOpen(true);

    // Try to trigger direct navigation as a link click
    try {
      const link = document.createElement('a');
      link.href = mobileUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      // If browser prevents it, modal displays the direct buttons
    }
  };

  const handleCopyOrder = () => {
    const { rawMessage } = getWhatsAppUrls();
    navigator.clipboard.writeText(rawMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const { mobileUrl, webUrl, rawMessage } = getWhatsAppUrls();

  return (
    <section id="cotizador" className="py-16 bg-[#FFFDF7]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="bg-[#FFFFFF] border border-[#EADBCE] rounded-3xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Column: Live Calculator & Cart Breakdown */}
            <div className="lg:col-span-7 p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-[#EADBCE] flex flex-col justify-between">
              <div>
                {/* Header */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-[#FFF1EA] flex items-center justify-center text-[#8A5100]">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-[#311302]">
                      Calculadora y Cotizador en Vivo
                    </h2>
                    <p className="text-xs sm:text-sm text-[#544434]">
                      Verifica tu lista de aguas antes de enviar a WhatsApp
                    </p>
                  </div>
                </div>

                {/* Wholesale 15 Bottles Tier Banner & Progress Card */}
                <div
                  className={`my-5 rounded-2xl p-4 transition-all border ${
                    isWholesale
                      ? 'bg-[#EDF5E5] border-[#5B8C2A] shadow-xs'
                      : 'bg-[#FFF8F5] border-[#FFE3D4]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#311302] mb-2 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      {isWholesale ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-[#5B8C2A] shrink-0" />
                          <div>
                            <span className="text-[#3C6A05] font-black block">
                              ¡PRECIO DE MAYOREO ACTIVADO! (A partir de 15 botellas)
                            </span>
                            <span className="text-[11px] text-[#544434] font-medium">
                              10% de descuento automático en todo tu pedido + Envío local gratis en Cocula
                            </span>
                          </div>
                        </>
                      ) : (
                        <>
                          <Tag className="w-4 h-4 text-[#F39200] shrink-0" />
                          <span>
                            <strong>Mayoreo a partir de 15 botellas:</strong> agrega{' '}
                            <span className="text-[#8A5100] font-black">{remainingForWholesale}</span> botella(s) más para tarifa de Mayoreo
                          </span>
                        </>
                      )}
                    </div>
                    <span className="text-xs font-black text-[#8A5100] bg-white px-2.5 py-1 rounded-full border border-[#FFE3D4] shrink-0">
                      {totalBottles} / 15 piezas
                    </span>
                  </div>

                  {/* Wholesale Progress Bar */}
                  <div className="w-full bg-[#FFEADF] h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isWholesale ? 'bg-[#5B8C2A]' : 'bg-[#F39200]'
                      }`}
                      style={{ width: `${wholesaleProgressPercent}%` }}
                    />
                  </div>

                  {/* Free shipping small sub-pill */}
                  <div className="flex items-center justify-between text-[11px] text-[#7A6A5C] font-semibold mt-2 pt-2 border-t border-[#FFE3D4]/50">
                    <span className="flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-[#5B8C2A]" />
                      <span>Envío local gratis en Cocula: a partir de 10 botellas (¡Cumplido en mayoreo!)</span>
                    </span>
                    <span className={totalBottles >= minBottlesForFreeShipping ? 'text-[#3C6A05] font-black' : 'text-[#8A5100]'}>
                      {totalBottles >= minBottlesForFreeShipping ? '¡Envío Gratis Activo!' : `${totalBottles}/10 pzas`}
                    </span>
                  </div>
                </div>

                {/* Products Breakdown Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#FFF1EA] mb-4">
                  <h3 className="text-sm font-black text-[#311302] uppercase tracking-wider">
                    Desglose de Productos
                  </h3>
                  {cart.length > 0 && (
                    <button
                      onClick={onClearCart}
                      className="btn-subtle-lift text-xs font-bold text-[#D92525] hover:text-[#B01A1A] flex items-center gap-1 cursor-pointer px-2 py-1 rounded-lg"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Vaciar Carrito</span>
                    </button>
                  )}
                </div>

                {/* Cart alert if attempted to submit with empty cart */}
                {formErrors.cart && (
                  <div className="mb-4 p-3 bg-[#FFDAD6] border border-[#FF867A] text-[#820009] rounded-xl text-xs font-bold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formErrors.cart}</span>
                  </div>
                )}

                {/* Cart Items List */}
                {cart.length === 0 ? (
                  <div className="py-10 px-4 text-center border-2 border-dashed border-[#FFE3D4] rounded-2xl bg-[#FFFDF7] my-4">
                    <ShoppingBag className="w-10 h-10 mx-auto text-[#DAC2AE] mb-3" />
                    <p className="text-xs sm:text-sm text-[#544434] font-medium max-w-[400px] mx-auto mb-4">
                      Aún no has agregado botellas. Usa los controles (+) del catálogo o carga un paquete de mayoreo (a partir de 15 botellas).
                    </p>
                    <button
                      onClick={onQuickAddPopular}
                      className="btn-primary-glow inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#F39200] text-white hover:bg-[#E06800] text-xs font-bold shadow-sm transition-all cursor-pointer"
                    >
                      <Tag className="w-3.5 h-3.5" />
                      <span>Añadir paquete de 15 botellas (Mínimo Mayoreo)</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-[#FFFDF7] border border-[#FFF1EA] hover:border-[#FFE3D4] transition-all"
                      >
                        <div className="flex flex-col">
                          <span className="font-extrabold text-sm text-[#311302]">
                            {item.flavorName}
                          </span>
                          <span className="text-xs text-[#8A5100] font-semibold">
                            {item.sizeLabel} • ${item.unitPrice} MXN c/u
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          {/* Quantity Stepper */}
                          <div className="flex items-center gap-1.5 bg-white border border-[#EADBCE] rounded-full px-2 py-1">
                            <button
                              onClick={() => onUpdateCartItem(item.id, -1)}
                              aria-label="Disminuir"
                              className="btn-stepper text-[#8A5100] hover:text-[#D92525] p-1 cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-xs font-black w-5 text-center text-[#311302]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateCartItem(item.id, 1)}
                              aria-label="Aumentar"
                              className="btn-stepper text-[#8A5100] hover:text-[#5B8C2A] p-1 cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Line total */}
                          <span className="text-sm font-black text-[#311302] w-16 text-right">
                            ${item.unitPrice * item.quantity} MXN
                          </span>

                          {/* Remove button */}
                          <button
                            onClick={() => onRemoveCartItem(item.id)}
                            className="btn-subtle-lift text-gray-400 hover:text-[#D92525] p-1.5 rounded-lg transition-colors cursor-pointer"
                            title="Eliminar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Summary and Payment Strip */}
              <div className="mt-8 pt-6 border-t border-[#EADBCE]">
                <div className="space-y-2.5 mb-6">
                  <div className="flex justify-between items-center text-sm font-semibold text-[#544434]">
                    <span>Total de Botellas:</span>
                    <span className="font-extrabold text-[#311302]">{totalBottles} piezas</span>
                  </div>

                  <div className="flex justify-between items-center text-sm font-semibold text-[#544434]">
                    <span>Tipo de Tarifa:</span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-black flex items-center gap-1 ${
                        isWholesale
                          ? 'bg-[#EDF5E5] text-[#3C6A05] border border-[#B8F081]'
                          : 'bg-[#FFF1EA] text-[#8A5100]'
                      }`}
                    >
                      <Tag className="w-3 h-3" />
                      <span>
                        {isWholesale
                          ? 'Mayoreo Aplicado (A partir de 15 botellas)'
                          : 'Menudeo (Mayoreo a partir de 15 botellas)'}
                      </span>
                    </span>
                  </div>

                  {isWholesale && (
                    <div className="flex justify-between items-center text-sm font-semibold text-[#544434]">
                      <span>Subtotal Menudeo:</span>
                      <span className="font-bold text-[#877362] line-through">
                        ${rawSubtotal.toLocaleString()} MXN
                      </span>
                    </div>
                  )}

                  {isWholesale && (
                    <div className="flex justify-between items-center text-sm font-bold text-[#3C6A05] bg-[#EDF5E5]/60 p-2 rounded-lg border border-[#B8F081]/50">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Ahorro por Mayoreo (10% en 15+ pzas):</span>
                      </span>
                      <span>-${wholesaleDiscount.toLocaleString()} MXN</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-sm font-semibold text-[#544434]">
                    <span>Costo de Envío:</span>
                    <span
                      className={`font-extrabold ${
                        totalBottles >= minBottlesForFreeShipping
                          ? 'text-[#5B8C2A]'
                          : 'text-[#8A5100]'
                      }`}
                    >
                      {totalBottles >= minBottlesForFreeShipping
                        ? '¡GRATIS en Cocula y sus alrededores!'
                        : 'Mínimo 10 botellas para envío gratis'}
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline pt-3 border-t border-[#FFF1EA]">
                    <span className="text-lg font-black text-[#311302]">Total a Pagar:</span>
                    <div className="text-right">
                      <span className="text-3xl sm:text-4xl font-black text-[#8A5100]">
                        ${totalPrice.toLocaleString()} MXN
                      </span>
                      {isWholesale && (
                        <span className="block text-[11px] font-bold text-[#3C6A05]">
                          ¡Tarifa de Mayoreo incluida!
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Formas de Pago Aceptadas al Entregar */}
                <div className="bg-[#FFF8F5] p-3.5 rounded-xl border border-[#FFE3D4]">
                  <span className="block text-[10px] font-black uppercase tracking-wider text-[#8A5100] mb-2">
                    FORMAS DE PAGO ACEPTADAS AL ENTREGAR:
                  </span>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-[#311302]">
                    <div className="flex items-center gap-1.5">
                      <Banknote className="w-4 h-4 text-[#5B8C2A]" />
                      <span>Efectivo contra entrega</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-[#8A5100]" />
                      <span>Transferencia SPEI</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-[#D92525]" />
                      <span>Depósito OXXO</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Delivery Form & WhatsApp Trigger */}
            <div className="lg:col-span-5 p-6 sm:p-10 bg-[#FFFDF7] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-5 h-5 text-[#8A5100]" />
                  <h3 className="text-xl font-black text-[#311302]">Datos para tu Entrega</h3>
                </div>
                <p className="text-xs text-[#544434] mb-6 leading-relaxed">
                  Ingresa tus datos exactos para generar la orden pre-redactada y enviarla con un solo tap a nuestro WhatsApp de atención.
                </p>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-[#311302] mb-1">
                      NOMBRE COMPLETO *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Ej. Carlos Mendoza"
                      className={`w-full px-4 py-2.5 rounded-xl border bg-white text-sm text-[#311302] outline-hidden transition-all ${
                        formErrors.fullName
                          ? 'border-[#D92525] focus:ring-2 focus:ring-[#D92525]/20 bg-red-50/30'
                          : 'border-[#EADBCE] focus:border-[#F39200] focus:ring-2 focus:ring-[#F39200]/20'
                      }`}
                    />
                    {formErrors.fullName && (
                      <span className="text-[11px] text-[#D92525] font-semibold mt-1 block">
                        {formErrors.fullName}
                      </span>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-[#311302] mb-1">
                      TELÉFONO MÓVIL *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Ej. 33 2041 4321"
                      className={`w-full px-4 py-2.5 rounded-xl border bg-white text-sm text-[#311302] outline-hidden transition-all ${
                        formErrors.phone
                          ? 'border-[#D92525] focus:ring-2 focus:ring-[#D92525]/20 bg-red-50/30'
                          : 'border-[#EADBCE] focus:border-[#F39200] focus:ring-2 focus:ring-[#F39200]/20'
                      }`}
                    />
                    {formErrors.phone && (
                      <span className="text-[11px] text-[#D92525] font-semibold mt-1 block">
                        {formErrors.phone}
                      </span>
                    )}
                  </div>

                  {/* Street & Colony 2 Cols */}
                  {/* Street and Number */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-[#311302] mb-1">
                      CALLE Y NÚMERO *
                    </label>
                    <input
                      type="text"
                      name="streetAndNumber"
                      value={formData.streetAndNumber}
                      onChange={handleInputChange}
                      placeholder="Ej. Hidalgo #45"
                      className={`w-full px-4 py-2.5 rounded-xl border bg-white text-sm text-[#311302] outline-hidden transition-all ${
                        formErrors.streetAndNumber
                          ? 'border-[#D92525] focus:ring-2 focus:ring-[#D92525]/20 bg-red-50/30'
                          : 'border-[#EADBCE] focus:border-[#F39200] focus:ring-2 focus:ring-[#F39200]/20'
                      }`}
                    />
                    {formErrors.streetAndNumber && (
                      <span className="text-[11px] text-[#D92525] font-semibold mt-1 block">
                        {formErrors.streetAndNumber}
                      </span>
                    )}
                  </div>

                  {/* Colony & Postal Code 2 Cols */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <div className="sm:col-span-8">
                      <label className="block text-xs font-black uppercase tracking-wider text-[#311302] mb-1">
                        COLONIA / BARRIO *
                      </label>
                      <input
                        type="text"
                        name="colony"
                        value={formData.colony}
                        onChange={handleInputChange}
                        placeholder="Ej. Centro / La Ascensión"
                        className={`w-full px-4 py-2.5 rounded-xl border bg-white text-sm text-[#311302] outline-hidden transition-all ${
                          formErrors.colony
                            ? 'border-[#D92525] focus:ring-2 focus:ring-[#D92525]/20 bg-red-50/30'
                            : 'border-[#EADBCE] focus:border-[#F39200] focus:ring-2 focus:ring-[#F39200]/20'
                        }`}
                      />
                      {formErrors.colony && (
                        <span className="text-[11px] text-[#D92525] font-semibold mt-1 block">
                          {formErrors.colony}
                        </span>
                      )}
                    </div>

                    <div className="sm:col-span-4">
                      <label className="block text-xs font-black uppercase tracking-wider text-[#311302] mb-1">
                        CÓDIGO POSTAL (C.P.)
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        maxLength={5}
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder="Ej. 48500"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#EADBCE] bg-white text-sm text-[#311302] focus:border-[#F39200] focus:ring-2 focus:ring-[#F39200]/20 outline-hidden transition-all placeholder:text-[#DAC2AE]"
                      />
                    </div>
                  </div>

                  {/* References */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-[#311302] mb-1">
                      PUEBLO / REFERENCIAS ESPECÍFICAS
                    </label>
                    <input
                      type="text"
                      name="references"
                      value={formData.references}
                      onChange={handleInputChange}
                      placeholder="Ej. Cocula (entre calle Zaragoza y Allende, portón café)"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#EADBCE] bg-white text-sm text-[#311302] focus:border-[#F39200] focus:ring-2 focus:ring-[#F39200]/20 outline-hidden transition-all"
                    />
                  </div>

                  {/* WhatsApp CTA Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="btn-primary-glow btn-icon-hover w-full py-4 px-6 rounded-2xl bg-[#F39200] hover:bg-[#E06800] text-[#311302] hover:text-white font-black text-base shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3 active:scale-98 cursor-pointer"
                    >
                      <Send className="w-5 h-5 fill-current transition-transform" />
                      <span>Pedir por WhatsApp (33 2041 4321)</span>
                    </button>
                    <p className="text-[11px] text-[#877362] text-center mt-3 font-medium">
                      Te responderemos al instante para confirmar horario y preparar tus hieleras térmicas.
                    </p>

                    {/* Alerta de Nuevos Sabores al Teléfono */}
                    {onOpenFlavorAlert && (
                      <div className="mt-4 p-3.5 bg-[#FFF8F5] border border-[#FFE3D4] rounded-2xl flex items-center justify-between gap-3 shadow-xs">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-[#FFF1EA] flex items-center justify-center shrink-0">
                            <BellRing className="w-4 h-4 text-[#F39200] animate-bounce" />
                          </div>
                          <div className="text-left">
                            <span className="block text-xs font-black text-[#311302]">
                              ¿Quieres probar antes que nadie?
                            </span>
                            <span className="block text-[11px] text-[#7A6A5C]">
                              Te avisamos a tu teléfono de nuevos sabores de temporada
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={onOpenFlavorAlert}
                          className="btn-subtle-lift px-3.5 py-2 rounded-xl bg-white border border-[#EADBCE] text-[#8A5100] hover:bg-[#FFF1EA] font-extrabold text-xs shadow-xs transition-all cursor-pointer whitespace-nowrap"
                        >
                          Avisarme
                        </button>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation & Guaranteed WhatsApp Dispatch Modal */}
      {orderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FFFFFF] border-2 border-[#F39200] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setOrderModalOpen(false)}
              className="btn-subtle-lift absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-2 rounded-full cursor-pointer"
              title="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EDF5E5] text-[#3C6A05] flex items-center justify-center">
                <MessageCircle className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-black text-[#311302]">¡Tu Pedido está Listo!</h3>
                <p className="text-xs text-[#544434]">Envía tu orden a nuestro número oficial de atención</p>
              </div>
            </div>

            {/* Order Preview Box */}
            <div className="bg-[#FFF8F5] border border-[#FFE3D4] rounded-2xl p-4 mb-5 max-h-[160px] overflow-y-auto text-xs font-mono text-[#311302] whitespace-pre-wrap">
              {rawMessage}
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5">
              <a
                href={mobileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp-glow btn-icon-hover w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
              >
                <MessageCircle className="w-5 h-5 fill-current transition-transform" />
                <span>Abrir en WhatsApp (App / Móvil)</span>
                <ExternalLink className="w-4 h-4 text-white/80" />
              </a>

              <a
                href={webUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary-glow btn-icon-hover w-full py-3 px-4 rounded-xl bg-[#F39200] hover:bg-[#E06800] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all active:scale-98"
              >
                <ExternalLink className="w-4 h-4 transition-transform" />
                <span>Abrir en WhatsApp Web (Computadora)</span>
              </a>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleCopyOrder}
                  className="btn-subtle-lift py-2.5 px-3 rounded-xl bg-[#FFF1EA] hover:bg-[#FFE3D4] text-[#8A5100] font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copied ? '¡Copiado!' : 'Copiar Texto'}</span>
                </button>

                <a
                  href="tel:+523320414321"
                  className="btn-subtle-lift py-2.5 px-3 rounded-xl bg-[#FFF1EA] hover:bg-[#FFE3D4] text-[#8A5100] font-bold text-xs flex items-center justify-center gap-1.5 transition-all text-center"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Llamar Directo</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
