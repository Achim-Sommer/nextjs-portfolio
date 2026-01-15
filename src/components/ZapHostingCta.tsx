'use client';

import {
  Box,
  Button,
  HStack,
  Icon,
  Stack,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiGift, FiExternalLink } from 'react-icons/fi';
import Image from 'next/image';

const ZAP_GREEN = '#57BB54';

type ZapHostingCtaProps = {
  href: string;
  buttonText?: string;
  title?: string;
  description?: string;
  couponCode?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
};

export default function ZapHostingCta({
  href,
  buttonText = 'Hytale Server jetzt holen',
  title = 'Hytale Server in Minuten starten',
  description = 'Einfach bestellen, im Panel verwalten und direkt loslegen.',
  couponCode = 'GermanGaming',
  imageSrc,
  imageAlt = 'Hytale Charakter',
  imageWidth = 280,
  imageHeight = 287,
}: ZapHostingCtaProps) {
  const bgColor = useColorModeValue('gray.800', 'gray.800');
  const borderColor = useColorModeValue('gray.700', 'gray.700');
  const textColor = useColorModeValue('gray.100', 'gray.100');

  const resolvedImageSrc = imageSrc ?? (href.includes('/hytale') ? '/img/blog/hytale-character.png' : undefined);

  return (
    <Box
      my={8}
      bg={bgColor}
      borderRadius="lg"
      border="1px solid"
      borderColor={borderColor}
      p={[4, 6]}
      position="relative"
      overflow="hidden"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: `linear-gradient(90deg, ${ZAP_GREEN} 0%, ${ZAP_GREEN}80 100%)`,
      }}
    >
      <VStack align="stretch" spacing={4} position="relative" zIndex={1}>
        <Stack direction={["column", "row"]} justify="space-between" spacing={[4, 8]} align={["stretch", "center"]}>
          <HStack spacing={4} align="center" flex={1} minW={0}>
            {resolvedImageSrc ? (
              <Box
                flexShrink={0}
                display={{ base: 'none', md: 'block' }}
                pointerEvents="none"
              >
                <Image
                  src={resolvedImageSrc}
                  alt={imageAlt}
                  width={imageWidth}
                  height={imageHeight}
                  style={{ height: '120px', width: 'auto', objectFit: 'contain' }}
                  priority={false}
                />
              </Box>
            ) : null}

            <VStack align="start" spacing={1} minW={0} flex={1}>
              <Text color={textColor} fontSize={["md", "lg"]} fontWeight="bold" fontFamily="mono">
                {title}
              </Text>
              <Text color={textColor} fontSize={["sm", "md"]} opacity={0.9}>
                {description}
              </Text>

              <HStack spacing={2} pt={2}>
                <Icon as={FiGift} color={ZAP_GREEN} />
                <Text color={textColor} fontSize={["xs", "sm"]}>
                  Rabattcode: <Text as="span" fontFamily="mono" fontWeight="bold">{couponCode}</Text> (20% sparen)
                </Text>
              </HStack>
            </VStack>
          </HStack>

          <Button
            as="a"
            href={href}
            target="_blank"
            rel="sponsored noopener noreferrer"
            bg={ZAP_GREEN}
            color="white"
            sx={{
              color: 'white !important',
              '&:link': { color: 'white !important' },
              '&:visited': { color: 'white !important' },
              '&:hover': { color: 'white !important' },
              '&:active': { color: 'white !important' },
            }}
            _hover={{ bg: `${ZAP_GREEN}90`, textDecoration: 'none' }}
            _active={{ bg: `${ZAP_GREEN}85` }}
            rightIcon={<Icon as={FiExternalLink} color="currentColor" />}
            size={["sm", "md"]}
            alignSelf={{ base: 'flex-start', md: 'center' }}
          >
            {buttonText}
          </Button>
        </Stack>
      </VStack>
    </Box>
  );
}
