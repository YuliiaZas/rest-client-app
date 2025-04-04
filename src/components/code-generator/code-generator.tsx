'use client';

import { defaultHeaders, Method } from '@/data';
import {
  SupportedLanguages,
  supportedLanguagesOptions,
} from '@/data/supported-languages';
import { useAppContext } from '@/context/app-context';
import { IHeader } from '@/types';
import { formatHeaders, isValidURL, replaceVariables } from '@/utils';
import { generateCodeSnippet } from '@/utils/generate-code-snippet';
import { useState } from 'react';
import { atomOneLight, CodeBlock } from 'react-code-blocks';
import { Button } from '../button';
import { Dropdown } from '../dropdown';
import styles from './code-generator.module.scss';
import { ScrollLayout } from '../scroll-layout';

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

  const { variables } = useAppContext();

  const generateSnippet = async () => {
    try {
      setLoading(true);
      const { updatedUrl, updatedBody, updatedHeaders } = replaceVariables(
        url,
        body,
        headers,
        variables
      );

      const validUrl = await isValidURL(updatedUrl);

      if (!validUrl) {
        setCode('URL is invalid');
        return;
      }

      const snippet = await generateCodeSnippet({
        method,
        url: updatedUrl,
        headers: formatHeaders(updatedHeaders, defaultHeaders),
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
    <ScrollLayout
      headerChildren={
        <div className={styles.code__controls}>
          <Dropdown
            items={supportedLanguagesOptions.map((value) => ({
              value,
              label: value.toUpperCase(),
            }))}
            selectedItem={language}
            showButtonBorder={false}
            colors="content"
            selectOption={(value) => setLanguage(value as SupportedLanguages)}
          />
          <Button
            onClick={generateSnippet}
            isDisabled={loading}
            text={loading ? 'Generating...' : 'Generate'}
            buttonType="secondary"
          />
        </div>
      }
    >
      <div className={styles.code__wrapper}>
        <CodeBlock
          text={code}
          language={language}
          theme={atomOneLight}
          showLineNumbers={false}
        />
      </div>
    </ScrollLayout>
  );
}
