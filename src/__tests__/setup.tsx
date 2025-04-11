import { beforeEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

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
  useTranslations: vi.fn().mockReturnValue((v: string) => v),
}));

vi.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: vi.fn(),
  getAuth: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
}));

beforeEach(() => {
  cleanup();
});
