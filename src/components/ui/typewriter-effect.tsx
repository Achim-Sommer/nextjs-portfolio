"use client";

import { cn } from "@/utils/cn";
import { motion, useAnimate, useInView } from "framer-motion";
import { useEffect, useState } from "react";

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
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);
  const [displayedLetters, setDisplayedLetters] = useState(0);
  const [hasPlayed, setHasPlayed] = useState(false);
  
  useEffect(() => {
    if (isInView && !hasPlayed) {
      let currentLetterCount = 0;
      const interval = setInterval(() => {
        if (currentLetterCount < getTotalLetters()) {
          currentLetterCount++;
          setDisplayedLetters(currentLetterCount);
          animate(
            `span[data-letter="${currentLetterCount - 1}"]`,
            {
              opacity: 1,
            },
            {
              duration: 0.1,
            }
          );
        } else {
          clearInterval(interval);
          setHasPlayed(true);
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isInView, animate, hasPlayed]);

  const getTotalLetters = () => {
    let total = 0;
    words.forEach((word, index) => {
      total += word.text.length;
      if (index < words.length - 1) total++;
    });
    return total;
  };

  const renderWords = () => {
    let letterCounter = 0;
    return (
      <motion.div ref={scope} className="inline-flex items-center justify-center">
        {words.map((word, idx) => (
          <span key={`word-${idx}`} className="inline-flex">
            {word.text.split("").map((char) => {
              const currentCounter = letterCounter++;
              return (
                <motion.span
                  data-letter={currentCounter}
                  initial={{ opacity: 0 }}
                  key={`char-${currentCounter}`}
                  className={cn(`opacity-0 inline-block`, word.className)}
                >
                  {char}
                </motion.span>
              );
            })}
            {idx < words.length - 1 && (
              <motion.span
                data-letter={letterCounter++}
                initial={{ opacity: 0 }}
                className={cn(`opacity-0 inline-block`, word.className)}
              >
                &nbsp;
              </motion.span>
            )}
          </span>
        ))}
      </motion.div>
    );
  };

  const getLetterWidth = () => {
    if (typeof window === 'undefined') return 0.5;
    const fontSize = window.getComputedStyle(scope.current || document.body).fontSize;
    return parseFloat(fontSize) * 0.5; 
  };

  return (
    <span className={cn("inline-flex items-center justify-center my-6 relative", className)}>
      {renderWords()}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: displayedLetters > 0 ? 1 : 0 }}
        transition={{ 
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: displayedLetters < getTotalLetters() ? 0 : 0.2
        }}
        className={cn(
          "inline-block w-[2px] h-[1.1em] bg-white",
          cursorClassName
        )}
        style={{
          position: 'absolute',
          left: `${(displayedLetters * getLetterWidth()) + 1}px`
        }}
      />
    </span>
  );
};
