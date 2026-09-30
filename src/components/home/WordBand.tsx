/**
 * Riesiges, langsam laufendes Wortband zwischen den Sektionen.
 * Rein dekorativ: für Screenreader ausgeblendet, bei reduzierter Bewegung steht es still.
 */
export default function WordBand({
  words,
  reverse = false,
  duration = 70,
}: {
  words: string[];
  reverse?: boolean;
  duration?: number;
}) {
  // Zwei identische Hälften: das Band verschiebt sich um genau eine Hälfte und springt unsichtbar zurück
  const half = (
    <span className="flex shrink-0 items-center">
      {words.map((word) => (
        <span key={word} className="flex items-center">
          <span className="px-[0.35em]">{word}</span>
          <span className="inline-block h-[0.14em] w-[0.14em] bg-accent/40" />
        </span>
      ))}
    </span>
  );

  return (
    <div
      aria-hidden="true"
      className="relative select-none overflow-hidden border-t border-line py-10 sm:py-14"
      style={{
        maskImage: 'linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)',
      }}
    >
      <div
        className="flex w-max whitespace-nowrap text-[clamp(4rem,13vw,11rem)] font-medium leading-none tracking-[-0.05em] text-transparent motion-safe:animate-marquee"
        style={{
          WebkitTextStroke: '1px rgba(236, 235, 232, 0.3)',
          animationDirection: reverse ? 'reverse' : 'normal',
          ['--marquee-duration' as string]: `${duration}s`,
        }}
      >
        {half}
        {half}
      </div>
    </div>
  );
}
