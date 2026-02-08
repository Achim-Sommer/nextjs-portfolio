"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiShare2, FiTwitter, FiLinkedin, FiCopy } from "react-icons/fi";

interface ShareButtonProps {
  url: string;
  title: string;
}

export const ShareButton = ({ url, title }: ShareButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [url]);

  const shareOptions = [
    {
      icon: FiTwitter,
      label: "Twitter",
      onClick: () => {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            title
          )}&url=${encodeURIComponent(url)}`,
          "_blank"
        );
      },
    },
    {
      icon: FiLinkedin,
      label: "LinkedIn",
      onClick: () => {
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
      },
    },
    {
      icon: FiCopy,
      label: copied ? "Kopiert!" : "Copy Link",
      onClick: handleCopy,
    },
  ];

  return (
    <div className="relative">
      <button
        aria-label="Share"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-md text-blue-400 bg-transparent hover:bg-blue-900/30 transition-colors"
      >
        <FiShare2 />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            style={{
              position: "absolute",
              top: "100%",
              right: 0,
              marginTop: "0.5rem",
              zIndex: 50,
            }}
          >
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-2 shadow-lg">
              <div className="flex items-center gap-2">
                {shareOptions.map((option) => (
                  <button
                    key={option.label}
                    aria-label={option.label}
                    title={option.label}
                    onClick={option.onClick}
                    className="p-2 rounded-md text-blue-400 bg-transparent hover:bg-blue-900/30 transition-colors"
                  >
                    <option.icon />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
