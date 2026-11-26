import React, {useEffect, useState} from 'react';
import {
  Tv,
  Radio,
  Laptop,
  ShieldCheck,
  Palette,
  Cpu,
  Layers,
} from 'lucide-react';
import type {CategoryId, Product} from '../data/catalog';

export const SAMI_SYMBOL_SRC = '/assets/aistudio/sami_streaming_simbolo-1_0e8e013f.png';
export const SAMI_FULL_LOGO_SRC = '/assets/aistudio/sami_streaming_logo_completo_9940f1bf.png';

export const SamiLogoMark: React.FC<{className?: string; alt?: string}> = ({
  className = 'w-8 h-8',
  alt = 'Sami Streaming',
}) => (
  <img
    src={SAMI_SYMBOL_SRC}
    alt={alt}
    className={`object-contain select-none ${className}`}
    draggable={false}
  />
);

export const SamiFullLogo: React.FC<{className?: string; alt?: string}> = ({
  className = 'h-9 w-auto',
  alt = 'Sami Streaming',
}) => (
  <img
    src={SAMI_FULL_LOGO_SRC}
    alt={alt}
    className={`object-contain select-none ${className}`}
    draggable={false}
  />
);

export const WhatsAppIcon: React.FC<{className?: string}> = ({className = 'w-5 h-5'}) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path d="M12.031 2C6.506 2 2.01 6.494 2.008 12.02c0 1.766.462 3.49 1.339 5.008L2 22l5.095-1.336a9.99 9.99 0 0 0 4.933 1.257h.004c5.524 0 10.02-4.496 10.022-10.021A9.96 9.96 0 0 0 19.124 4.93 9.948 9.948 0 0 0 12.031 2zm5.826 14.234c-.245.69-1.434 1.32-1.99 1.402-.507.075-1.167.107-1.883-.119-.434-.138-.99-.322-1.703-.63-2.996-1.294-4.953-4.307-5.103-4.506-.149-.199-1.219-1.622-1.219-3.094 0-1.472.771-2.196 1.045-2.495.274-.299.597-.374.796-.374.199 0 .398.002.573.01.184.009.43-.07.673.514.249.598.846 2.069.921 2.219.075.149.125.324.025.523-.1.199-.149.324-.299.498-.149.174-.314.389-.448.523-.149.149-.304.311-.131.61.174.299.774 1.277 1.662 2.068 1.142 1.018 2.104 1.334 2.403 1.483.299.149.473.125.647-.075.174-.199.747-.872.946-1.171.199-.299.398-.249.672-.149.274.1 1.743.822 2.042.971.299.149.498.224.573.349.075.125.075.722-.17 1.412z" />
  </svg>
);

export const CategoryIcon: React.FC<{categoryId: CategoryId; className?: string}> = ({
  categoryId,
  className = 'w-5 h-5',
}) => {
  switch (categoryId) {
    case 'streaming':
      return <Tv className={className} />;
    case 'iptv':
      return <Radio className={className} />;
    case 'software':
      return <Laptop className={className} />;
    case 'antivirus':
      return <ShieldCheck className={className} />;
    case 'diseno':
      return <Palette className={className} />;
    case 'ia':
      return <Cpu className={className} />;
    case 'combos':
      return <Layers className={className} />;
  }
};

/**
 * Uniform, crisp brand artwork banner for digital service cards & detail modals.
 * Eliminates broken external logos and keeps consistent visual alignment across all cards.
 */
export const ProductArtwork: React.FC<{
  product: Product;
  size?: 'card' | 'detail';
}> = ({product, size = 'card'}) => {
  const isDetail = size === 'detail';
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    setImgFailed(false);
  }, [product.imageUrl]);

  if (product.imageUrl && !imgFailed) {
    return (
      <div
        className={`relative w-full overflow-hidden select-none bg-[#0B1221] aspect-video ${
          isDetail ? 'rounded-2xl' : 'rounded-xl'
        }`}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setImgFailed(true)}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isDetail ? '' : 'group-hover:scale-[1.03]'
          }`}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative w-full overflow-hidden select-none flex items-center justify-center aspect-video ${
        isDetail ? 'rounded-2xl' : 'rounded-xl'
      }`}
      style={{
        background: `radial-gradient(circle at 20% 20%, ${product.brandAccent}38 0%, ${product.brandAccentSecondary}30 45%, #0B1221 100%)`,
      }}
    >
      {/* Subtle geometric grid lines */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(248,250,252,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(248,250,252,0.08) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Ambient corner light */}
      <div
        className="absolute -bottom-10 -right-10 w-36 h-36 rounded-full blur-2xl opacity-35"
        style={{backgroundColor: product.brandAccent}}
      />

      {/* Crisp Brand Emblem Tile */}
      <div className="relative z-10 flex flex-col items-center gap-2.5">
        <div
          className={`flex items-center justify-center font-display font-extrabold tracking-tight text-white shadow-lg border border-white/15 ${
            isDetail ? 'w-20 h-20 rounded-2xl text-3xl' : 'w-14 h-14 rounded-2xl text-xl'
          }`}
          style={{
            background: `linear-gradient(135deg, ${product.brandAccent} 0%, ${product.brandAccentSecondary} 100%)`,
          }}
        >
          {product.monogram}
        </div>
        <span
          className={`font-display font-semibold tracking-tight text-[#F8FAFC]/90 ${
            isDetail ? 'text-base' : 'text-xs'
          }`}
        >
          {product.brand}
        </span>
      </div>

      {/* Category icon watermark in corner */}
      <div className="absolute top-3 right-3 text-white/30">
        <CategoryIcon categoryId={product.categoryId} className="w-4 h-4" />
      </div>
    </div>
  );
};
