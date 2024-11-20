"use client";
import { Box, HStack } from "@chakra-ui/react";

export const MacWindow = () => {
  return (
    <Box
      bg="gray.800"
      borderTopRadius="xl"
      p={2}
      borderBottom="1px solid"
      borderColor="gray.700"
    >
      <HStack spacing={2}>
        <Box
          w={3}
          h={3}
          borderRadius="full"
          bg="red.500"
          _hover={{ opacity: 0.8 }}
        />
        <Box
          w={3}
          h={3}
          borderRadius="full"
          bg="yellow.500"
          _hover={{ opacity: 0.8 }}
        />
        <Box
          w={3}
          h={3}
          borderRadius="full"
          bg="green.500"
          _hover={{ opacity: 0.8 }}
        />
      </HStack>
    </Box>
  );
};
