'use client';

import { Box, VStack, Text, Button, Link, IconButton, useColorModeValue } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiServer, FiX } from 'react-icons/fi';
import { useState, useEffect } from 'react';

const MotionBox = motion(Box);
const ZAP_GREEN = '#57BB54';

export default function FloatingZapAd() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const bgColor = useColorModeValue('gray.800', 'gray.800');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setIsVisible(scrollPercent >= 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <MotionBox
          position="fixed"
          right={4}
          bottom={4}
          zIndex={100}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.3 }}
        >
          <MotionBox
            bg={bgColor}
            borderRadius="lg"
            border="1px solid"
            borderColor={ZAP_GREEN}
            overflow="hidden"
            position="relative"
            animate={isExpanded ? "expanded" : "collapsed"}
            variants={{
              expanded: { width: "300px", height: "auto" },
              collapsed: { width: "60px", height: "60px" }
            }}
            transition={{ duration: 0.3 }}
          >
            <IconButton
              aria-label="Toggle ad"
              icon={isExpanded ? <FiX /> : <FiServer />}
              position="absolute"
              right={2}
              top={2}
              size="sm"
              color={ZAP_GREEN}
              variant="ghost"
              onClick={() => setIsExpanded(!isExpanded)}
              zIndex={2}
            />

            <AnimatePresence>
              {isExpanded && (
                <MotionBox
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  p={4}
                >
                  <VStack spacing={3} align="stretch">
                    <Text color="white" fontSize="sm" fontWeight="bold">
                      Linux V-Server
                    </Text>
                    <Text color={ZAP_GREEN} fontSize="xl" fontWeight="bold">
                      Ab 7,90€/Monat
                    </Text>
                    <Text color="gray.300" fontSize="xs">
                      oder 64,00€ Lifetime
                    </Text>
                    <Link 
                      href="https://zap-hosting.com/vserverhomepage" 
                      isExternal
                      _hover={{ textDecoration: 'none' }}
                    >
                      <Button
                        width="full"
                        bg={ZAP_GREEN}
                        color="white"
                        size="sm"
                        _hover={{ bg: `${ZAP_GREEN}90` }}
                      >
                        Jetzt Bestellen
                      </Button>
                    </Link>
                    <Text color="gray.300" fontSize="xs" textAlign="center">
                      Code: GERMANGAMING (-20%)
                    </Text>
                  </VStack>
                </MotionBox>
              )}
            </AnimatePresence>
          </MotionBox>
        </MotionBox>
      )}
    </AnimatePresence>
  );
}
