'use client';

import { IHeader } from '@/types';
import { useState } from 'react';
import BodyEditor from '../body-editor/body-editor';
import Headers from '../headers/headers';
import styles from './request-options.module.scss';

type RequestOptions = {
  body: string;
  setBody: (body: string) => void;
  headers: IHeader[];
  setHeaders: (headers: IHeader[]) => void;
};

export default function RequestOptions({
  body,
  setBody,
  headers,
  setHeaders,
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
      </div>
      <div className={styles.tabsContent}>
        {activeTab === 'body' ? (
          <BodyEditor body={body} setBody={setBody} />
        ) : (
          <Headers headers={headers} setHeaders={setHeaders} />
        )}
      </div>
    </div>
  );
}
