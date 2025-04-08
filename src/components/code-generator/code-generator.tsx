'use client';

import { Method } from '@/data';
import {
  SupportedLanguages,
  supportedLanguagesOptions,
} from '@/data/supported-languages';
import { useAppContext } from '@/context/app-context';
import { IHeader } from '@/types';
import { formatHeaders, isValidURL, replaceVariables } from '@/utils';
import { generateCodeSnippet } from '@/utils/generate-code-snippet';
import { useContext, useState } from 'react';
import { atomOneLight, CodeBlock } from 'react-code-blocks';
import { Button } from '../button';
import { Dropdown } from '../dropdown';
import styles from './code-generator.module.scss';
import { ScrollLayout } from '../scroll-layout';
import { NotificationsContext } from '@/context';
import { useTranslations } from 'next-intl';

type CodeGeneratorProps = {
  method: Method;
  url: string;
  body: string;
  headers: IHeader[];
  hiddenHeaders: IHeader[];
};

export default function CodeGenerator({
  method,
  url,
  body,
  headers,
  hiddenHeaders,
}: CodeGeneratorProps) {
  const [language, setLanguage] = useState<SupportedLanguages>('curl');
  const [code, setCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { addNotification } = useContext(NotificationsContext);
  const t = useTranslations('client');

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
        headers: formatHeaders(updatedHeaders, hiddenHeaders),
        body: updatedBody ? JSON.parse(updatedBody) : null,
        language,
      });

      setCode(snippet || 'Error generating code');
    } catch (err) {
      let errorMessage: string;
      if (err instanceof Error) {
        errorMessage = err.message;
      } else {
        errorMessage = 'Unknown error';
      }
      setCode(errorMessage);
      addNotification({ message: errorMessage });
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
            text={t('generate')}
            buttonType="secondary"
            isDisabled={loading}
            showSpinner={loading}
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
