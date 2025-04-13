import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ScrollLayout } from '@/components';

describe('ScrollLayout', () => {
  it('renders correctly with children and a header', () => {
    render(
      <ScrollLayout
        headerChildren={<div>Header</div>}
        scrollOnWholeLayout={false}
      >
        <div>Content</div>
      </ScrollLayout>
    );
    expect(screen.getByText('Header')).toBeDefined();
    expect(screen.getByText('Content')).toBeDefined();
    expect(
      screen
        .getByText('Header')
        ?.parentElement?.className.includes('layout__header')
    ).toBeTruthy();
    expect(
      screen
        .getByText('Content')
        ?.parentElement?.className.includes('layout__content')
    ).toBeTruthy();
  });

  it('applies scroll class to the entire layout when "scrollOnWholeLayout" is true', () => {
    render(
      <ScrollLayout
        headerChildren={<div>Header</div>}
        scrollOnWholeLayout={true}
      >
        <div>Content</div>
      </ScrollLayout>
    );
    const layout = screen.getByText('Header').parentElement?.parentElement;
    expect(layout?.className.includes('layout__scroll')).toBeTruthy();
  });
});
