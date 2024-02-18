// CodeContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';
import { debounce } from 'lodash';

interface CodeContextType {
  html: string;
  setHtml: React.Dispatch<React.SetStateAction<string>>;
  css: string;
  setCss: React.Dispatch<React.SetStateAction<string>>;
  js: string;
  setJs: React.Dispatch<React.SetStateAction<string>>;
  srcDoc: string;
}

const CodeContext = createContext<CodeContextType | undefined>(undefined);

export const CodeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [js, setJs] = useState('');
  const [srcDoc, setSrcDoc] = useState('');

  const updateSrcDoc = useCallback(
    debounce((_html: string, _css: string, _js: string) => {
      localStorage.setItem('html', _html);
      localStorage.setItem('css', _css);
      localStorage.setItem('js', _js);
      const doc = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <style>${_css}</style>
      </head>
      <body>
        ${_html}
        <script>${_js}</script>
      </body>
      </html>`;
      setSrcDoc(doc);
    }, 1000),
    [],
  );

  useEffect(() => {
    updateSrcDoc(html, css, js);
  }, [html, css, js, updateSrcDoc]);

  useEffect(() => {
    const [htmlFromLS, cssFromLS, jsFromLS] = [
      localStorage.getItem('html'),
      localStorage.getItem('css'),
      localStorage.getItem('js'),
    ];
    if (htmlFromLS) setHtml(htmlFromLS);
    if (cssFromLS) setCss(cssFromLS);
    if (jsFromLS) setJs(jsFromLS);
  }, []);

  return (
    <CodeContext.Provider
      value={{ html, setHtml, css, setCss, js, setJs, srcDoc }}
    >
      {children}
    </CodeContext.Provider>
  );
};

export const useCode = (): CodeContextType => {
  const context = useContext(CodeContext);
  if (context === undefined) {
    throw new Error('useCode must be used within a CodeProvider');
  }
  return context;
};
