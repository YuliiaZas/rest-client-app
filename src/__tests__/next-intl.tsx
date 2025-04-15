import { vi } from 'vitest';

vi.mock('next-intl', () => ({
  useTranslations: vi.fn().mockImplementation(() => {
    const t = (key: string) => key;
    t.has = vi.fn((key: string) => key);

    return t;
  }),
}));
