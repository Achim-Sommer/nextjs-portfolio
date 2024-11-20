import Navbar from './Navbar';
import Footer from './Footer';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isBlogPage, setIsBlogPage] = useState(false);
  const bgColor = useColorModeValue('gray.900', 'gray.900');

  useEffect(() => {
    setIsBlogPage(window.location.pathname.includes('/blog'));
  }, []);

  return (
    <Box 
      minH="100vh" 
      display="flex" 
      flexDirection="column" 
      bg={isBlogPage ? 'transparent' : bgColor}
      position="relative"
    >
      <Box 
        position="absolute"
        top="0"
        left="0"
        right="0"
        h="4rem"
        bg="transparent"
        zIndex={1}
      />
      <Navbar />
      <Box flex="1">
        {children}
      </Box>
      <Footer />
    </Box>
  );
}
