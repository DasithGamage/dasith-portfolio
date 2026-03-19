"use client";

import { useState } from "react";

interface ExternalImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
}

export function ExternalImage({
  src,
  alt,
  className = "",
  fallbackClassName = "",
}: ExternalImageProps) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-muted to-muted/50 text-muted-foreground text-xs font-medium ${fallbackClassName || className}`}
      >
        {alt.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <>
      {!loaded && (
        <div
          className={`animate-pulse bg-muted ${className}`}
        />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${loaded ? "opacity-100" : "opacity-0 absolute"}`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        loading="lazy"
      />
    </>
  );
}
