import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Translated } from './translated';

vi.mock('next-intl', () => ({
  useTranslations: (scope: string) => {
    const messages: Record<string, string> = {
      greeting: 'Hello',
    };
    const t = (key: string) =>
      key in messages ? messages[key] : `${scope}.${key}`;
    t.has = (key: string) => key in messages;
    return t;
  },
}));

describe('Translated', () => {
  it('renders translated text when scope and text are provided', () => {
    const { getByText } = render(<Translated scope="common" text="greeting" />);
    expect(getByText('Hello')).toBeDefined();
  });

  it('returns null when text is not provided', () => {
    const { container } = render(<Translated scope="common" text="" />);
    expect(container.innerHTML).toBeFalsy();
  });

  it('returns null when scope is not provided', () => {
    const { container } = render(<Translated scope="" text="greeting" />);
    expect(container.innerHTML).toBeFalsy();
  });

  it('returns null when key for text is absent in messages', () => {
    const { container } = render(<Translated scope="common" text="missed" />);
    expect(container.innerHTML).toBeFalsy();
  });

  it('returns not translated text when scope is not provided when should show default text', () => {
    const { getByText } = render(
      <Translated scope="" text="greeting" showRawTextByDefault={true} />
    );
    expect(getByText('greeting')).toBeDefined();
  });

  it('returns not translated text when key for text is absent in messages when should show default text', () => {
    const { getByText } = render(
      <Translated scope="common" text="missed" showRawTextByDefault={true} />
    );
    expect(getByText('missed')).toBeDefined();
  });
});
