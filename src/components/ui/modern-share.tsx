"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiShare2, FiTwitter, FiLinkedin, FiMail, FiCopy } from "react-icons/fi";

interface ModernShareProps {
  url: string;
  title: string;
}

const shareOptions = [
  {
    name: "Twitter",
    icon: FiTwitter,
    color: "#1DA1F2",
    getUrl: (url: string, title: string) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
  },
  {
    name: "LinkedIn",
    icon: FiLinkedin,
    color: "#0A66C2",
    getUrl: (url: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    name: "Email",
    icon: FiMail,
    color: "#EA4335",
    getUrl: (url: string, title: string) =>
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
  },
];

export const ModernShare = ({ url, title }: ModernShareProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = (option: (typeof shareOptions)[0]) => {
    if (option.getUrl) {
      window.open(option.getUrl(url, title), "_blank");
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: do nothing
    }
  };

  return (
    <div className="share-button-container relative">
      <button
        aria-label="Share"
        title="Share"
        onClick={() => setIsOpen(!isOpen)}
        className="share-button inline-flex items-center justify-center rounded-md bg-transparent p-2 text-white transition-all duration-200 hover:scale-110 hover:bg-blue-900/30"
      >
        <FiShare2 />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-[calc(100%+8px)] z-50 flex gap-2 rounded-2xl border border-white/10 bg-[rgba(23,25,35,0.8)] p-3 backdrop-blur-[10px]"
          >
            {shareOptions.map((option) => (
              <button
                key={option.name}
                aria-label={option.name}
                title={option.name}
                onClick={() => handleShare(option)}
                className="inline-flex items-center justify-center rounded-md bg-transparent p-2 text-white transition-all duration-200 hover:-translate-y-0.5"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${option.color}33`;
                  e.currentTarget.style.color = option.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "white";
                }}
              >
                <option.icon />
              </button>
            ))}
            <button
              aria-label="Copy Link"
              title={copied ? "Link kopiert!" : "Copy Link"}
              onClick={handleCopy}
              className="inline-flex items-center justify-center rounded-md bg-transparent p-2 text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-purple-900/30 hover:text-purple-400"
            >
              <FiCopy />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
