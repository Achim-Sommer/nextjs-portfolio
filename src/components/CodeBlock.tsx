import CopyButton from './CopyButton';

interface CodeBlockProps {
  children: string;
}

const CodeBlock = ({ children }: CodeBlockProps) => {
  const normalizedCode = children.replace(/\r\n/g, '\n').replace(/\n+$/, '');
  const lines = normalizedCode.split('\n');
  const maxLineNumberWidth = String(lines.length).length;

  return (
    <div className="relative bg-gray-800 rounded-lg overflow-hidden border border-gray-700 mb-6 shadow-lg mx-[-1rem] sm:mx-0">
      {/* macOS-style window controls */}
      <div className="flex items-center justify-between bg-gray-900 px-2 sm:px-4 py-2 sm:py-3 border-b border-gray-700">
        <div className="flex gap-1.5 sm:gap-2">
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500" />
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500" />
        </div>
        <CopyButton code={normalizedCode} />
      </div>

      {/* Code content */}
      <div className="p-3 sm:p-6 overflow-x-auto max-w-[100vw] scrollbar-thin scrollbar-thumb-gray-600">
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
            <div key={i} className="flex mb-px">
              <span
                className="text-gray-500 select-none text-right pr-2 sm:pr-4"
                style={{
                  width: `${maxLineNumberWidth + 1}ch`,
                  fontFamily: 'inherit',
                  fontSize: 'inherit',
                }}
              >
                {i + 1}
              </span>
              <span
                className="text-gray-100 pl-2 sm:pl-4 border-l border-gray-700 w-full whitespace-pre overflow-x-auto"
                style={{ fontFamily: 'inherit', fontSize: 'inherit' }}
              >
                {line || '\n'}
              </span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
