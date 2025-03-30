'use client';

import { Method } from '@/data';
import {
  SupportedLanguages,
  supportedLanguagesOptions,
} from '@/data/supported-languages';
import { useLocalStorage } from '@/hooks';
import { IHeader, IVariable } from '@/types';
import { formatHeaders, isValidURL, replaceVariables } from '@/utils';
import { generateCodeSnippet } from '@/utils/generate-code-snippet';
import { useState } from 'react';
import { CodeBlock, dracula } from 'react-code-blocks';
import { Button } from '../button';
import styles from './code-generator.module.scss';

type CodeGeneratorProps = {
  method: Method;
  url: string;
  body: string;
  headers: IHeader[];
};

export default function CodeGenerator({
  method,
  url,
  body,
  headers,
}: CodeGeneratorProps) {
  const [language, setLanguage] = useState<SupportedLanguages>('curl');
  const [code, setCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [variables] = useLocalStorage<IVariable[]>({
    key: 'variables',
    defaultValue: [],
  });

  const generateSnippet = async () => {
    try {
      setLoading(true);
      const { updatedUrl, updatedBody, updatedHeaders } = replaceVariables(
        url,
        body,
        headers,
        variables
      );

      if (!isValidURL(updatedUrl)) {
        setCode('URL is invalid');
        return;
      }

      const snippet = await generateCodeSnippet({
        method,
        url: updatedUrl,
        headers: formatHeaders(updatedHeaders, {
          'Content-Type': 'application/json',
        }),
        body: updatedBody ? JSON.parse(updatedBody) : null,
        language,
      });

      setCode(snippet || 'Error generating code');
    } catch (err) {
      setCode((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className={styles.code__controls}>
        <select
          onChange={(e) => setLanguage(e.target.value as SupportedLanguages)}
          value={language}
          className="select"
        >
          {supportedLanguagesOptions.map((lang) => (
            <option key={lang} value={lang}>
              {lang.toUpperCase()}
            </option>
          ))}
        </select>
        <Button
          onClick={generateSnippet}
          isDisabled={loading}
          text={loading ? 'Generating...' : 'Generate'}
        />
      </div>

      <div className={styles.code__wrapper}>
        <CodeBlock
          text={code}
          language={language}
          theme={dracula}
          showLineNumbers={false}
        />
      </div>
    </div>
  );
}
