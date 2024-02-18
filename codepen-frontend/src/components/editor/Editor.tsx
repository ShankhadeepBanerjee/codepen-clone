import React from 'react';
import CodeMirror, { Extension } from '@uiw/react-codemirror';
import { twMerge } from 'tailwind-merge';
// import { useResizeObserver } from './useResizeObserver'; // Adjust the import path as necessary

interface EditorProps {
  title?: string;
  value?: string;
  mode?: string; // Language mode (e.g., "javascript", "html", "css")
  theme?: string; // Editor theme (e.g., "material", "vscode-dark")
  extensions?: Extension[]; // Additional CodeMirror extensions
  onChange?: (value: string) => void; // Callback for value changes
}

const Editor: React.FC<EditorProps> = ({
  value,
  title,
  extensions = [],
  onChange,
}) => {
  const { ref, size } = useResizeObserver();

  return (
    <div className="h-full " ref={ref}>
      <div className={twMerge('w-fit min-h-6 text-white ')}>
        <p
          className={twMerge(
            'px-2 bg-slate-600',
            'transition-all duration-300 origin-top-left',
            size.width < 300 ? 'absolute z-10 rotate-90 -left-10' : '',
          )}
        >
          {title}
        </p>
      </div>
      <CodeMirror
        value={value}
        height="100%"
        className="text-black h-full"
        theme={'dark'}
        extensions={extensions}
        onChange={newValue => onChange && onChange(newValue)}
      />
    </div>
  );
};

export default Editor;

import { useState, useRef, useEffect } from 'react';

const useResizeObserver = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const ref = useRef(null);

  useEffect(() => {
    const observeTarget = ref.current;
    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        setSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      });
    });

    if (observeTarget) {
      resizeObserver.observe(observeTarget);
    }

    return () => {
      if (observeTarget) {
        resizeObserver.unobserve(observeTarget);
      }
    };
  }, [ref]);

  return { ref, size };
};
