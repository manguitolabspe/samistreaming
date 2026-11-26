import React, {useState} from 'react';
import {ChevronDown, ExternalLink, FileCheck2} from 'lucide-react';
import {CATEGORIES, GENERAL_FAQS, SOFTOPIA_PARTNER, type CategoryId} from '../data/catalog';
import {
  buildGeneralWhatsAppUrl,
  WHATSAPP_DISPLAY_NUMBER,
} from '../utils/whatsapp';
import {SamiFullLogo, WhatsAppIcon} from './BrandMark';
import type {AppView} from './NavbarAndBottomNav';
import {PWAInstallButton} from './PWAInstallBanner';

export const FaqView: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(GENERAL_FAQS[0].id);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-6 md:pt-10 space-y-8">
      <div>
        <p className="text-xs font-semibold text-[#3B82F6]">Centro de ayuda</p>
        <h1 className="mt-1 font-display text-3xl sm:text-4xl font-extrabold text-[#F8FAFC]">
          Preguntas frecuentes
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#94A3B8] leading-relaxed">
          Respuestas claras sobre cómo consultar, pagar, recibir y renovar tus servicios digitales.
        </p>
      </div>

      <div className="divide-y divide-white/[0.08] rounded-2xl bg-[#131C31] border border-white/[0.08] overflow-hidden">
        {GENERAL_FAQS.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div key={faq.id}>
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                aria-expanded={isOpen}
                className="flex items-center justify-between gap-4 w-full min-h-[56px] px-5 sm:px-6 py-4 text-left font-display text-sm sm:text-base font-bold text-[#F8FAFC] hover:bg-white/[0.02] transition-colors cursor-pointer"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#94A3B8] shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#3B82F6]' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 sm:px-6 pb-5 space-y-4">
                  <p className="text-sm sm:text-[15px] text-[#CBD5E1] leading-relaxed">
                    {faq.answer}
                  </p>
                  {faq.showWhatsAppCta && (
                    <a
                      href={buildGeneralWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 min-h-[42px] rounded-xl bg-[#10B981]/15 border border-[#10B981]/40 px-4 py-2 text-xs sm:text-sm font-semibold text-[#10B981] hover:bg-[#10B981] hover:text-[#04140E] transition-colors"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      <span>Escribir por WhatsApp</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Personalized Support Card */}
      <div className="rounded-2xl bg-gradient-to-r from-[#131C31] to-[#0E1E2B] border border-[#10B981]/30 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-lg font-bold text-[#F8FAFC]">
            ¿Necesitas atención personalizada?
          </h2>
          <p className="mt-1 text-sm text-[#94A3B8]">
            Escríbenos directamente a nuestro WhatsApp ({WHATSAPP_DISPLAY_NUMBER}) y te ayudamos al instante.
          </p>
        </div>
        <a
          href={buildGeneralWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 min-h-[46px] rounded-xl bg-[#10B981] px-5 py-2.5 text-sm font-bold text-[#04140E] hover:bg-[#34D399] transition-colors whitespace-nowrap shrink-0"
        >
          <WhatsAppIcon className="w-4 h-4" />
          <span>Ir a WhatsApp</span>
        </a>
      </div>
    </div>
  );
};

interface FooterProps {
  onNavigate: (view: AppView) => void;
  onSelectCategory: (cat: CategoryId) => void;
  onOpenLegal: (doc: 'terms' | 'privacy') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onSelectCategory,
  onOpenLegal,
}) => {
  return (
    <footer className="mt-16 md:mt-24 border-t border-white/[0.08] bg-[#04070F] pb-36 md:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="flex items-center text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded-lg"
              aria-label="Ir al inicio de Sami Streaming"
            >
              <SamiFullLogo className="h-11 sm:h-12 w-auto shrink-0" />
            </button>
            <p className="text-sm text-[#94A3B8] leading-relaxed max-w-md">
              Sami Streaming es una plataforma de servicios digitales donde encuentras
              entretenimiento, productividad, herramientas de diseño y soluciones tecnológicas en un
              solo lugar.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={buildGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 min-h-[44px] rounded-xl bg-[#10B981] px-4 py-2.5 text-sm font-bold text-[#04140E] hover:bg-[#34D399] transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>{WHATSAPP_DISPLAY_NUMBER}</span>
              </a>
              <PWAInstallButton variant="footer" />
            </div>
          </div>

          {/* Categories Links */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="font-display text-sm font-bold text-[#F8FAFC]">Categorías</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    type="button"
                    onClick={() => {
                      if (cat.id === 'combos') {
                        onNavigate('promotions');
                      } else {
                        onSelectCategory(cat.id);
                      }
                    }}
                    className="text-sm text-[#94A3B8] hover:text-[#3B82F6] transition-colors cursor-pointer text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Commercial & Legal Links */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="font-display text-sm font-bold text-[#F8FAFC]">Información</h3>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('promotions')}
                  className="text-sm text-[#94A3B8] hover:text-[#3B82F6] transition-colors cursor-pointer"
                >
                  Promociones y combos
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('vip')}
                  className="text-sm text-[#94A3B8] hover:text-[#3B82F6] transition-colors cursor-pointer"
                >
                  Sami VIP (Revendedores)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('faq')}
                  className="text-sm text-[#94A3B8] hover:text-[#3B82F6] transition-colors cursor-pointer"
                >
                  Preguntas frecuentes
                </button>
              </li>
              <li>
                <a
                  href={buildGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#10B981] hover:underline"
                >
                  Atención por WhatsApp
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('terms')}
                  className="text-sm text-[#94A3B8] hover:text-[#3B82F6] transition-colors cursor-pointer"
                >
                  Términos y condiciones
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('privacy')}
                  className="text-sm text-[#94A3B8] hover:text-[#3B82F6] transition-colors cursor-pointer"
                >
                  Política de privacidad
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Softopia Perú — Ecosystem Cross-Link (Non-intrusive B2B value) */}
        <div className="mt-10 rounded-2xl bg-[#0D1426] border border-white/[0.08] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563EB]/15 border border-[#3B82F6]/30 text-[#3B82F6] shrink-0">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#3B82F6]">
                {SOFTOPIA_PARTNER.categoryLabel}
              </p>
              <p className="mt-0.5 font-display text-sm sm:text-base font-bold text-[#F8FAFC]">
                {SOFTOPIA_PARTNER.headline}
              </p>
              <p className="mt-0.5 text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                {SOFTOPIA_PARTNER.description}
              </p>
            </div>
          </div>

          <a
            href={SOFTOPIA_PARTNER.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 min-h-[44px] rounded-xl border border-[#3B82F6]/45 bg-[#2563EB]/15 px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#F8FAFC] hover:bg-[#2563EB] hover:border-[#3B82F6] transition-colors whitespace-nowrap shrink-0"
          >
            <span>{SOFTOPIA_PARTNER.ctaLabel}</span>
            <ExternalLink className="w-4 h-4 shrink-0" />
          </a>
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#64748B]">
          <p>© {new Date().getFullYear()} Sami Streaming. Catálogo digital de servicios.</p>
          <p>Precios y disponibilidad sujetos a confirmación por WhatsApp.</p>
        </div>
      </div>
    </footer>
  );
};
