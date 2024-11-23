'use client';

import { Input, InputGroup, InputLeftElement, Icon } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { useColorModeValue } from '@chakra-ui/react';

interface BlogSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function BlogSearch({ searchQuery, onSearchChange }: BlogSearchProps) {
  const inputBg = useColorModeValue('gray.800', 'gray.800');
  const inputBorder = useColorModeValue('gray.700', 'gray.700');
  const inputColor = useColorModeValue('gray.100', 'gray.100');
  const iconColor = useColorModeValue('gray.400', 'gray.400');

  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <Icon as={FiSearch} color={iconColor} />
      </InputLeftElement>
      <Input
        aria-label="Artikel durchsuchen"
        role="searchbox"
        placeholder="Artikel durchsuchen..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        bg={inputBg}
        border="1px solid"
        borderColor={inputBorder}
        color={inputColor}
        _placeholder={{ color: 'gray.500' }}
        _hover={{ borderColor: 'blue.500' }}
        _focus={{ borderColor: 'blue.500', boxShadow: 'none' }}
        fontSize="sm"
        fontFamily="mono"
      />
    </InputGroup>
  );
}
