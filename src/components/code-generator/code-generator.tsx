'use client';

import {
  useAppContext,
  useClientContext,
  useNotificationsContext,
} from '@/context';
import {
  SupportedLanguages,
  supportedLanguagesOptions,
} from '@/data/supported-languages';
import {
  formatHeaders,
  isValidURL,
  replaceVariables,
  generateCodeSnippet,
} from '@/utils';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { atomOneLight, CodeBlock } from 'react-code-blocks';
import { Button } from '../button';
import { Dropdown } from '../dropdown';
import { ScrollLayout } from '../scroll-layout';
import styles from './code-generator.module.scss';

export default function CodeGenerator() {
  const { url, body, method, headers, appDefaultHeaders } = useClientContext();
  const [language, setLanguage] = useState<SupportedLanguages>('curl');
  const [code, setCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { addNotification } = useNotificationsContext();
  const t = useTranslations('client');
  const tErrors = useTranslations('errors');

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
        setCode(tErrors('urlInvalid'));
        return;
      }

      const snippet = await generateCodeSnippet({
        method,
        url: updatedUrl,
        headers: formatHeaders(updatedHeaders, appDefaultHeaders),
        body: updatedBody ? JSON.parse(updatedBody) : null,
        language,
        unsupportedErrorMessage: tErrors('generatingCodeUnsupported'),
      });

      setCode(snippet || tErrors('generatingCode'));
    } catch (err) {
      let errorMessage: string;
      if (err instanceof Error) {
        errorMessage = err.message;
      } else {
        errorMessage = tErrors('unknown');
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
          wrapLongLines={true}
          showLineNumbers={false}
        />
      </div>
    </ScrollLayout>
  );
}
