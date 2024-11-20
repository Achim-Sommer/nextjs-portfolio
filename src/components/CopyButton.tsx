import { IconButton, useClipboard, Tooltip } from '@chakra-ui/react';
import { FiCopy, FiCheck } from 'react-icons/fi';

interface CopyButtonProps {
  code: string;
}

const CopyButton = ({ code }: CopyButtonProps) => {
  const { hasCopied, onCopy } = useClipboard(code);

  return (
    <Tooltip 
      label={hasCopied ? 'Kopiert!' : 'Kopieren'} 
      placement="left"
      hasArrow
      bg="gray.700"
      color="white"
    >
      <IconButton
        icon={hasCopied ? <FiCheck /> : <FiCopy />}
        onClick={onCopy}
        aria-label="Code kopieren"
        size="sm"
        position="absolute"
        top={6}
        right={6}
        color={hasCopied ? 'green.300' : 'blue.300'}
        bg="gray.700"
        _hover={{
          bg: 'gray.600',
          transform: 'scale(1.05)',
        }}
        _active={{
          bg: 'gray.800',
          transform: 'scale(0.95)',
        }}
        transition="all 0.2s"
        borderRadius="md"
      />
    </Tooltip>
  );
};

export default CopyButton;
