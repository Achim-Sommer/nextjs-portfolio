"use client";

import { cn } from "@/utils/cn";
import { useCallback, useEffect, useRef, useState } from "react";

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayedLetters, setDisplayedLetters] = useState(0);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const getTotalLetters = useCallback(() => {
    let total = 0;
    words.forEach((word, index) => {
      total += word.text.length;
      if (index < words.length - 1) total++;
    });
    return total;
  }, [words]);

  // IntersectionObserver to detect when component is in view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Typewriter animation via state
  useEffect(() => {
    if (isInView && !hasPlayed) {
      let count = 0;
      const total = getTotalLetters();
      const interval = setInterval(() => {
        if (count < total) {
          count++;
          setDisplayedLetters(count);
        } else {
          clearInterval(interval);
          setHasPlayed(true);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [getTotalLetters, hasPlayed, isInView]);

  const renderWords = () => {
    let letterCounter = 0;
    return (
      <div ref={containerRef} className="inline-flex items-center justify-center">
        {words.map((word, idx) => (
          <span key={`word-${idx}`} className="inline-flex">
            {word.text.split("").map((char) => {
              const currentCounter = letterCounter++;
              return (
                <span
                  key={`char-${currentCounter}`}
                  className={cn(
                    "inline-block transition-opacity duration-100",
                    currentCounter < displayedLetters ? "opacity-100" : "opacity-0",
                    word.className
                  )}
                >
                  {char}
                </span>
              );
            })}
            {idx < words.length - 1 && (() => {
              const spaceCounter = letterCounter++;
              return (
                <span
                  key={`space-${spaceCounter}`}
                  className={cn(
                    "inline-block transition-opacity duration-100",
                    spaceCounter < displayedLetters ? "opacity-100" : "opacity-0",
                    word.className
                  )}
                >
                  &nbsp;
                </span>
              );
            })()}
          </span>
        ))}
      </div>
    );
  };

  return (
    <span className={cn("inline-flex items-center justify-center my-6 relative", className)}>
      {renderWords()}
      <span
        className={cn(
          "inline-block w-[2px] h-[1.1em] bg-white ml-1 animate-cursor-blink",
          displayedLetters === 0 && "opacity-0",
          cursorClassName
        )}
      />
    </span>
  );
};
