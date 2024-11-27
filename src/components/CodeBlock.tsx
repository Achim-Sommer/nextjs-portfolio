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
      mx={['-1rem', 0]}
    >
      {/* macOS-style window controls */}
      <HStack
        bg="gray.900"
        px={[2, 4]}
        py={[2, 3]}
        borderBottom="1px"
        borderColor={borderColor}
        spacing={[1.5, 2]}
      >
        <HStack spacing={[1.5, 2]}>
          <Circle size={['2.5', '3']} bg="red.500" />
          <Circle size={['2.5', '3']} bg="yellow.500" />
          <Circle size={['2.5', '3']} bg="green.500" />
        </HStack>
      </HStack>

      {/* Code content */}
      <Box 
        position="relative" 
        p={[3, 6]} 
        overflowX="auto" 
        maxW="100vw"
        sx={{
          '&::-webkit-scrollbar': {
            height: '8px',
            borderRadius: '8px',
            backgroundColor: `rgba(0, 0, 0, 0.05)`,
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '8px',
            backgroundColor: `rgba(128, 128, 128, 0.3)`,
          },
        }}
      >
        <pre
          style={{
            margin: 0,
            padding: 0,
            overflow: 'auto',
            fontFamily: 'JetBrains Mono, Menlo, Monaco, Consolas, monospace',
            fontSize: '0.8rem',
            lineHeight: '1.5',
            whiteSpace: 'pre',
            width: '100%',
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
                pr={[2, 4]}
                fontFamily="inherit"
                fontSize="inherit"
              >
                {i + 1}
              </Text>
              <Text
                as="span"
                color={textColor}
                pl={[2, 4]}
                borderLeft="1px solid"
                borderColor={borderColor}
                width="100%"
                fontFamily="inherit"
                fontSize="inherit"
                overflowX="auto"
                whiteSpace="pre"
              >
                {line || '\n'}
              </Text>
            </Box>
          ))}
        </pre>
        <Box position="absolute" top={[2, 6]} right={[2, 6]}>
          <CopyButton code={children} />
        </Box>
      </Box>
    </Box>
  );
};

export default CodeBlock;
