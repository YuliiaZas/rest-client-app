import { vi } from 'vitest';
import { ReactNode } from 'react';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn().mockReturnValue({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
  useSearchParams: vi.fn().mockReturnValue(new URLSearchParams()),
  usePathname: vi.fn(),
}));

vi.mock('next/image', () => ({
  default: (props: { src: string; alt: string; [key: string]: unknown }) => {
    const { src, alt, ...rest } = props;
    return <img src={src} alt={alt} {...rest} />;
  },
}));

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));
