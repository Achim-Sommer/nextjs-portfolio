"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, IconButton, useClipboard, useToast, Text, Tooltip } from "@chakra-ui/react";
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
  const { onCopy } = useClipboard(url);
  const toast = useToast();

  const handleShare = (option: typeof shareOptions[0]) => {
    if (option.getUrl) {
      window.open(option.getUrl(url, title), "_blank");
    }
  };

  const handleCopy = () => {
    onCopy();
    toast({
      title: "Link kopiert!",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "bottom-right",
    });
  };

  return (
    <Box position="relative" className="share-button-container">
      <IconButton
        aria-label="Share"
        icon={<FiShare2 />}
        variant="ghost"
        color="white"
        colorScheme="whiteAlpha"
        onClick={() => setIsOpen(!isOpen)}
        className="share-button"
        _hover={{
          bg: "blue.900/30",
          transform: "scale(1.1)",
        }}
        transition="all 0.2s"
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              right: 0,
              zIndex: 50,
              display: "flex",
              gap: "0.5rem",
              background: "rgba(23, 25, 35, 0.8)",
              backdropFilter: "blur(10px)",
              padding: "0.75rem",
              borderRadius: "1rem",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            {shareOptions.map((option) => (
              <Tooltip 
                key={option.name} 
                label={option.name}
                placement="bottom"
              >
                <IconButton
                  aria-label={option.name}
                  icon={<option.icon />}
                  variant="ghost"
                  color="white"
                  onClick={() => handleShare(option)}
                  _hover={{
                    bg: `${option.color}33`,
                    color: option.color,
                    transform: "translateY(-2px)",
                  }}
                  transition="all 0.2s"
                />
              </Tooltip>
            ))}
            <Tooltip label="Copy Link" placement="bottom">
              <IconButton
                aria-label="Copy Link"
                icon={<FiCopy />}
                variant="ghost"
                color="white"
                onClick={handleCopy}
                _hover={{
                  bg: "purple.900/30",
                  color: "purple.400",
                  transform: "translateY(-2px)",
                }}
                transition="all 0.2s"
              />
            </Tooltip>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};
