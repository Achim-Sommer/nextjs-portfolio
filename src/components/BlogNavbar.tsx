'use client';

import Link from 'next/link';
import { Box, Container, Flex, Button, useColorModeValue } from '@chakra-ui/react';
import { AiOutlineArrowLeft, AiOutlineHome } from 'react-icons/ai';

export default function BlogNavbar() {
  const bgColor = useColorModeValue('gray.900', 'gray.900');
  const borderColor = useColorModeValue('gray.800', 'gray.800');

  return (
    <Box 
      as="nav" 
      position="fixed"
      top={0}
      left={0}
      right={0}
      h="4rem"
      zIndex={1000}
      bg={bgColor}
      borderBottom="1px"
      borderColor={borderColor}
      backdropFilter="blur(8px)"
      display="flex"
      alignItems="center"
    >
      <Container maxW="6xl">
        <Flex justify="space-between" align="center">
          <Flex gap={4}>
            <Link href="/" passHref>
              <Button
                leftIcon={<AiOutlineHome />}
                variant="ghost"
                color="blue.400"
                _hover={{ bg: 'whiteAlpha.100' }}
              >
                Home
              </Button>
            </Link>
            {window.location.pathname !== '/blog' && (
              <Link href="/blog" passHref>
                <Button
                  leftIcon={<AiOutlineArrowLeft />}
                  variant="ghost"
                  color="blue.400"
                  _hover={{ bg: 'whiteAlpha.100' }}
                >
                  Back to Blog
                </Button>
              </Link>
            )}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
