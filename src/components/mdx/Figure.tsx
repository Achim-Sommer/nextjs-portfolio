/**
 * Bild im Artikel mit festen Maßen (kein Layout-Sprung), Lazy Loading und
 * sichtbarer Bildunterschrift. Nutzung im Markdown:
 * <Figure src="/img/blog/slug/bild.webp" alt="..." width={1600} height={900} caption="..." />
 */
export default function Figure({
  src,
  alt,
  width,
  height,
  caption,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}) {
  return (
    <figure className="my-8">
      {/* eslint-disable-next-line @next/next/no-img-element -- statische Diagramme, bereits als WebP optimiert */}
      <img src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" className="w-full h-auto" />
      {caption && <figcaption className="mt-2 text-sm text-gray-400">{caption}</figcaption>}
    </figure>
  );
}
