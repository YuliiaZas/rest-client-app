'use client';

import clsx from 'clsx';
import { TabsItem } from '@/entites/tabs-item';
import styles from './tabs.module.scss';

type TabsProps = {
  tabs: TabsItem[];
  activeTab: TabsItem['value'];
  children: React.ReactNode;
  onTabChange: (tab: TabsItem['value']) => void;
};

export default function Tabs({
  tabs,
  activeTab,
  children,
  onTabChange,
}: TabsProps) {
  return (
    <div role="tab" className={styles.tabs__wrapper}>
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
      <div className={styles.tabs__content}>{children}</div>
    </div>
  );
}
