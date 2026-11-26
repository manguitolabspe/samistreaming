import React, {useState} from 'react';
import {CalendarClock, Check, Share2} from 'lucide-react';
import {COMBOS, PROMOTIONS} from '../data/catalog';
import {
  buildComboWhatsAppUrl,
  buildPromoWhatsAppUrl,
  formatPrice,
  shareOrCopyLink,
} from '../utils/whatsapp';
import {WhatsAppIcon} from './BrandMark';
import {ResilientImage} from './ResilientImage';

export const PromotionsView: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleShareOffer = async (id: string, title: string, price: number) => {
    const result = await shareOrCopyLink({
      title: `${title} — Sami Streaming`,
      text: `Mira esta oferta en Sami Streaming: ${title} a ${formatPrice(price)}`,
      hash: 'promotions',
    });
    if (result === 'copied') {
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(null), 2200);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 md:pt-10 space-y-14">
      {/* SECTION 1: PROMOCIONES ESPECIALES */}
      <section aria-labelledby="promos-title">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold text-[#10B981]">Ofertas vigentes</p>
          <h1
            id="promos-title"
            className="mt-1 font-display text-3xl sm:text-4xl font-extrabold text-[#F8FAFC]"
          >
            PROMOCIONES ESPECIALES
          </h1>
          <p className="mt-2.5 text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            Descubre nuestras ofertas y aprovecha los servicios digitales que tenemos para ti.
          </p>
        </div>

        <div className="mt-7 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {PROMOTIONS.map((promo) => {
            const savings =
              promo.previousPrice && promo.previousPrice > promo.promoPrice
                ? promo.previousPrice - promo.promoPrice
                : 0;
            const isCopied = copiedId === promo.id;

            return (
              <article
                key={promo.id}
                className="flex flex-col justify-between overflow-hidden rounded-2xl bg-[#131C31] border border-white/[0.08] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#3B82F6]/45"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <ResilientImage
                      src={promo.imageUrl}
                      alt={promo.name}
                      className="w-full h-full object-cover"
                      fallbackTitle={promo.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#131C31] via-[#131C31]/25 to-transparent" />
                  </div>

                  <div className="p-5 sm:p-6 -mt-5 relative z-10">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#94A3B8]">
                      <span className="font-semibold text-[#3B82F6]">{promo.categoryLabel}</span>
                      {promo.validity && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="inline-flex items-center gap-1 text-[#CBD5E1]">
                            <CalendarClock className="w-3.5 h-3.5 text-[#10B981]" />
                            {promo.validity}
                          </span>
                        </>
                      )}
                    </div>

                    <h2 className="mt-2 font-display text-xl font-bold text-[#F8FAFC]">
                      {promo.name}
                    </h2>

                    <p className="mt-2 text-sm text-[#94A3B8] leading-relaxed">
                      {promo.description}
                    </p>

                    <ul className="mt-4 space-y-2">
                      {promo.highlights.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#CBD5E1]">
                          <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-4 border-t border-white/[0.07]">
                  <div className="flex items-end justify-between gap-2">
                    <div>
                      <span className="block text-xs text-[#94A3B8]">Precio promocional</span>
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span className="font-display text-2xl font-extrabold text-[#F8FAFC] tabular-nums">
                          {formatPrice(promo.promoPrice)}
                        </span>
                        {promo.previousPrice && promo.previousPrice > promo.promoPrice && (
                          <span className="text-sm text-[#94A3B8] line-through tabular-nums">
                            {formatPrice(promo.previousPrice)}
                          </span>
                        )}
                      </div>
                      {savings > 0 && (
                        <span className="text-xs font-semibold text-[#10B981] tabular-nums">
                          Ahorras {formatPrice(savings)}
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleShareOffer(promo.id, promo.name, promo.promoPrice)}
                      aria-label={`Compartir ${promo.name}`}
                      className="inline-flex items-center justify-center gap-1.5 min-h-[42px] px-3 rounded-xl border border-white/10 bg-white/[0.03] text-xs font-medium text-[#CBD5E1] hover:text-white hover:border-white/20 transition-colors cursor-pointer shrink-0"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-4 h-4 text-[#10B981]" />
                          <span>Copiado</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-4 h-4" />
                          <span>Compartir</span>
                        </>
                      )}
                    </button>
                  </div>

                  <a
                    href={buildPromoWhatsAppUrl(promo.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center justify-center gap-2 min-h-[46px] w-full rounded-xl bg-[#10B981] px-5 py-3 text-sm font-bold text-[#04140E] hover:bg-[#34D399] active:scale-[0.98] transition-all whitespace-nowrap"
                  >
                    <WhatsAppIcon className="w-4 h-4 shrink-0" />
                    <span>Consultar por WhatsApp</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* SECTION 2: COMBOS DISPONIBLES */}
      <section aria-labelledby="combos-title" className="pt-4 border-t border-white/[0.07]">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold text-[#3B82F6]">Packs combinados</p>
          <h2
            id="combos-title"
            className="mt-1 font-display text-2xl sm:text-3xl font-extrabold text-[#F8FAFC]"
          >
            Combos disponibles
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#94A3B8]">
            Ahorra contratando tus servicios digitales juntos en un solo pedido por WhatsApp.
          </p>
        </div>

        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-6">
          {COMBOS.map((combo) => {
            const savings = combo.previousPrice - combo.promoPrice;
            const isCopied = copiedId === combo.id;
            return (
              <article
                key={combo.id}
                className="flex flex-col justify-between rounded-2xl bg-[#131C31] border border-white/[0.08] p-5 sm:p-6 transition-all duration-200 hover:border-[#3B82F6]/45"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#94A3B8]">
                    <span className="font-semibold text-[#3B82F6]">{combo.tagline}</span>
                    <span>Duración: {combo.duration}</span>
                  </div>

                  <h3 className="mt-2 font-display text-xl font-bold text-[#F8FAFC]">
                    {combo.name}
                  </h3>

                  <p className="mt-2 text-sm text-[#94A3B8] leading-relaxed">
                    {combo.description}
                  </p>

                  <div className="mt-4 rounded-xl bg-[#0B1222] border border-white/[0.06] p-4">
                    <p className="text-xs font-semibold text-[#94A3B8] mb-2.5">
                      Servicios incluidos en este combo
                    </p>
                    <ul className="space-y-2">
                      {combo.services.map((service, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-[#F8FAFC]">
                          <Check className="w-4 h-4 text-[#10B981] shrink-0" />
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-white/[0.07] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-display text-2xl font-extrabold text-[#F8FAFC] tabular-nums">
                        {formatPrice(combo.promoPrice)}
                      </span>
                      <span className="text-sm text-[#94A3B8] line-through tabular-nums">
                        {formatPrice(combo.previousPrice)}
                      </span>
                    </div>
                    {savings > 0 && (
                      <span className="text-xs font-medium text-[#10B981] tabular-nums">
                        Ahorras {formatPrice(savings)}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleShareOffer(combo.id, combo.name, combo.promoPrice)}
                      aria-label={`Compartir ${combo.name}`}
                      className="inline-flex items-center justify-center min-h-[46px] min-w-[46px] rounded-xl border border-white/10 bg-white/[0.03] text-[#CBD5E1] hover:text-white hover:border-white/20 transition-colors cursor-pointer shrink-0"
                    >
                      {isCopied ? (
                        <Check className="w-4 h-4 text-[#10B981]" />
                      ) : (
                        <Share2 className="w-4 h-4" />
                      )}
                    </button>

                    <a
                      href={buildComboWhatsAppUrl(combo.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 min-h-[46px] rounded-xl bg-[#10B981] px-5 py-2.5 text-sm font-bold text-[#04140E] hover:bg-[#34D399] active:scale-[0.98] transition-all whitespace-nowrap"
                    >
                      <WhatsAppIcon className="w-4 h-4 shrink-0" />
                      <span>Solicitar combo</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
};
