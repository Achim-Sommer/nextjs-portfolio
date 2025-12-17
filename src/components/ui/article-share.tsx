"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Button,
  HStack,
  useClipboard,
  useToast,
  Text,
  Icon,
  Tooltip,
  Flex,
} from "@chakra-ui/react";
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
    color: "#1DA1F2",
    hoverBg: "#1DA1F233",
    getUrl: (url: string, title: string) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title
      )}&url=${encodeURIComponent(url)}`,
  },
  {
    name: "WhatsApp",
    icon: FaWhatsapp,
    color: "#25D366",
    hoverBg: "#25D36633",
    getUrl: (url: string, title: string) =>
      `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
  },
  {
    name: "Email",
    icon: FiMail,
    color: "#EA4335",
    hoverBg: "#EA433533",
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
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      position="relative"
    >
      <motion.div
        initial={false}
        animate={{
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        <Box
          bg="rgba(13, 23, 33, 0.7)"
          borderRadius="2xl"
          border="1px solid"
          borderColor={isHovered ? "blue.400" : "blue.800"}
          p={[4, 4, 6]}
          transition="all 0.2s"
          position="relative"
          overflow="hidden"
          backdropFilter="blur(10px)"
          boxShadow={
            isHovered
              ? "0 0 20px 2px rgba(66, 153, 225, 0.15)"
              : "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
          }
          _before={{
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bg: "linear-gradient(135deg, rgba(66, 153, 225, 0.1) 0%, rgba(66, 153, 225, 0) 100%)",
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.2s",
          }}
        >
          <Flex
            direction={{ base: "column", sm: "row" }}
            justify="space-between"
            align={{ base: "stretch", sm: "center" }}
            gap={[3, 3, 4]}
            position="relative"
          >
            <HStack spacing={3} flex="none">
              <Box
                bg={isHovered ? "blue.400" : "blue.500"}
                p={[1.5, 1.5, 2]}
                borderRadius="xl"
                transition="all 0.2s"
              >
                <Icon
                  as={FiShare2}
                  boxSize={[4, 4, 5]}
                  color="white"
                />
              </Box>
              <Text
                color="blue.50"
                fontSize={["sm", "md", variant === "bottom" ? "md" : "lg"]}
                fontWeight="medium"
              >
                {variant === "bottom"
                  ? "Hat dir der Artikel gefallen? Teile ihn!"
                  : "Teile diesen Artikel"}
              </Text>
            </HStack>
            <Flex 
              gap={[1, 1, 2]} 
              wrap="wrap"
              justify={{ base: "flex-start", sm: "flex-end" }}
            >
              {shareOptions.map((option) => (
                <Tooltip key={option.name} label={option.name} placement="top">
                  <Button
                    size={["sm", "sm", "md"]}
                    variant="ghost"
                    color="white"
                    onClick={() => handleShare(option)}
                    _hover={{
                      bg: option.hoverBg,
                      color: option.color,
                      transform: "translateY(-2px)",
                    }}
                    leftIcon={<option.icon />}
                    px={[2, 2, 4]}
                    minW={["auto", "auto", "120px"]}
                  >
                    <Text display={["none", "none", "block"]}>{option.name}</Text>
                  </Button>
                </Tooltip>
              ))}
              <Tooltip label="Link kopieren" placement="top">
                <Button
                  size={["sm", "sm", "md"]}
                  variant="ghost"
                  color="white"
                  onClick={handleCopy}
                  _hover={{
                    bg: "purple.900/30",
                    color: "purple.400",
                    transform: "translateY(-2px)",
                  }}
                  leftIcon={<FiCopy />}
                  px={[2, 2, 4]}
                  minW={["auto", "auto", "120px"]}
                >
                  <Text display={["none", "none", "block"]}>Kopieren</Text>
                </Button>
              </Tooltip>
            </Flex>
          </Flex>
        </Box>
      </motion.div>
    </Box>
  );
};
