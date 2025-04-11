import { beforeEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import { ReactNode } from 'react';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

vi.mock('next/image', () => ({
  default: (props: { src: string; alt: string; [key: string]: unknown }) => {
    const { src, alt, ...rest } = props;
    return <img src={src} alt={alt} {...rest} />;
  },
}));

vi.mock('next-intl', () => ({
  useTranslations: vi.fn().mockImplementation(() => {
    const t = (key: string) => key;
    t.has = vi.fn((key: string) => key);

    return t;
  }),
}));

vi.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: vi.fn(),
  getAuth: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
}));

vi.mock('next-auth/react', () => ({
  useSession: vi.fn(),
  signOut: vi.fn(),
}));

vi.mock('next/link', () => ({
  default: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

beforeEach(() => {
  cleanup();
});
