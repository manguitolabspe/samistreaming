import React from 'react';
import {Check, ExternalLink, FileCheck2} from 'lucide-react';
import {MEDIA_ASSETS, SOFTOPIA_PARTNER, VIP_BENEFITS, VIP_LEVELS} from '../data/catalog';
import {buildVipWhatsAppUrl} from '../utils/whatsapp';
import {SamiLogoMark, WhatsAppIcon} from './BrandMark';
import {ResilientImage} from './ResilientImage';

export const SamiVipView: React.FC = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 md:pt-10 space-y-14">
      {/* VIP HERO */}
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#131C31] via-[#0D1528] to-[#080E1C] border border-[#2563EB]/30 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-2.5">
              <SamiLogoMark className="w-7 h-7 shrink-0" alt="" />
              <p className="text-xs sm:text-sm font-semibold text-[#3B82F6]">SAMI VIP</p>
            </div>
            <h1 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F8FAFC] leading-[1.1] [text-wrap:balance]">
              Lleva tu negocio digital al siguiente nivel.
            </h1>
            <p className="mt-4 max-w-xl text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
              Conviértete en distribuidor de servicios digitales y accede a beneficios especiales,
              precios preferenciales y oportunidades para desarrollar tu propio negocio.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={buildVipWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 min-h-[50px] rounded-xl bg-[#10B981] px-6 py-3 text-sm font-bold text-[#04140E] hover:bg-[#34D399] active:scale-[0.98] transition-all shadow-lg shadow-[#10B981]/20 whitespace-nowrap"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>QUIERO SER REVENDEDOR</span>
              </a>
            </div>
            <p className="mt-3 text-xs text-[#94A3B8]">
              Evaluamos cada solicitud directamente por WhatsApp para brindarte las condiciones adecuadas.
            </p>
          </div>

          <div className="lg:col-span-5 relative min-h-[220px] lg:min-h-full overflow-hidden border-t lg:border-t-0 lg:border-l border-white/[0.08]">
            <ResilientImage
              src={MEDIA_ASSETS.samiVipReseller}
              alt="Programa de revendedores Sami VIP"
              className="w-full h-full object-cover lg:h-full"
              fallbackTitle="Sami VIP"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#0D1528]/75 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* 6 BENEFITS */}
      <section aria-labelledby="vip-benefits-heading">
        <div className="max-w-2xl">
          <h2
            id="vip-benefits-heading"
            className="font-display text-2xl sm:text-3xl font-bold text-[#F8FAFC]"
          >
            Beneficios para distribuidores
          </h2>
          <p className="mt-1.5 text-sm sm:text-base text-[#94A3B8]">
            Herramientas y condiciones comerciales pensadas para impulsar tu crecimiento.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {VIP_BENEFITS.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-[#131C31] border border-white/[0.07] p-5 sm:p-6"
            >
              <span className="font-display text-xs font-bold text-[#3B82F6] tabular-nums">
                0{idx + 1}.
              </span>
              <h3 className="mt-2 font-display text-base font-bold text-[#F8FAFC]">
                {item.title}
              </h3>
              <p className="mt-1.5 text-sm text-[#94A3B8] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3 VIP LEVELS */}
      <section aria-labelledby="vip-levels-heading">
        <div className="max-w-2xl">
          <h2
            id="vip-levels-heading"
            className="font-display text-2xl sm:text-3xl font-bold text-[#F8FAFC]"
          >
            Niveles Sami VIP
          </h2>
          <p className="mt-1.5 text-sm sm:text-base text-[#94A3B8]">
            Elige el nivel que mejor se adapte a tu etapa actual y solicita información por WhatsApp.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
          {VIP_LEVELS.map((level) => (
            <article
              key={level.id}
              className={`flex flex-col justify-between rounded-2xl p-6 border transition-all ${
                level.recommended
                  ? 'bg-gradient-to-b from-[#172440] to-[#131C31] border-[#3B82F6]/60 shadow-[0_14px_36px_-16px_rgba(37,99,235,0.45)]'
                  : 'bg-[#131C31] border-white/[0.08]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display text-xl font-extrabold text-[#F8FAFC]">
                    {level.name}
                  </h3>
                  {level.recommended && (
                    <span className="text-xs font-semibold text-[#10B981]">
                      Más elegido
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm font-medium text-[#3B82F6]">{level.subtitle}</p>
                <p className="mt-3 text-sm text-[#94A3B8] leading-relaxed">
                  {level.description}
                </p>

                <ul className="mt-5 space-y-2.5 pt-4 border-t border-white/[0.07]">
                  {level.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-[#CBD5E1]">
                      <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.07]">
                <a
                  href={buildVipWhatsAppUrl(level.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2 min-h-[46px] w-full rounded-xl px-4 py-3 text-sm font-bold transition-all whitespace-nowrap ${
                    level.recommended
                      ? 'bg-[#10B981] text-[#04140E] hover:bg-[#34D399]'
                      : 'border border-white/15 bg-white/[0.04] text-[#F8FAFC] hover:border-[#10B981]/60 hover:text-[#10B981]'
                  }`}
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>QUIERO SER REVENDEDOR</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* B2B ECOSYSTEM CALLOUT: SOFTOPIA PERÚ */}
      <section aria-labelledby="softopia-vip-heading">
        <div className="rounded-3xl bg-gradient-to-r from-[#131C31] to-[#0D162B] border border-[#3B82F6]/30 p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4 max-w-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2563EB]/20 border border-[#3B82F6]/35 text-[#3B82F6] shrink-0">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#3B82F6]">
                {SOFTOPIA_PARTNER.categoryLabel}
              </p>
              <h2
                id="softopia-vip-heading"
                className="mt-1 font-display text-xl sm:text-2xl font-bold text-[#F8FAFC]"
              >
                Impulsa y formaliza tu negocio con {SOFTOPIA_PARTNER.name}
              </h2>
              <p className="mt-1.5 text-sm text-[#CBD5E1] leading-relaxed">
                {SOFTOPIA_PARTNER.description}
              </p>
            </div>
          </div>

          <a
            href={SOFTOPIA_PARTNER.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 min-h-[48px] rounded-xl bg-[#2563EB] px-6 py-3 text-sm font-bold text-white hover:bg-[#3B82F6] active:scale-[0.98] transition-all whitespace-nowrap shrink-0"
          >
            <span>{SOFTOPIA_PARTNER.ctaLabel}</span>
            <ExternalLink className="w-4 h-4 shrink-0" />
          </a>
        </div>
      </section>
    </div>
  );
};
