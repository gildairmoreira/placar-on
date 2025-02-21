'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  [key: string]: any;
}

export function ImageWithFallback({ src, alt, ...props }: ImageWithFallbackProps) {
  const [error, setError] = useState(false);
  const fallbackSrc = '/placeholder-team.png';

  if (!src || src === '') {
    return (
      <Image
        src={fallbackSrc}
        alt={alt}
        {...props}
      />
    );
  }

  return (
    <Image
      src={error ? fallbackSrc : src}
      alt={alt}
      onError={() => setError(true)}
      {...props}
    />
  );
} 