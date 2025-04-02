'use client';

import clsx from 'clsx';
import { TabsItem } from '@/entites/tabs-item';
import styles from './tabs.module.scss';

type TabsProps = {
  tabs: TabsItem[];
  activeTab: TabsItem['value'];
  contentHeaderChildren?: React.ReactNode;
  children: React.ReactNode;
  onTabChange: (tab: TabsItem['value']) => void;
};

export default function Tabs({
  tabs,
  activeTab,
  contentHeaderChildren,
  children,
  onTabChange,
}: TabsProps) {
  return (
    <div className={styles.tabs__wrapper}>
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={clsx(
              styles.tabs__tab,
              activeTab === tab.value && styles.tabs__tab_active
            )}
            onClick={() => onTabChange(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={styles.tabs__content}>
        {contentHeaderChildren && <div>{contentHeaderChildren}</div>}
        {children}
      </div>
    </div>
  );
}
