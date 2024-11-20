'use client';

import { HStack, Tag, TagLabel, TagCloseButton, Wrap, WrapItem, Select, useColorModeValue } from '@chakra-ui/react';

interface BlogFilterProps {
  selectedTags: string[];
  allTags: string[];
  onTagSelect: (tag: string) => void;
  onTagRemove: (tag: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export default function BlogFilter({ 
  selectedTags, 
  allTags, 
  onTagSelect, 
  onTagRemove,
  sortBy,
  onSortChange 
}: BlogFilterProps) {
  const selectBg = useColorModeValue('gray.800', 'gray.800');
  const selectBorder = useColorModeValue('gray.700', 'gray.700');
  const selectColor = useColorModeValue('gray.100', 'gray.100');
  const tagBg = useColorModeValue('blue.500', 'blue.500');

  return (
    <HStack spacing={4} align="flex-start">
      <Select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
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

      <Wrap spacing={2}>
        {allTags.map((tag) => (
          <WrapItem key={tag}>
            {selectedTags.includes(tag) ? (
              <Tag
                size="sm"
                borderRadius="full"
                variant="solid"
                bg={tagBg}
                color="white"
                fontFamily="mono"
              >
                <TagLabel>{tag}</TagLabel>
                <TagCloseButton onClick={() => onTagRemove(tag)} />
              </Tag>
            ) : (
              <Tag
                size="sm"
                borderRadius="full"
                variant="outline"
                borderColor={tagBg}
                color={selectColor}
                cursor="pointer"
                onClick={() => onTagSelect(tag)}
                fontFamily="mono"
                _hover={{ bg: 'whiteAlpha.100' }}
              >
                <TagLabel>{tag}</TagLabel>
              </Tag>
            )}
          </WrapItem>
        ))}
      </Wrap>
    </HStack>
  );
}
