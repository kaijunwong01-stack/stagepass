"use client";

import { useState } from "react";
import Image from "next/image";

type ImageLightboxProps = {
  src: string;
  alt: string;
};

export default function ImageLightbox({ src, alt }: ImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="block w-full cursor-zoom-in overflow-hidden rounded-xl"
        aria-label="View full image"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="w-full" />
      </button>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
        >
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close"
            className="absolute right-4 top-4 text-2xl text-white"
          >
            ✕
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative h-full max-h-[90vh] w-full max-w-3xl"
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </div>
      )}
    </>
  );
}