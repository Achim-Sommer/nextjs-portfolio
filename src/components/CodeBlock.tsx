import { Box, HStack, Text, useColorModeValue, Circle } from '@chakra-ui/react';
import CopyButton from './CopyButton';

interface CodeBlockProps {
  children: string;
}

const CodeBlock = ({ children }: CodeBlockProps) => {
  const bgColor = useColorModeValue('gray.800', 'gray.800');
  const borderColor = useColorModeValue('gray.700', 'gray.700');
  const textColor = useColorModeValue('gray.100', 'gray.100');
  const lineNumberColor = useColorModeValue('gray.500', 'gray.500');

  // Split the code into lines and add line numbers
  const lines = children.trim().split('\n');
  const maxLineNumberWidth = String(lines.length).length;

  return (
    <Box
      position="relative"
      bg={bgColor}
      borderRadius="lg"
      overflow="hidden"
      border="1px solid"
      borderColor={borderColor}
      mb={6}
      boxShadow="lg"
    >
      {/* macOS-style window controls */}
      <HStack
        bg="gray.900"
        px={4}
        py={3}
        borderBottom="1px"
        borderColor={borderColor}
        spacing={2}
      >
        <HStack spacing={2}>
          <Circle size="3" bg="red.500" />
          <Circle size="3" bg="yellow.500" />
          <Circle size="3" bg="green.500" />
        </HStack>
      </HStack>

      {/* Code content */}
      <Box position="relative" p={6}>
        <pre
          style={{
            margin: 0,
            padding: 0,
            overflow: 'auto',
            fontFamily: 'JetBrains Mono, Menlo, Monaco, Consolas, monospace',
            fontSize: '0.95rem',
            lineHeight: '1.5',
          }}
        >
          {lines.map((line, i) => (
            <Box key={i} display="flex" mb="1">
              <Text
                as="span"
                color={lineNumberColor}
                userSelect="none"
                w={`${maxLineNumberWidth + 1}ch`}
                textAlign="right"
                pr={4}
                fontFamily="inherit"
                fontSize="inherit"
              >
                {i + 1}
              </Text>
              <Text
                as="span"
                color={textColor}
                pl={4}
                borderLeft="1px solid"
                borderColor={borderColor}
                width="100%"
                fontFamily="inherit"
                fontSize="inherit"
              >
                {line || '\n'}
              </Text>
            </Box>
          ))}
        </pre>
        <CopyButton code={children} />
      </Box>
    </Box>
  );
};

export default CodeBlock;
