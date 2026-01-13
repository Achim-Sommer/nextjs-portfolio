'use client';

import {
  Box,
  Button,
  HStack,
  Icon,
  Link,
  Stack,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiGift, FiExternalLink } from 'react-icons/fi';

const ZAP_GREEN = '#57BB54';

type ZapHostingCtaProps = {
  href: string;
  buttonText?: string;
  title?: string;
  description?: string;
  couponCode?: string;
};

export default function ZapHostingCta({
  href,
  buttonText = 'Hytale Server jetzt holen',
  title = 'Hytale Server in Minuten starten',
  description = 'Einfach bestellen, im Panel verwalten und direkt loslegen.',
  couponCode = 'GermanGaming',
}: ZapHostingCtaProps) {
  const bgColor = useColorModeValue('gray.800', 'gray.800');
  const borderColor = useColorModeValue('gray.700', 'gray.700');
  const textColor = useColorModeValue('gray.100', 'gray.100');

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
      <VStack align="stretch" spacing={4}>
        <Stack direction={["column", "row"]} justify="space-between" spacing={[3, 6]}>
          <VStack align="start" spacing={1}>
            <Text color={textColor} fontSize={["md", "lg"]} fontWeight="bold" fontFamily="mono">
              {title}
            </Text>
            <Text color={textColor} fontSize={["sm", "md"]} opacity={0.9}>
              {description}
            </Text>
          </VStack>

          <Link href={href} isExternal rel="sponsored noopener noreferrer" _hover={{ textDecoration: 'none' }}>
            <Button
              bg={ZAP_GREEN}
              color="white"
              _hover={{ bg: `${ZAP_GREEN}90` }}
              rightIcon={<Icon as={FiExternalLink} />}
              size={["sm", "md"]}
            >
              {buttonText}
            </Button>
          </Link>
        </Stack>

        <HStack spacing={2}>
          <Icon as={FiGift} color={ZAP_GREEN} />
          <Text color={textColor} fontSize={["xs", "sm"]}>
            Rabattcode: <Text as="span" fontFamily="mono" fontWeight="bold">{couponCode}</Text> (20% sparen)
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
}
