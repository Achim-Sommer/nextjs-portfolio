'use client';

import { Box, Select, useColorModeValue } from '@chakra-ui/react';

interface BlogFilterProps {
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export default function BlogFilter({ 
  sortBy,
  onSortChange 
}: BlogFilterProps) {
  const selectBg = useColorModeValue('gray.800', 'gray.800');
  const selectBorder = useColorModeValue('gray.700', 'gray.700');
  const selectColor = useColorModeValue('gray.100', 'gray.100');

  return (
    <Box>
      <Select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        aria-label="Artikel sortieren"
        bg={selectBg}
        border="1px solid"
        borderColor={selectBorder}
        color={selectColor}
        w="200px"
        size="sm"
        fontFamily="mono"
      >
        <option value="date-desc">Neueste zuerst</option>
        <option value="date-asc">Älteste zuerst</option>
        <option value="title">Alphabetisch</option>
        <option value="reading-time">Lesezeit</option>
      </Select>
    </Box>
  );
}
