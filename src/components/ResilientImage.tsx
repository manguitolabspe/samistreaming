import React, {useState} from 'react';
import {SamiLogoMark} from './BrandMark';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackTitle = 'Sami Streaming',
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#131C31] via-[#0C1427] to-[#060A14] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <SamiLogoMark className="w-12 h-12 opacity-80" />
        <span className="font-display text-sm font-semibold text-[#94A3B8]">
          {fallbackTitle}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
