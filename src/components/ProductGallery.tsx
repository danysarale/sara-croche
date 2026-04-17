"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ProductImage } from "@/data/product";

/*
  LÓGICA DO ZOOM (Efeito Lupa):

  1. A imagem fica dentro de um container com overflow:hidden
  2. Ao interagir (hover no desktop / touch no mobile), aplica scale(2.5)
  3. transform-origin acompanha a posição do cursor/dedo em tempo real
  4. A posição é calculada como porcentagem (0-100%) relativa ao container
  
  MOBILE: onTouchStart ativa, onTouchMove atualiza posição, onTouchEnd desativa
  DESKTOP: onMouseEnter ativa, onMouseMove atualiza, onMouseLeave desativa
*/

interface ProductGalleryProps {
  images: ProductImage[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Calcula posição do cursor/dedo como porcentagem do container
  const calculatePosition = useCallback(
    (clientX: number, clientY: number) => {
      if (!imageContainerRef.current) return;
      const rect = imageContainerRef.current.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;
      setZoomOrigin({
        x: Math.max(0, Math.min(100, x)),
        y: Math.max(0, Math.min(100, y)),
      });
    },
    []
  );

  // Desktop
  const handleMouseEnter = () => setIsZoomed(true);
  const handleMouseLeave = () => setIsZoomed(false);
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => calculatePosition(e.clientX, e.clientY),
    [calculatePosition]
  );

  // Mobile - preventDefault no touchMove impede scroll durante zoom
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      setIsZoomed(true);
      const touch = e.touches[0];
      calculatePosition(touch.clientX, touch.clientY);
    },
    [calculatePosition]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      calculatePosition(touch.clientX, touch.clientY);
    },
    [calculatePosition]
  );

  const handleTouchEnd = () => setIsZoomed(false);

  // Navegação
  const goToImage = (index: number) => setCurrentIndex(index);
  const goNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const goPrev = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full"
    >
      {/* Imagem Principal com Zoom */}
      <div
        ref={imageContainerRef}
        className="relative w-full aspect-square rounded-2xl overflow-hidden bg-white shadow-soft-md cursor-zoom-in group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={images[currentIndex].id}
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full object-cover select-none"
            draggable={false}
            style={{
              transform: isZoomed ? "scale(2.5)" : "scale(1)",
              transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
              transition: "transform 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)",
            }}
          />
        </AnimatePresence>

        {/* Indicador de zoom */}
        <motion.div
          initial={false}
          animate={{ opacity: isZoomed ? 0 : 1 }}
          className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-soft pointer-events-none"
        >
          <svg className="w-4 h-4 text-brand-text-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6" />
          </svg>
          <span className="text-xs font-sans text-brand-text-light">
            Toque para ampliar
          </span>
        </motion.div>

        {/* Setas de navegação (desktop) */}
        <button
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center shadow-soft opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white z-10"
          aria-label="Imagem anterior"
        >
          <svg className="w-5 h-5 text-brand-text" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); goNext(); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center shadow-soft opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white z-10"
          aria-label="Próxima imagem"
        >
          <svg className="w-5 h-5 text-brand-text" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      {/* Thumbnails */}
      <div className="mt-4 flex gap-3 overflow-x-auto scrollbar-hide pb-2 px-1">
        {images.map((image, index) => (
          <motion.button
            key={image.id}
            onClick={() => goToImage(index)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden transition-all duration-300 ${
              currentIndex === index
                ? "ring-2 ring-brand-rose ring-offset-2 ring-offset-brand-bg shadow-soft-md"
                : "ring-1 ring-black/5 opacity-60 hover:opacity-100"
            }`}
            aria-label={`Ver imagem ${index + 1}`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
              draggable={false}
            />
          </motion.button>
        ))}
      </div>

      {/* Dots indicadores (mobile) */}
      <div className="mt-3 flex justify-center gap-2 md:hidden">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToImage(index)}
            className={`rounded-full transition-all duration-300 ${
              currentIndex === index
                ? "w-6 h-2 bg-brand-rose"
                : "w-2 h-2 bg-brand-rose-light"
            }`}
            aria-label={`Ir para imagem ${index + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
}