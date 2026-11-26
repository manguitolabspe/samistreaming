import React, {useState} from 'react';
import {Download, Share, Smartphone, WifiOff, X} from 'lucide-react';
import {usePWAInstall} from '../hooks/usePWAInstall';
import {useOnlineStatus} from '../hooks/useOnlineStatus';

interface PWAInstallButtonProps {
  variant?: 'inline' | 'footer';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({variant = 'inline'}) => {
  const {isInstallable, isInstalled, isIOS, install} = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) {
    return null;
  }

  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={install}
        className={
          variant === 'footer'
            ? 'inline-flex items-center gap-2 min-h-[44px] rounded-xl border border-[#2563EB]/40 bg-[#2563EB]/15 px-4 py-2.5 text-sm font-medium text-[#F8FAFC] hover:bg-[#2563EB]/25 transition-colors whitespace-nowrap shrink-0 cursor-pointer'
            : 'inline-flex items-center gap-2 min-h-[44px] rounded-xl border border-white/15 bg-[#131C31] px-4 py-2 text-sm font-medium text-[#F8FAFC] hover:border-[#3B82F6]/60 hover:bg-[#18243E] transition-colors whitespace-nowrap shrink-0 cursor-pointer'
        }
      >
        <Download className="w-4 h-4 text-[#3B82F6]" />
        Instalar app
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          className="inline-flex items-center gap-2 min-h-[44px] rounded-xl border border-white/15 bg-[#131C31] px-4 py-2 text-sm font-medium text-[#F8FAFC] hover:border-[#3B82F6]/60 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Smartphone className="w-4 h-4 text-[#3B82F6]" />
          Agregar a inicio
        </button>

        {showIOSGuide && (
          <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={() => setShowIOSGuide(false)}
          >
            <div
              className="w-full max-w-sm rounded-2xl bg-[#131C31] border border-white/10 p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-lg font-bold text-[#F8FAFC]">
                  Instalar en iPhone / iPad
                </h3>
                <button
                  type="button"
                  onClick={() => setShowIOSGuide(false)}
                  aria-label="Cerrar instrucciones"
                  className="min-h-[40px] min-w-[40px] -mt-1 -mr-2 flex items-center justify-center rounded-lg text-[#94A3B8] hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="mt-2 text-sm text-[#94A3B8] leading-relaxed">
                Lleva Sami Streaming en tu pantalla de inicio para entrar al catálogo como una app:
              </p>
              <ol className="mt-4 space-y-3 text-sm text-[#F8FAFC]">
                <li className="flex items-start gap-2.5">
                  <span className="font-display font-bold text-[#3B82F6]">1.</span>
                  <span>
                    Presiona el botón <strong className="inline-flex items-center gap-1">Compartir <Share className="w-3.5 h-3.5 inline" /></strong> en la barra de Safari.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-display font-bold text-[#3B82F6]">2.</span>
                  <span>
                    Desliza hacia abajo y selecciona <strong>Agregar a inicio</strong>.
                  </span>
                </li>
              </ol>
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="mt-6 w-full min-h-[44px] rounded-xl bg-[#2563EB] py-2.5 text-sm font-semibold text-white hover:bg-[#3B82F6] transition-colors cursor-pointer"
              >
                Entendido
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      className="fixed bottom-20 md:bottom-6 left-4 z-50 flex items-center gap-2 rounded-xl border border-amber-400/30 bg-[#131C31]/95 px-3.5 py-2.5 text-xs font-medium text-amber-200 shadow-xl backdrop-blur-md"
    >
      <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
      <span>Sin conexión — Mostrando catálogo guardado</span>
    </div>
  );
};
