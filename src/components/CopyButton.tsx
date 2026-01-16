import { Button, Tooltip, useBreakpointValue, useClipboard } from '@chakra-ui/react';
import { FiCopy, FiCheck } from 'react-icons/fi';

interface CopyButtonProps {
  code: string;
}

const CopyButton = ({ code }: CopyButtonProps) => {
  const { hasCopied, onCopy } = useClipboard(code);
  const showText = useBreakpointValue({ base: false, md: true });
  const label = hasCopied ? 'Kopiert' : 'Kopieren';

  return (
    <Tooltip 
      label={hasCopied ? 'Kopiert!' : 'Kopieren'}
      placement="bottom-end"
      hasArrow
      bg="gray.700"
      color="white"
    >
      <Button
        leftIcon={hasCopied ? <FiCheck /> : <FiCopy />}
        onClick={onCopy}
        aria-label={label}
        size="xs"
        color={hasCopied ? 'green.300' : 'blue.300'}
        bg="transparent"
        _hover={{
          bg: 'gray.800',
        }}
        _active={{
          bg: 'gray.700',
        }}
        transition="all 0.2s"
        borderRadius="md"
      >
        {showText ? label : null}
      </Button>
    </Tooltip>
  );
};

export default CopyButton;
