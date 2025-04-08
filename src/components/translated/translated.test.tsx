import { beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { Translated } from './translated';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => `translated(${key})`,
}));

describe('Translated', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('renders translated text when scope and text are provided', () => {
    const { getByText } = render(<Translated scope="common" text="greeting" />);
    expect(getByText('translated(greeting)')).toBeDefined();
  });

  it('returns null when text is not provided', () => {
    const { container } = render(<Translated scope="common" text="" />);
    expect(container.innerHTML).toBeFalsy();
  });

  it('returns null when scope is not provided', () => {
    const { container } = render(<Translated scope="" text="greeting" />);
    expect(container.innerHTML).toBeFalsy();
  });
});
