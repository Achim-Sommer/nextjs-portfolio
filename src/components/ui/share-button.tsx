"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, IconButton, HStack, useClipboard, useToast } from "@chakra-ui/react";
import { FiShare2, FiTwitter, FiLinkedin, FiCopy } from "react-icons/fi";

interface ShareButtonProps {
  url: string;
  title: string;
}

export const ShareButton = ({ url, title }: ShareButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { onCopy } = useClipboard(url);
  const toast = useToast();

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
      label: "Copy Link",
      onClick: () => {
        onCopy();
        toast({
          title: "Link kopiert!",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "bottom-right",
        });
      },
    },
  ];

  return (
    <Box position="relative">
      <IconButton
        aria-label="Share"
        icon={<FiShare2 />}
        variant="ghost"
        colorScheme="blue"
        onClick={() => setIsOpen(!isOpen)}
        _hover={{ bg: "blue.900/30" }}
      />

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
            <Box
              bg="gray.800"
              borderRadius="lg"
              border="1px solid"
              borderColor="gray.700"
              p={2}
              shadow="lg"
            >
              <HStack spacing={2}>
                {shareOptions.map((option) => (
                  <IconButton
                    key={option.label}
                    aria-label={option.label}
                    icon={<option.icon />}
                    variant="ghost"
                    colorScheme="blue"
                    onClick={option.onClick}
                    _hover={{ bg: "blue.900/30" }}
                  />
                ))}
              </HStack>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};
