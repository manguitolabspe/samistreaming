import React, {useEffect, useState} from 'react';
import {
  Check,
  ChevronDown,
  Clock,
  Info,
  Plus,
  Send,
  Share2,
  ShieldCheck,
  X,
} from 'lucide-react';
import {CATEGORY_MAP, type Product, type ProductPlan} from '../data/catalog';
import {
  buildProductWhatsAppUrl,
  formatPrice,
  shareOrCopyLink,
  type InquiryItem,
} from '../utils/whatsapp';
import {ProductArtwork, WhatsAppIcon} from './BrandMark';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  inquiryKeys: Set<string>;
  onToggleInquiry: (item: InquiryItem) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  inquiryKeys,
  onToggleInquiry,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<ProductPlan | null>(null);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [shareState, setShareState] = useState<'idle' | 'copied'>('idle');

  useEffect(() => {
    if (product) {
      setSelectedPlan(product.plans[0] ?? null);
      setOpenFaqIdx(0);
      setShareState('idle');
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  const activePlan = selectedPlan ?? product.plans[0];
  const activePrice = activePlan ? activePlan.price : product.price;
  const activePreviousPrice = activePlan ? activePlan.previousPrice : product.previousPrice;
  const activeDuration = activePlan ? activePlan.duration : product.duration;
  const activePlanName = activePlan ? activePlan.name : product.duration;
  const category = CATEGORY_MAP[product.categoryId];
  const inquiryKey = `${product.id}::${activePlan ? activePlan.id : 'base'}`;
  const isInInquiry = inquiryKeys.has(inquiryKey);

  const savings =
    activePrice !== null &&
    activePreviousPrice &&
    activePreviousPrice > activePrice
      ? activePreviousPrice - activePrice
      : 0;

  const whatsappUrl = buildProductWhatsAppUrl(
    product.name,
    activePlan ? activePlan.name : undefined,
    formatPrice(activePrice)
  );

  const handleShare = async () => {
    const result = await shareOrCopyLink({
      title: `${product.name} — Sami Streaming`,
      text:
        activePrice !== null
          ? `Mira ${product.name} desde ${formatPrice(activePrice)} en Sami Streaming`
          : `Mira ${product.name} disponible en Sami Streaming`,
      hash: `producto=${product.id}`,
    });
    if (result === 'copied') {
      setShareState('copied');
      window.setTimeout(() => setShareState('idle'), 2200);
    }
  };

  const handleTogglePlanInquiry = () => {
    onToggleInquiry({
      key: inquiryKey,
      productId: product.id,
      productName: product.name,
      planName: activePlanName,
      price: activePrice,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-[#02050B]/80 backdrop-blur-sm md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-detail-title"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col w-full max-w-4xl max-h-[92vh] md:max-h-[88vh] rounded-t-3xl md:rounded-3xl bg-[#0D1426] border border-white/10 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Handle */}
        <div className="md:hidden pt-3 pb-1 flex justify-center">
          <div className="w-10 h-1.5 rounded-full bg-white/20" />
        </div>

        {/* Sticky Top Header */}
        <div className="flex items-center justify-between gap-3 px-5 py-3.5 md:px-7 md:py-4 border-b border-white/[0.08] bg-[#0D1426]/95 backdrop-blur-md">
          <div className="min-w-0">
            <p className="text-xs text-[#94A3B8] truncate">
              <span className="text-[#3B82F6] font-medium">{category.name}</span>
              <span className="mx-1.5" aria-hidden="true">·</span>
              <span
                className={
                  product.availability === 'Disponible' ? 'text-[#10B981]' : 'text-amber-300'
                }
              >
                {product.availability}
              </span>
            </p>
            <h2
              id="product-detail-title"
              className="font-display text-lg md:text-xl font-bold text-[#F8FAFC] truncate"
            >
              {product.name}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleShare}
              aria-label={`Compartir enlace de ${product.name}`}
              className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3 rounded-xl border border-white/10 bg-white/[0.04] text-xs font-medium text-[#CBD5E1] hover:text-white hover:border-white/20 transition-colors cursor-pointer"
            >
              {shareState === 'copied' ? (
                <>
                  <Check className="w-4 h-4 text-[#10B981]" />
                  <span>Copiado</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Compartir</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar detalle del producto"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[#94A3B8] hover:text-white hover:border-white/20 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-5 py-5 md:px-7 md:py-6 space-y-7">
          {/* Top Split: Artwork + Contiguous Plan & Pricing Module */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4">
              <ProductArtwork product={product} size="detail" />

              <div className="rounded-2xl bg-[#131C31] border border-white/[0.06] p-4 space-y-2.5 text-sm">
                <div className="flex items-center gap-2 text-[#F8FAFC] font-medium">
                  <Send className="w-4 h-4 text-[#3B82F6] shrink-0" />
                  <span>Entrega y pago por WhatsApp</span>
                </div>
                <p className="text-xs md:text-sm text-[#94A3B8] leading-relaxed">
                  {product.deliveryMode} Coordinamos tu medio de pago (billeteras digitales o transferencia) solo después de confirmar disponibilidad.
                </p>
              </div>
            </div>

            <div className="md:col-span-7 space-y-5">
              <div>
                <p className="text-sm md:text-[15px] text-[#CBD5E1] leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price & Duration Summary */}
              <div className="rounded-2xl bg-[#131C31] border border-white/[0.08] p-4 md:p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <div>
                    <span className="text-xs text-[#94A3B8]">Precio del plan seleccionado</span>
                    <div className="mt-1 flex flex-wrap items-baseline gap-2.5">
                      <span className="font-display text-3xl font-extrabold text-[#F8FAFC] tabular-nums">
                        {formatPrice(activePrice)}
                      </span>
                      {activePrice !== null &&
                        activePreviousPrice &&
                        activePreviousPrice > activePrice && (
                          <span className="text-sm text-[#94A3B8] line-through tabular-nums">
                            {formatPrice(activePreviousPrice)}
                          </span>
                        )}
                      {savings > 0 && (
                        <span className="text-xs font-semibold text-[#10B981] tabular-nums">
                          Ahorras {formatPrice(savings)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs md:text-sm text-[#94A3B8]">
                    <Clock className="w-4 h-4 text-[#3B82F6]" />
                    <span>
                      Duración: <strong className="text-[#F8FAFC] font-medium">{activeDuration}</strong>
                    </span>
                  </div>
                </div>

                {/* Plan Selector */}
                {product.plans.length > 0 && (
                  <div className="mt-5">
                    <p className="text-xs font-medium text-[#94A3B8] mb-2.5">
                      Selecciona tu plan
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      {product.plans.map((plan) => {
                        const isSelected = activePlan?.id === plan.id;
                        return (
                          <button
                            key={plan.id}
                            type="button"
                            onClick={() => setSelectedPlan(plan)}
                            className={`flex items-center justify-between gap-3 w-full min-h-[48px] rounded-xl px-4 py-3 text-left transition-all cursor-pointer border ${
                              isSelected
                                ? 'bg-[#2563EB]/20 border-[#3B82F6] text-[#F8FAFC]'
                                : 'bg-[#0B1222] border-white/[0.07] text-[#CBD5E1] hover:border-white/20'
                            }`}
                          >
                            <div className="min-w-0">
                              <span className="block text-sm font-semibold truncate">
                                {plan.name}
                              </span>
                              <span className="block text-xs text-[#94A3B8]">
                                Duración: {plan.duration}
                              </span>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="block font-display text-base font-bold text-[#F8FAFC] tabular-nums">
                                {formatPrice(plan.price)}
                              </span>
                              {plan.price !== null &&
                                plan.previousPrice &&
                                plan.previousPrice > plan.price && (
                                  <span className="block text-[11px] text-[#94A3B8] line-through tabular-nums">
                                    {formatPrice(plan.previousPrice)}
                                  </span>
                                )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Desktop Primary WhatsApp CTA + Multi-Inquiry Button */}
                <div className="hidden md:block mt-5 space-y-2.5">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 min-h-[52px] w-full rounded-xl bg-[#10B981] px-6 py-3.5 text-sm font-bold text-[#04140E] hover:bg-[#34D399] active:scale-[0.99] transition-all shadow-lg shadow-[#10B981]/20"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                    <span>SOLICITAR POR WHATSAPP</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleTogglePlanInquiry}
                    className={`inline-flex items-center justify-center gap-2 min-h-[44px] w-full rounded-xl border px-4 py-2.5 text-xs font-semibold transition-colors cursor-pointer ${
                      isInInquiry
                        ? 'border-[#3B82F6] bg-[#2563EB]/20 text-[#93C5FD]'
                        : 'border-white/10 bg-white/[0.03] text-[#CBD5E1] hover:border-[#3B82F6]/50 hover:text-white'
                    }`}
                  >
                    {isInInquiry ? (
                      <>
                        <Check className="w-4 h-4 text-[#3B82F6]" />
                        <span>Plan agregado a tu consulta múltiple</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Sumar este plan para consultar varios servicios juntos</span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-[#94A3B8]">
                    Se abrirá WhatsApp con tu producto, plan y precio ya incluidos.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Features & What's Included */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-white/[0.06]">
            <div>
              <h3 className="font-display text-base font-bold text-[#F8FAFC]">
                Características principales
              </h3>
              <ul className="mt-3 space-y-2.5">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-[#CBD5E1]">
                    <Check className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-display text-base font-bold text-[#F8FAFC]">
                Qué incluye
              </h3>
              <ul className="mt-3 space-y-2.5">
                {product.includes.map((inc, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-[#CBD5E1]">
                    <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Usage Conditions & Warranty */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-white/[0.06]">
            <div>
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-[#3B82F6]" />
                <h3 className="font-display text-base font-bold text-[#F8FAFC]">
                  Condiciones de uso
                </h3>
              </div>
              <ul className="mt-3 space-y-2 text-sm text-[#94A3B8]">
                {product.usageConditions.map((cond, idx) => (
                  <li key={idx} className="leading-relaxed">
                    • {cond}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                <h3 className="font-display text-base font-bold text-[#F8FAFC]">
                  Garantía aplicable
                </h3>
              </div>
              <p className="mt-3 text-sm text-[#94A3B8] leading-relaxed">
                {product.warranty}
              </p>
            </div>
          </div>

          {/* Product-Specific FAQs */}
          {product.faqs.length > 0 && (
            <div className="pt-2 border-t border-white/[0.06]">
              <h3 className="font-display text-base font-bold text-[#F8FAFC]">
                Preguntas frecuentes sobre {product.name}
              </h3>
              <div className="mt-3 divide-y divide-white/[0.07] rounded-2xl bg-[#131C31] border border-white/[0.06] overflow-hidden">
                {product.faqs.map((faq, idx) => {
                  const isOpen = openFaqIdx === idx;
                  return (
                    <div key={idx}>
                      <button
                        type="button"
                        onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                        className="flex items-center justify-between gap-3 w-full min-h-[48px] px-4 py-3.5 text-left text-sm font-medium text-[#F8FAFC] hover:bg-white/[0.02] cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#94A3B8] shrink-0 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-[#3B82F6]' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 text-sm text-[#94A3B8] leading-relaxed">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Sticky Mobile Bottom CTA Bar */}
        <div className="md:hidden border-t border-white/10 bg-[#0D1426]/95 backdrop-blur-md p-4 pb-safe space-y-2.5">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-[#94A3B8] truncate">
              {activePlan ? activePlan.name : product.name}
            </span>
            <span className="font-display text-lg font-bold text-[#F8FAFC] tabular-nums shrink-0">
              {formatPrice(activePrice)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleTogglePlanInquiry}
              aria-label={
                isInInquiry ? 'Quitar de consulta múltiple' : 'Sumar a consulta múltiple'
              }
              className={`inline-flex items-center justify-center gap-1.5 min-h-[48px] px-3.5 rounded-xl border text-xs font-semibold shrink-0 transition-colors cursor-pointer ${
                isInInquiry
                  ? 'border-[#3B82F6] bg-[#2563EB]/20 text-[#93C5FD]'
                  : 'border-white/15 bg-white/[0.04] text-[#CBD5E1]'
              }`}
            >
              {isInInquiry ? (
                <>
                  <Check className="w-4 h-4 text-[#3B82F6]" />
                  <span>Sumado</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Sumar</span>
                </>
              )}
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 min-h-[48px] rounded-xl bg-[#10B981] px-4 py-3 text-sm font-bold text-[#04140E] active:scale-[0.98] transition-transform shadow-lg shadow-[#10B981]/20 whitespace-nowrap"
            >
              <WhatsAppIcon className="w-5 h-5 shrink-0" />
              <span>SOLICITAR POR WHATSAPP</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
