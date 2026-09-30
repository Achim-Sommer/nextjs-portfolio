'use client';

import { useState } from 'react';

interface CodeBlockProps {
  children: string;
  language?: string;
}

/** Codeblock im Artikel: Zeilennummern, Kopieren-Knopf, horizontal scrollbar */
const CodeBlock = ({ children, language }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);
  const code = children.replace(/\r\n/g, '\n').replace(/\n+$/, '');
  const lines = code.split('\n');
  const gutter = `${String(lines.length).length + 1}ch`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Zwischenablage nicht verfügbar
    }
  };

  return (
    <div className="not-article my-7 border border-line bg-[#0d0d0c]">
      <div className="flex items-center justify-between border-b border-line px-4 py-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">{language || 'Code'}</span>
        <button
          type="button"
          onClick={copy}
          className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted transition-colors duration-200 hover:text-accent"
        >
          {copied ? 'Kopiert' : 'Kopieren'}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-[13px] leading-[1.7] text-fg">
        <code>
          {lines.map((line, i) => (
            <span key={i} className="flex">
              <span className="select-none pr-4 text-right text-[#4a4946]" style={{ minWidth: gutter }} aria-hidden="true">
                {i + 1}
              </span>
              <span className="whitespace-pre">{line || ' '}</span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;
