import React, { useRef, useState, useEffect } from 'react';
import { LanguageName, langs } from '@uiw/codemirror-extensions-langs';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '../ui';
import Editor from './Editor';
import { useCode } from '../providers';
import { ImperativePanelHandle } from 'react-resizable-panels';

const langNames = ['HTML', 'CSS', 'Javascript'] as const;

export const EditorPanel = () => {
  const { css, html, js, setCss, setHtml, setJs } = useCode();
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const [hasTransition, setHasTransition] = useState(false);
  const refs = [
    useRef<ImperativePanelHandle | null>(null),
    useRef<ImperativePanelHandle | null>(null),
    useRef<ImperativePanelHandle | null>(null),
  ];

  const handleDoubleClick = (index: number) => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
    setHasTransition(true);

    setTimeout(() => {
      const otherCollapsed = refs
        ?.filter((_, i) => i !== index)
        ?.every(r => r?.current?.isCollapsed());

      if (otherCollapsed) {
        refs?.forEach(r => r?.current?.resize(32));
      } else {
        refs?.forEach((r, i) =>
          i === index ? r?.current?.resize(100) : r?.current?.collapse(),
        );
      }

      timeoutIdRef.current = setTimeout(() => {
        setHasTransition(false);
      }, 300);
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, []);

  return (
    <ResizablePanelGroup direction="horizontal" className="py-2 flex relative">
      {langNames.map((language, index) => (
        <React.Fragment key={language}>
          {index > 0 ? (
            <ResizableHandle
              className={`relative w-4 bg-black cursor-col-resize border-x border-slate-500 `}
              onDoubleClick={() => handleDoubleClick(index)}
            />
          ) : (
            <div
              className={`relative w-4 bg-black border-x border-slate-500 `}
              onDoubleClick={() => handleDoubleClick(index)}
            />
          )}

          <ResizablePanel
            collapsible
            ref={refs[index]}
            className={hasTransition ? 'transition-all duration-200' : ''}
          >
            <Editor
              title={language}
              extensions={[langs[language.toLowerCase() as LanguageName]()]}
              onChange={[setHtml, setCss, setJs][index]}
              value={[html, css, js][index]}
            />
          </ResizablePanel>
        </React.Fragment>
      ))}
    </ResizablePanelGroup>
  );
};
