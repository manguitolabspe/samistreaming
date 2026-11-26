import React, {useEffect, useState} from 'react';
import {ChevronUp, ListChecks, Trash2, X} from 'lucide-react';
import {
  buildMultiInquiryWhatsAppUrl,
  formatPrice,
  type InquiryItem,
} from '../utils/whatsapp';
import {WhatsAppIcon} from './BrandMark';

interface InquiryBarProps {
  items: InquiryItem[];
  onRemoveItem: (key: string) => void;
  onClearAll: () => void;
}

export const InquiryBar: React.FC<InquiryBarProps> = ({
  items,
  onRemoveItem,
  onClearAll,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      setIsDrawerOpen(false);
    }
  }, [items.length]);

  useEffect(() => {
    if (!isDrawerOpen) return;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsDrawerOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isDrawerOpen]);

  if (items.length === 0) return null;

  const total = items.reduce((sum, item) => sum + item.price, 0);
  const whatsappUrl = buildMultiInquiryWhatsAppUrl(items);

  return (
    <>
      {/* Compact Sticky Inquiry Summary Bar (appears only when user adds items) */}
      <div className="fixed bottom-[68px] md:bottom-5 left-3 right-3 md:left-auto md:right-6 md:w-[440px] z-40">
        <div className="flex items-center justify-between gap-2.5 rounded-2xl bg-[#131C31]/95 backdrop-blur-lg border border-[#3B82F6]/45 px-3.5 py-2.5 shadow-[0_14px_38px_rgba(0,0,0,0.55)]">
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-2.5 min-w-0 min-h-[42px] text-left cursor-pointer"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2563EB]/20 text-[#3B82F6] shrink-0">
              <ListChecks className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="font-display text-xs sm:text-sm font-bold text-[#F8FAFC] truncate">
                {items.length} {items.length === 1 ? 'servicio' : 'servicios'} en consulta
              </p>
              <p className="text-xs text-[#94A3B8] tabular-nums flex items-center gap-1">
                <span>Ref. {formatPrice(total)}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#3B82F6] inline-flex items-center gap-0.5 font-medium">
                  Ver lista
                  <ChevronUp className="w-3.5 h-3.5" />
                </span>
              </p>
            </div>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 min-h-[42px] rounded-xl bg-[#10B981] px-3.5 py-2 text-xs sm:text-sm font-bold text-[#04140E] hover:bg-[#34D399] active:scale-[0.98] transition-all whitespace-nowrap shrink-0"
          >
            <WhatsAppIcon className="w-4 h-4 shrink-0" />
            <span>Consultar</span>
          </a>
        </div>
      </div>

      {/* Review Multi-Service Inquiry Drawer */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#02050B]/80 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="inquiry-drawer-title"
          onClick={() => setIsDrawerOpen(false)}
        >
          <div
            className="w-full max-w-lg max-h-[82vh] flex flex-col rounded-t-3xl sm:rounded-3xl bg-[#0D1426] border border-white/10 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sm:hidden pt-3 pb-1 flex justify-center">
              <div className="w-10 h-1.5 rounded-full bg-white/20" />
            </div>

            <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-white/[0.08]">
              <div>
                <h2
                  id="inquiry-drawer-title"
                  className="font-display text-lg font-bold text-[#F8FAFC]"
                >
                  Tu consulta por WhatsApp
                </h2>
                <p className="text-xs text-[#94A3B8]">
                  Envía todos tus servicios seleccionados en un solo mensaje.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                aria-label="Cerrar lista de consulta"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border border-white/10 text-[#94A3B8] hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 divide-y divide-white/[0.06]">
              {items.map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0">
                    <p className="font-display text-sm font-bold text-[#F8FAFC] truncate">
                      {item.productName}
                    </p>
                    <p className="text-xs text-[#94A3B8] truncate">{item.planName}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-display text-sm font-bold text-[#F8FAFC] tabular-nums">
                      {formatPrice(item.price)}
                    </span>
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.key)}
                      aria-label={`Quitar ${item.productName} de la consulta`}
                      className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg text-[#94A3B8] hover:text-red-400 hover:bg-white/[0.04] transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/[0.08] bg-[#0A101F] p-5 pb-safe space-y-4">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-xs text-[#94A3B8]">
                  Total referencial ({items.length}{' '}
                  {items.length === 1 ? 'servicio' : 'servicios'})
                </span>
                <span className="font-display text-2xl font-extrabold text-[#F8FAFC] tabular-nums">
                  {formatPrice(total)}
                </span>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-[50px] w-full rounded-xl bg-[#10B981] px-5 py-3 text-sm font-bold text-[#04140E] hover:bg-[#34D399] active:scale-[0.98] transition-all shadow-lg shadow-[#10B981]/20"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>ENVIAR CONSULTA POR WHATSAPP</span>
              </a>

              <button
                type="button"
                onClick={onClearAll}
                className="w-full min-h-[40px] text-xs font-medium text-[#94A3B8] hover:text-[#F8FAFC] transition-colors cursor-pointer"
              >
                Vaciar lista de consulta
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
