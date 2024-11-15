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
  
  useEffect(() => {
    if (isInView) {
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
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isInView, animate]);

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
      <motion.div ref={scope} className="inline">
        {words.map((word, idx) => (
          <span key={`word-${idx}`} className="inline-block">
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
    if (typeof window === 'undefined') return 0.55;
    const fontSize = window.getComputedStyle(scope.current || document.body).fontSize;
    return parseFloat(fontSize) * 0.55;
  };

  return (
    <div className={cn("flex my-6 relative", className)}>
      <div className="flex">{renderWords()}</div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.7,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className={cn(
          "block bg-white w-[4px] rounded-full absolute",
          cursorClassName
        )}
        style={{
          left: `${displayedLetters * getLetterWidth()}px`,
          height: "100%",
          transform: "translateX(-10px)",
        }}
      />
    </div>
  );
};
