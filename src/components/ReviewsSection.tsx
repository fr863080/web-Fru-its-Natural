import React, { useState, useRef } from 'react';
import {
  Star,
  Camera,
  MessageSquare,
  ThumbsUp,
  Image as ImageIcon,
  CheckCircle2,
  X,
  UploadCloud,
  Sparkles,
} from 'lucide-react';
import { ProductReview } from '../types';
import { FLAVORS } from '../data/flavors';

interface ReviewsSectionProps {
  reviews: ProductReview[];
  onAddReview: (review: Omit<ProductReview, 'id' | 'createdAt' | 'likes'>) => void;
  onLikeReview: (reviewId: string) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  onAddReview,
  onLikeReview,
}) => {
  const [formOpen, setFormOpen] = useState(false);
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [authorName, setAuthorName] = useState('');
  const [favoriteFlavor, setFavoriteFlavor] = useState('Horchata Casera');
  const [comment, setComment] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formError, setFormError] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const ratingLabels: Record<number, string> = {
    1: '1 estrella • Regular',
    2: '2 estrellas • Aceptable',
    3: '3 estrellas • Bueno',
    4: '4 estrellas • Muy Bueno',
    5: '5 estrellas • ¡Excelente, recomendado!',
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFormError('La imagen debe pesar menos de 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim()) {
      setFormError('Por favor ingresa tu nombre');
      return;
    }
    if (!comment.trim()) {
      setFormError('Por favor escribe tu opinión sobre las aguas o la entrega');
      return;
    }

    onAddReview({
      authorName: authorName.trim(),
      rating,
      favoriteFlavor,
      comment: comment.trim(),
      imageUrl: imagePreview || undefined,
    });

    // Reset Form
    setAuthorName('');
    setComment('');
    setImagePreview(null);
    setRating(5);
    setFormError('');
    setFormOpen(false);
  };

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
      : null;

  return (
    <section id="opiniones" className="py-16 bg-[#FFF8F5] border-t border-[#FFE3D4]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-[800px] mx-auto mb-10">
          <span className="block text-xs font-black uppercase tracking-widest text-[#5B8C2A] mb-2">
            EXPERIENCIAS Y CALIDAD COMPROBADA
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#311302] tracking-tight mb-4">
            Opiniones y Fotos del Producto
          </h2>
          <p className="text-sm sm:text-base text-[#544434] leading-relaxed">
            Tu opinión es lo más valioso para seguir mejorando. Comparte tu calificación con estrellas y fotos de tus botellas o paquetes de aguas frescas en Cocula.
          </p>
        </div>

        {/* Rating Summary Bar */}
        <div className="bg-[#FFFFFF] border border-[#EADBCE] rounded-3xl p-6 sm:p-8 shadow-sm mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-16 h-16 rounded-2xl bg-[#FFF1EA] flex items-center justify-center text-[#8A5100] shrink-0 border border-[#FFB86E]/40">
              <Star className="w-8 h-8 fill-[#F39200] text-[#F39200]" />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <span className="text-3xl font-black text-[#311302]">
                  {averageRating ? `${averageRating} / 5` : '5.0'}
                </span>
                <div className="flex items-center gap-0.5 text-[#F39200]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-4 h-4 fill-current text-[#F39200]"
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#877362] font-semibold mt-0.5">
                {reviews.length === 0
                  ? 'Aún no hay calificaciones públicas registradas'
                  : `${reviews.length} ${reviews.length === 1 ? 'opinión de cliente' : 'opiniones de clientes'}`}
              </p>
            </div>
          </div>

          <button
            onClick={() => setFormOpen(true)}
            className="btn-primary-glow btn-icon-hover w-full md:w-auto px-6 py-3.5 rounded-full bg-[#F39200] hover:bg-[#E06800] text-white font-black text-sm flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer"
          >
            <Camera className="w-4 h-4 transition-transform" />
            <span>Dejar mi Opinión y Foto</span>
          </button>
        </div>

        {/* Review Form Modal */}
        {formOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
            <div className="bg-[#FFFFFF] border-2 border-[#F39200] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 my-8">
              <button
                onClick={() => setFormOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-2 rounded-full cursor-pointer"
                title="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-[#FFF1EA] text-[#8A5100] flex items-center justify-center">
                  <Star className="w-5 h-5 fill-[#F39200] text-[#F39200]" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#311302]">Calificar Producto</h3>
                  <p className="text-xs text-[#544434]">Comparte tu opinión sincera y foto de tu entrega</p>
                </div>
              </div>

              {formError && (
                <div className="mb-4 p-3 bg-[#FFDAD6] border border-[#FF867A] text-[#820009] rounded-xl text-xs font-bold">
                  {formError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Star Rating Picker */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#311302] mb-1.5">
                    CALIFICACIÓN CON ESTRELLAS *
                  </label>
                  <div className="flex items-center gap-2 bg-[#FFFDF7] p-3 rounded-2xl border border-[#EADBCE]">
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const active = (hoverRating || rating) >= star;
                        return (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="p-1 transition-transform hover:scale-120 cursor-pointer"
                            aria-label={`${star} estrellas`}
                          >
                            <Star
                              className={`w-7 h-7 ${
                                active
                                  ? 'fill-[#F39200] text-[#F39200]'
                                  : 'text-gray-300'
                              } transition-colors`}
                            />
                          </button>
                        );
                      })}
                    </div>
                    <span className="text-xs font-bold text-[#8A5100] ml-2">
                      {ratingLabels[rating]}
                    </span>
                  </div>
                </div>

                {/* Author Name */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#311302] mb-1">
                    TU NOMBRE O APODO *
                  </label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Ej. María Elena / Familia González"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EADBCE] bg-white text-sm text-[#311302] focus:border-[#F39200] focus:ring-2 focus:ring-[#F39200]/20 outline-hidden"
                  />
                </div>

                {/* Product / Flavor Tried */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#311302] mb-1">
                    SABOR O PAQUETE PROBADO
                  </label>
                  <select
                    value={favoriteFlavor}
                    onChange={(e) => setFavoriteFlavor(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EADBCE] bg-white text-sm text-[#311302] focus:border-[#F39200] outline-hidden cursor-pointer"
                  >
                    {FLAVORS.map((f) => (
                      <option key={f.id} value={f.name}>
                        {f.name} (Botella individual)
                      </option>
                    ))}
                    <option value="Paquete 10 Botellas">Paquete 10 Botellas Familiar</option>
                    <option value="Paquete 50 Botellas">Paquete 50 Botellas Fiesta</option>
                    <option value="Paquete 100 Botellas">Paquete 100 Botellas Negocios</option>
                    <option value="Surtido Variado de Sabores">Surtido Variado</option>
                  </select>
                </div>

                {/* Comment Textarea */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#311302] mb-1">
                    TU OPINIÓN DEL PRODUCTO *
                  </label>
                  <textarea
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Cuéntanos qué te pareció el sabor, la temperatura del frío, la entrega y si lo recomiendas a la comunidad..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EADBCE] bg-white text-sm text-[#311302] focus:border-[#F39200] focus:ring-2 focus:ring-[#F39200]/20 outline-hidden resize-none"
                  />
                </div>

                {/* Photo Upload Zone */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#311302] mb-1">
                    FOTO DEL PAQUETE O MUESTRA (OPCIONAL)
                  </label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                  {imagePreview ? (
                    <div className="relative rounded-2xl overflow-hidden border border-[#EADBCE] bg-[#FFF1EA] max-h-48 flex items-center justify-center group">
                      <img
                        src={imagePreview}
                        alt="Vista previa de foto de producto"
                        className="w-full h-44 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setImagePreview(null)}
                        className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white p-1.5 rounded-full cursor-pointer"
                        title="Quitar foto"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-[#FFE3D4] hover:border-[#F39200] rounded-2xl p-4 text-center bg-[#FFFDF7] hover:bg-[#FFF8F5] transition-all cursor-pointer"
                    >
                      <UploadCloud className="w-8 h-8 mx-auto text-[#8A5100] mb-2" />
                      <span className="block text-xs font-bold text-[#311302]">
                        Haz clic aquí para adjuntar una foto de tus aguas o hielera
                      </span>
                      <span className="text-[11px] text-gray-400">
                        PNG, JPG o WEBP (máximo 5MB)
                      </span>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="btn-secondary-glow btn-icon-hover w-full py-3.5 px-6 rounded-2xl bg-[#5B8C2A] hover:bg-[#3C6A05] text-white font-black text-sm shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 transition-transform" />
                    <span>Publicar mi Opinión y Calificación</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Reviews List or Empty State */}
        {reviews.length === 0 ? (
          <div className="text-center py-14 px-6 bg-[#FFFFFF] border-2 border-dashed border-[#FFE3D4] rounded-3xl max-w-[800px] mx-auto shadow-xs">
            <div className="w-16 h-16 rounded-full bg-[#FFF1EA] flex items-center justify-center text-[#8A5100] mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-[#8A5100]" />
            </div>
            <h3 className="text-xl font-black text-[#311302] mb-2">
              Aún no hay opiniones registradas
            </h3>
            <p className="text-xs sm:text-sm text-[#544434] max-w-md mx-auto mb-6 leading-relaxed">
              Este apartado está listo para que las primeras personas que reciban sus aguas frescas en Cocula compartan su foto del paquete y su calificación sincera.
            </p>
            <button
              onClick={() => setFormOpen(true)}
              className="btn-primary-glow btn-icon-hover inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F39200] hover:bg-[#E06800] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-98 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 transition-transform" />
              <span>Sé el primero en calificar</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-[#FFFFFF] border border-[#EADBCE] rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Reviewer Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-full bg-[#FFF1EA] text-[#8A5100] font-black text-xs flex items-center justify-center shrink-0 border border-[#FFB86E]/40">
                        {rev.authorName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-[#311302]">
                          {rev.authorName}
                        </h4>
                        <span className="text-[11px] text-[#877362] block">
                          {rev.createdAt}
                        </span>
                      </div>
                    </div>

                    {/* Stars */}
                    <div className="flex items-center gap-0.5 text-[#F39200]">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3.5 h-3.5 ${
                            star <= rev.rating
                              ? 'fill-[#F39200] text-[#F39200]'
                              : 'text-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Flavor Badge */}
                  {rev.favoriteFlavor && (
                    <div className="mb-3">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#EDF5E5] text-[#3C6A05] border border-[#B8F081]">
                        {rev.favoriteFlavor}
                      </span>
                    </div>
                  )}

                  {/* Comment */}
                  <p className="text-xs sm:text-[13px] text-[#544434] leading-relaxed mb-4">
                    "{rev.comment}"
                  </p>

                  {/* Attached Photo */}
                  {rev.imageUrl && (
                    <div className="mb-4">
                      <div
                        onClick={() => setSelectedPhoto(rev.imageUrl || null)}
                        className="rounded-xl overflow-hidden border border-[#EADBCE] cursor-pointer hover:opacity-90 transition-opacity max-h-48 group relative"
                      >
                        <img
                          src={rev.imageUrl}
                          alt={`Foto de producto de ${rev.authorName}`}
                          className="w-full h-36 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-bold gap-1">
                          <ImageIcon className="w-4 h-4" />
                          <span>Ver en grande</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Helpful Reaction Bar */}
                <div className="pt-3 border-t border-[#FFF1EA] flex items-center justify-between text-xs text-[#877362]">
                  <span className="text-[11px] font-medium">Cliente Verificado de Cocula</span>
                  <button
                    onClick={() => onLikeReview(rev.id)}
                    className="btn-subtle-lift flex items-center gap-1.5 text-xs font-bold text-[#8A5100] hover:text-[#5B8C2A] p-1.5 rounded-lg transition-all cursor-pointer"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 transition-transform" />
                    <span>Útil ({rev.likes})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for viewing photo in full size */}
        {selectedPhoto && (
          <div
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs cursor-pointer"
          >
            <div className="relative max-w-2xl max-h-[85vh] overflow-hidden rounded-2xl bg-white p-2">
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 bg-black/70 hover:bg-black text-white p-2 rounded-full cursor-pointer z-10"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={selectedPhoto}
                alt="Foto de producto en grande"
                className="max-h-[80vh] w-auto mx-auto object-contain rounded-xl"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
