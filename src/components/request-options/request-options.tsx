'use client';

import { useTranslations } from 'next-intl';
import { BodyLanguage, Method } from '@/data';
import { IHeader } from '@/types';
import { useMemo, useState } from 'react';
import BodyEditor from '../body-editor/body-editor';
import CodeGenerator from '../code-generator/code-generator';
import Headers from '../headers/headers';
import Tabs from '../tabs';
import styles from './request-options.module.scss';

type RequestOptions = {
  body: string;
  setBody: (body: string) => void;
  headers: IHeader[];
  hiddenHeaders: IHeader[];
  setHeaders: (headers: IHeader[]) => void;
  url: string;
  method: Method;
  onLanguageChange?: (language: BodyLanguage) => void;
};

export default function RequestOptions({
  body,
  setBody,
  headers,
  hiddenHeaders,
  setHeaders,
  url,
  method,
  onLanguageChange,
}: RequestOptions) {
  const tabs = ['body', 'headers', 'code'];
  const t = useTranslations('client');
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const tabsList = useMemo(
    () => tabs.map((tab) => ({ value: tab, label: t(tab) })),
    [t]
  );

  return (
    <div className={styles.request}>
      <Tabs tabs={tabsList} activeTab={activeTab} onTabChange={setActiveTab}>
        {(() => {
          switch (activeTab) {
            case 'body':
              return (
                <BodyEditor
                  body={body}
                  setBody={setBody}
                  onLanguageChange={onLanguageChange}
                />
              );
            case 'headers':
              return <Headers headers={headers} setHeaders={setHeaders} />;
            case 'code':
              return (
                <CodeGenerator
                  url={url}
                  method={method}
                  body={body}
                  headers={headers}
                  hiddenHeaders={hiddenHeaders}
                />
              );
            default:
              return null;
          }
        })()}
      </Tabs>
    </div>
  );
}
