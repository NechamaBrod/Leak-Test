import { Highlight, themes } from 'prism-react-renderer';
import type { CodeLanguage } from '../types';

interface Props {
  code: string;
  language: CodeLanguage;
  highlightedLines?: number[];
}

const langMap: Record<CodeLanguage, string> = {
  js: 'jsx',
  ts: 'tsx',
  sql: 'sql',
  json: 'json',
  env: 'bash',
  bash: 'bash',
};

// theme מותאם — רקע שקוף כדי שיתערבב עם הפאנל שלנו
const customTheme = {
  ...themes.vsDark,
  plain: {
    color: '#e8e8ee',
    backgroundColor: 'transparent',
  },
};

export function CodeBlock({ code, language, highlightedLines = [] }: Props) {
  const highlights = new Set(highlightedLines);
  return (
    <div className="code-ltr rounded-xl border border-border bg-bg-elevated overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-bg-panel">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ms-auto text-xs text-text-dim font-mono uppercase tracking-wider">
          {language}
        </span>
      </div>
      <Highlight code={code} language={langMap[language]} theme={customTheme}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} text-sm leading-relaxed py-4 px-4 overflow-x-auto m-0`}
            style={style}
          >
            {tokens.map((line, i) => {
              const isHl = highlights.has(i + 1);
              const lineProps = getLineProps({ line });
              return (
                <div
                  key={i}
                  {...lineProps}
                  className={`${lineProps.className ?? ''} ${
                    isHl ? 'code-line-danger' : ''
                  }`}
                >
                  <span className="inline-block w-8 text-text-dim select-none">
                    {i + 1}
                  </span>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
