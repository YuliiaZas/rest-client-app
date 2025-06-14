import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Modal } from './modal';

vi.mock('@/components', () => ({
  Button: ({ onClick, icon }: { onClick: () => void; icon: string }) => (
    <button onClick={onClick}>{icon}</button>
  ),
}));

describe('Modal Component', () => {
  it('renders the modal with title and children', () => {
    render(
      <Modal title="Test Title" action={() => {}}>
        <p>Test Content</p>
      </Modal>
    );

    expect(screen.getByText('Test Title')).toBeDefined();
    expect(screen.getByText('Test Content')).toBeDefined();
  });

  it('calls the action callback when close button is clicked', () => {
    const mockAction = vi.fn();
    render(
      <Modal title="Test Title" action={mockAction}>
        <p>Test Content</p>
      </Modal>
    );

    const closeButton = screen.getByText('close');
    closeButton.click();

    expect(mockAction).toHaveBeenCalledTimes(1);
  });
});
