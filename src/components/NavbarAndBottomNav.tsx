import React from 'react';
import {HelpCircle, Home, LayoutGrid, Tag} from 'lucide-react';
import {buildGeneralWhatsAppUrl} from '../utils/whatsapp';
import {SamiFullLogo, WhatsAppIcon} from './BrandMark';

export type AppView = 'home' | 'catalog' | 'promotions' | 'vip' | 'faq';

interface NavigationProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

const DESKTOP_LINKS: {id: AppView; label: string}[] = [
  {id: 'home', label: 'Inicio'},
  {id: 'catalog', label: 'Catálogo'},
  {id: 'promotions', label: 'Promociones'},
  {id: 'vip', label: 'Sami VIP'},
  {id: 'faq', label: 'Preguntas'},
];

export const TopNavbar: React.FC<NavigationProps> = ({currentView, onNavigate}) => {
  return (
    <header className="sticky top-0 z-40 h-14 md:h-16 bg-[#060A14]/90 backdrop-blur-md border-b border-white/[0.08]">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4 md:gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="flex items-center text-left whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded-lg cursor-pointer"
          aria-label="Ir al inicio de Sami Streaming"
        >
          <SamiFullLogo className="h-9 md:h-10 w-auto shrink-0" />
        </button>

        {/* Zone 2: Desktop Navigation Links */}
        <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-7">
          {DESKTOP_LINKS.map((link) => {
            const isActive = currentView === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => onNavigate(link.id)}
                className={`relative py-1 text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive ? 'text-[#F8FAFC]' : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute left-0 right-0 -bottom-[19px] h-[2px] bg-[#3B82F6] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Desktop Primary WhatsApp CTA / Mobile Direct VIP & Help Access */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Mobile: expose Sami VIP & FAQ cleanly (WhatsApp is permanently highlighted in bottom bar) */}
          <button
            type="button"
            onClick={() => onNavigate('vip')}
            className={`md:hidden inline-flex items-center justify-center min-h-[40px] rounded-xl border px-3 py-1.5 text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentView === 'vip'
                ? 'bg-[#2563EB] border-[#3B82F6] text-white'
                : 'border-[#3B82F6]/40 bg-[#2563EB]/15 text-[#93C5FD] hover:bg-[#2563EB]/25'
            }`}
          >
            Sami VIP
          </button>

          <button
            type="button"
            onClick={() => onNavigate('faq')}
            aria-label="Preguntas frecuentes"
            className={`md:hidden inline-flex items-center justify-center min-h-[40px] min-w-[40px] rounded-xl border transition-colors shrink-0 cursor-pointer ${
              currentView === 'faq'
                ? 'bg-[#2563EB]/20 border-[#3B82F6] text-[#F8FAFC]'
                : 'border-white/10 bg-white/[0.03] text-[#94A3B8] hover:text-white'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Desktop: Primary WhatsApp CTA */}
          <a
            href={buildGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center justify-center gap-2 min-h-[42px] rounded-xl bg-[#10B981] px-4 py-2 text-sm font-bold text-[#04140E] hover:bg-[#34D399] active:scale-[0.98] transition-all whitespace-nowrap shrink-0"
          >
            <WhatsAppIcon className="w-4 h-4 shrink-0" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export const MobileBottomNav: React.FC<NavigationProps> = ({currentView, onNavigate}) => {
  return (
    <nav
      aria-label="Navegación móvil"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A101E]/95 backdrop-blur-lg border-t border-white/10 pb-safe"
    >
      <div className="grid grid-cols-4 items-center h-[60px] px-1">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center min-h-[48px] gap-1 transition-colors cursor-pointer ${
            currentView === 'home' ? 'text-[#3B82F6]' : 'text-[#94A3B8]'
          }`}
        >
          <Home className="w-5 h-5" strokeWidth={currentView === 'home' ? 2.4 : 1.8} />
          <span className="text-[11px] font-medium leading-none">Inicio</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('catalog')}
          className={`flex flex-col items-center justify-center min-h-[48px] gap-1 transition-colors cursor-pointer ${
            currentView === 'catalog' ? 'text-[#3B82F6]' : 'text-[#94A3B8]'
          }`}
        >
          <LayoutGrid className="w-5 h-5" strokeWidth={currentView === 'catalog' ? 2.4 : 1.8} />
          <span className="text-[11px] font-medium leading-none">Catálogo</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('promotions')}
          className={`flex flex-col items-center justify-center min-h-[48px] gap-1 transition-colors cursor-pointer ${
            currentView === 'promotions' ? 'text-[#3B82F6]' : 'text-[#94A3B8]'
          }`}
        >
          <Tag className="w-5 h-5" strokeWidth={currentView === 'promotions' ? 2.4 : 1.8} />
          <span className="text-[11px] font-medium leading-none">Promociones</span>
        </button>

        <a
          href={buildGeneralWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center min-h-[46px] mx-1 rounded-xl bg-[#10B981] text-[#04140E] font-bold active:scale-95 transition-transform"
        >
          <WhatsAppIcon className="w-5 h-5" />
          <span className="text-[11px] font-bold leading-none mt-0.5">WhatsApp</span>
        </a>
      </div>
    </nav>
  );
};
