'use client';

import { useClientContext } from '@/context';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import BodyEditor from '../body-editor/body-editor';
import CodeGenerator from '../code-generator/code-generator';
import Headers from '../headers/headers';
import Tabs from '../tabs';
import styles from './request-options.module.scss';

export default function RequestOptions() {
  const { body } = useClientContext();
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
              return <BodyEditor body={body} />;
            case 'headers':
              return <Headers />;
            case 'code':
              return <CodeGenerator />;
            default:
              return null;
          }
        })()}
      </Tabs>
    </div>
  );
}
