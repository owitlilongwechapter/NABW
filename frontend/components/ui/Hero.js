import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Hero({ title, subtitle, ctaText, ctaLink, bgImage, bgImages = [], height = 'h-[70vh]' }) {
  const [activeBackground, setActiveBackground] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (bgImages.length < 2 || isPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const interval = window.setInterval(() => {
      setActiveBackground((current) => (current + 1) % bgImages.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, [bgImages.length, isPaused]);

  return (
    <section
      className={`relative ${height} flex items-center justify-center overflow-hidden text-center text-white bg-cover bg-center bg-no-repeat`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
      }}
      style={{
        backgroundImage: bgImages.length === 0 && bgImage
          ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${bgImage}')`
          : bgImages.length === 0 ? 'linear-gradient(135deg, #45112b 0%, #9c2b61 52%, #f8b218 150%)' : undefined,
      }}
    >
      {bgImages.map((image, index) => (
        <div
          key={image}
          aria-hidden="true"
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${index === activeBackground ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${image}')` }}
        />
      ))}
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
          {ctaText && ctaLink && (
            <Link
              href={ctaLink}
              className="inline-block btn-secondary text-lg px-8 py-4"
            >
              {ctaText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
