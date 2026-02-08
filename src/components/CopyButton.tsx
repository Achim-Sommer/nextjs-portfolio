'use client';

import { useState } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';

interface CopyButtonProps {
  code: string;
}

const CopyButton = ({ code }: CopyButtonProps) => {
  const [hasCopied, setHasCopied] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={onCopy}
      aria-label={hasCopied ? 'Kopiert' : 'Kopieren'}
      title={hasCopied ? 'Kopiert!' : 'Kopieren'}
      className={`inline-flex items-center gap-1.5 px-2 py-1 text-xs rounded-md transition-all ${
        hasCopied 
          ? 'text-green-300' 
          : 'text-blue-300 hover:bg-gray-800 active:bg-gray-700'
      }`}
    >
      {hasCopied ? <FiCheck className="w-3.5 h-3.5" /> : <FiCopy className="w-3.5 h-3.5" />}
      <span className="hidden md:inline">{hasCopied ? 'Kopiert' : 'Kopieren'}</span>
    </button>
  );
};

export default CopyButton;
