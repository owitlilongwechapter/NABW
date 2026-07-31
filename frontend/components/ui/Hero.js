import Link from 'next/link';

export default function Hero({ title, subtitle, ctaText, ctaLink, bgImage, height = 'h-[70vh]' }) {
  return (
    <section
      className={`relative ${height} flex items-center justify-center text-center text-white bg-cover bg-center bg-no-repeat`}
      style={{
        backgroundImage: bgImage
          ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${bgImage}')`
          : 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0ea5e9 100%)',
      }}
    >
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
