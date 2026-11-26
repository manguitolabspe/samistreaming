import React, {useEffect} from 'react';
import {X} from 'lucide-react';
import {LEGAL_DOCS} from '../data/catalog';
import {buildGeneralWhatsAppUrl} from '../utils/whatsapp';
import {WhatsAppIcon} from './BrandMark';

interface LegalModalProps {
  docType: 'terms' | 'privacy' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({docType, onClose}) => {
  useEffect(() => {
    if (!docType) return;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [docType, onClose]);

  if (!docType) return null;

  const doc = LEGAL_DOCS[docType];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#02050B]/80 backdrop-blur-sm sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[85vh] flex flex-col rounded-t-3xl sm:rounded-3xl bg-[#0D1426] border border-white/10 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-white/[0.08]">
          <div>
            <h2 id="legal-modal-title" className="font-display text-lg font-bold text-[#F8FAFC]">
              {doc.title}
            </h2>
            <p className="text-xs text-[#94A3B8]">{doc.updated}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar documento legal"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border border-white/10 text-[#94A3B8] hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {doc.sections.map((section, idx) => (
            <div key={idx} className="space-y-1.5">
              <h3 className="font-display text-sm font-bold text-[#F8FAFC]">
                {section.heading}
              </h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">{section.body}</p>
            </div>
          ))}
        </div>

        <div className="px-6 py-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3 bg-[#0A101F]">
          <a
            href={buildGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#10B981] hover:underline"
          >
            <WhatsAppIcon className="w-4 h-4" />
            ¿Tienes consultas? Escríbenos por WhatsApp
          </a>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-5 py-2 rounded-xl bg-[#2563EB] text-sm font-semibold text-white hover:bg-[#3B82F6] transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
