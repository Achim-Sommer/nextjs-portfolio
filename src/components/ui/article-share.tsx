"use client";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { FiShare2, FiTwitter, FiMail, FiCopy } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

interface ArticleShareProps {
  url: string;
  title: string;
  variant?: "top" | "bottom";
}

const shareOptions = [
  {
    name: "Twitter",
    icon: FiTwitter,
    colorClass: "hover:text-[#1DA1F2]",
    hoverBgClass: "hover:bg-[#1DA1F233]",
    getUrl: (url: string, title: string) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title
      )}&url=${encodeURIComponent(url)}`,
  },
  {
    name: "WhatsApp",
    icon: FaWhatsapp,
    colorClass: "hover:text-[#25D366]",
    hoverBgClass: "hover:bg-[#25D36633]",
    getUrl: (url: string, title: string) =>
      `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
  },
  {
    name: "Email",
    icon: FiMail,
    colorClass: "hover:text-[#EA4335]",
    hoverBgClass: "hover:bg-[#EA433533]",
    getUrl: (url: string, title: string) =>
      `mailto:?subject=${encodeURIComponent(
        title
      )}&body=${encodeURIComponent(url)}`,
  },
];

export const ArticleShare = ({
  url,
  title,
  variant = "top",
}: ArticleShareProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = (option: (typeof shareOptions)[0]) => {
    if (option.getUrl) {
      window.open(option.getUrl(url, title), "_blank");
    }
  };

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [url]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        initial={false}
        animate={{ scale: isHovered ? 1.02 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <div
          className={`
            relative overflow-hidden rounded-2xl border p-4 lg:p-6
            bg-[rgba(13,23,33,0.7)] backdrop-blur-[10px]
            transition-all duration-200
            ${isHovered ? "border-blue-400 shadow-[0_0_20px_2px_rgba(66,153,225,0.15)]" : "border-blue-800 shadow-md"}
          `}
        >
          {/* _before gradient overlay */}
          <div
            className={`
              pointer-events-none absolute inset-0
              bg-gradient-to-br from-[rgba(66,153,225,0.1)] to-transparent
              transition-opacity duration-200
              ${isHovered ? "opacity-100" : "opacity-0"}
            `}
          />

          <div className="relative flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 lg:gap-4">
            {/* Left: icon + text */}
            <div className="flex items-center gap-3 shrink-0">
              <div
                className={`
                  p-1.5 lg:p-2 rounded-xl transition-all duration-200
                  ${isHovered ? "bg-blue-400" : "bg-blue-500"}
                `}
              >
                <FiShare2 className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
              </div>
              <p
                className={`
                  text-blue-50 font-medium
                  text-sm md:text-base ${variant === "bottom" ? "lg:text-base" : "lg:text-lg"}
                `}
              >
                {variant === "bottom"
                  ? "Hat dir der Artikel gefallen? Teile ihn!"
                  : "Teile diesen Artikel"}
              </p>
            </div>

            {/* Right: share buttons */}
            <div className="flex flex-wrap gap-1 lg:gap-2 justify-start sm:justify-end">
              {shareOptions.map((option) => (
                <button
                  key={option.name}
                  title={option.name}
                  onClick={() => handleShare(option)}
                  className={`
                    inline-flex items-center gap-1.5 px-2 lg:px-4
                    py-1.5 lg:py-2 rounded-md text-white
                    bg-transparent transition-all duration-200
                    hover:-translate-y-0.5
                    lg:min-w-[120px]
                    ${option.hoverBgClass} ${option.colorClass}
                  `}
                >
                  <option.icon className="w-4 h-4" />
                  <span className="hidden lg:inline text-sm lg:text-base">
                    {option.name}
                  </span>
                </button>
              ))}

              <button
                title="Link kopieren"
                onClick={handleCopy}
                className="
                  inline-flex items-center gap-1.5 px-2 lg:px-4
                  py-1.5 lg:py-2 rounded-md text-white
                  bg-transparent transition-all duration-200
                  hover:-translate-y-0.5 hover:bg-purple-900/30 hover:text-purple-400
                  lg:min-w-[120px]
                "
              >
                <FiCopy className="w-4 h-4" />
                <span className="hidden lg:inline text-sm lg:text-base">
                  {copied ? "Kopiert!" : "Kopieren"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Simple toast notification */}
      {copied && (
        <div className="fixed bottom-4 right-4 z-50 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm animate-fade-in">
          Link kopiert!
        </div>
      )}
    </div>
  );
};
