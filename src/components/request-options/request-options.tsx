'use client';

import { Method } from '@/data';
import { IHeader } from '@/types';
import { useState } from 'react';
import BodyEditor from '../body-editor/body-editor';
import CodeGenerator from '../code-generator/code-generator';
import Headers from '../headers/headers';
import styles from './request-options.module.scss';

type RequestOptions = {
  body: string;
  setBody: (body: string) => void;
  headers: IHeader[];
  setHeaders: (headers: IHeader[]) => void;
  url: string;
  method: Method;
};

export default function RequestOptions({
  body,
  setBody,
  headers,
  setHeaders,
  url,
  method,
}: RequestOptions) {
  const [activeTab, setActiveTab] = useState('body');

  return (
    <div className={styles.tabContainer}>
      <div className={styles.tabHeader}>
        <button
          className={
            activeTab === 'body' ? `${styles.tab} ${styles.active}` : styles.tab
          }
          onClick={() => setActiveTab('body')}
        >
          Body
        </button>
        <button
          className={
            activeTab === 'headers'
              ? `${styles.tab} ${styles.active}`
              : styles.tab
          }
          onClick={() => setActiveTab('headers')}
        >
          Headers
        </button>
        <button
          className={
            activeTab === 'code' ? `${styles.tab} ${styles.active}` : styles.tab
          }
          onClick={() => setActiveTab('code')}
        >
          Code
        </button>
      </div>
      <div className={styles.tabsContent}>
        {activeTab === 'body' ? (
          <BodyEditor body={body} setBody={setBody} />
        ) : activeTab === 'headers' ? (
          <Headers headers={headers} setHeaders={setHeaders} />
        ) : (
          <CodeGenerator
            url={url}
            method={method}
            body={body}
            headers={headers}
          />
        )}
      </div>
    </div>
  );
}
