import styles from './footer.module.scss';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <ul>
        <li>
          <a
            href="https://github.com/users/YuliiaZas/projects/1"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </li>
        <li>2025</li>
        <li>
          <a
            href="https://github.com/rolling-scopes-school/tasks/blob/master/react/assets/rss-logo.svg"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src="/assets/rss-logo.svg"
              alt="RS School logo"
              width={20}
              height={20}
            />
          </a>
        </li>
      </ul>
    </footer>
  );
}
