'use client';

import { Box, VStack, HStack, Text, Button, Icon, useColorModeValue, Link } from '@chakra-ui/react';
import { FiServer, FiShield, FiCpu, FiCode, FiGift } from 'react-icons/fi';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const ZAP_GREEN = '#57BB54';

interface BlogZapHostingProps {
  context?: string;
}

export default function BlogZapHosting({ context }: BlogZapHostingProps) {
  const bgColor = useColorModeValue('gray.800', 'gray.800');
  const borderColor = useColorModeValue('gray.700', 'gray.700');
  const textColor = useColorModeValue('gray.100', 'gray.100');

  return (
    <VStack spacing={8} width="full" my={8}>
      {/* Smart Context Banner */}
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        width="full"
        bg={bgColor}
        borderRadius="lg"
        p={6}
        border="1px solid"
        borderColor={borderColor}
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
          <HStack spacing={4}>
            <Icon as={FiServer} color={ZAP_GREEN} boxSize={6} />
            <Text color={textColor} fontSize="lg" fontWeight="bold" fontFamily="mono">
              Jetzt bei Zap-Hosting deployen
            </Text>
          </HStack>

          <HStack spacing={8} pl={10}>
            <VStack align="start" spacing={2}>
              <HStack>
                <Icon as={FiShield} color={ZAP_GREEN} />
                <Text color={textColor}>DDoS Schutz</Text>
              </HStack>
              <HStack>
                <Icon as={FiCpu} color={ZAP_GREEN} />
                <Text color={textColor}>Root Zugriff</Text>
              </HStack>
            </VStack>
            <VStack align="start" spacing={2}>
              <HStack>
                <Icon as={FiCode} color={ZAP_GREEN} />
                <Text color={textColor}>Sofort Verfügbar</Text>
              </HStack>
              <HStack>
                <Icon as={FiServer} color={ZAP_GREEN} />
                <Text color={textColor}>24/7 Support</Text>
              </HStack>
            </VStack>
          </HStack>
        </VStack>
      </MotionBox>

      {/* Try it yourself Section */}
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        width="full"
        bg={bgColor}
        borderRadius="lg"
        p={6}
        border="1px solid"
        borderColor={borderColor}
        fontFamily="mono"
      >
        <VStack align="stretch" spacing={6}>
          <Text color={textColor} fontSize="sm">$ Starte deinen eigenen Linux V-Server</Text>
          
          <HStack justify="space-between" spacing={6}>
            {/* Monthly Plan */}
            <VStack 
              flex={1} 
              bg="gray.900" 
              p={4} 
              borderRadius="md" 
              border="1px solid"
              borderColor={borderColor}
              spacing={2}
            >
              <Text color={textColor} fontSize="lg">Monatlich</Text>
              <Text color={ZAP_GREEN} fontSize="2xl" fontWeight="bold">ab 7,90€</Text>
              <Text color={textColor} fontSize="sm">/Monat</Text>
              <Link 
                href="https://zap-hosting.com/vserverhomepage" 
                isExternal 
                width="full"
                _hover={{ textDecoration: 'none' }}
              >
                <Button 
                  width="full"
                  bg={ZAP_GREEN}
                  color="white"
                  _hover={{ bg: `${ZAP_GREEN}90` }}
                  size="sm"
                >
                  Jetzt Starten
                </Button>
              </Link>
            </VStack>

            {/* Lifetime Plan */}
            <VStack 
              flex={1} 
              bg="gray.900" 
              p={4} 
              borderRadius="md" 
              border="1px solid"
              borderColor={ZAP_GREEN}
              spacing={2}
              position="relative"
              _before={{
                content: '"Bester Deal"',
                position: 'absolute',
                top: -3,
                bg: ZAP_GREEN,
                px: 2,
                py: 0.5,
                borderRadius: 'md',
                fontSize: 'xs',
                color: 'white',
              }}
            >
              <Text color={textColor} fontSize="lg">Lifetime</Text>
              <Text color={ZAP_GREEN} fontSize="2xl" fontWeight="bold">ab 79,00€</Text>
              <Text color={textColor} fontSize="sm">einmalig</Text>
              <Link 
                href="https://zap-hosting.com/vserverhomepage" 
                isExternal 
                width="full"
                _hover={{ textDecoration: 'none' }}
              >
                <Button 
                  width="full"
                  bg={ZAP_GREEN}
                  color="white"
                  _hover={{ bg: `${ZAP_GREEN}90` }}
                  size="sm"
                >
                  Lifetime Sichern
                </Button>
              </Link>
            </VStack>
          </HStack>

          <HStack justify="center" spacing={2}>
            <Icon as={FiGift} color={ZAP_GREEN} />
            <Text color={textColor} fontSize="sm">
              Code GERMANGAMING für 20% Rabatt
            </Text>
          </HStack>
        </VStack>
      </MotionBox>
    </VStack>
  );
}
