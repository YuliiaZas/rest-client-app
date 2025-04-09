import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { addNotification, mockContext } from '@/__tests__/mocks/mockContext';
import { isValidURL, generateCodeSnippet } from '@/utils';
import CodeGenerator from './code-generator';

mockContext();

const mockGeneratedCode = 'Generated Code';
const mockReplacedVariables = {
  updatedUrl: 'https://example.com',
  updatedBody: '{"key":"value"}',
  updatedHeaders: { Authorization: 'Bearer token' },
};
vi.mock('@/utils', () => ({
  formatHeaders: vi.fn(),
  isValidURL: vi.fn(() => true),
  replaceVariables: vi.fn(() => mockReplacedVariables),
  generateCodeSnippet: vi.fn(() => mockGeneratedCode),
}));

describe('CodeGenerator', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the component', () => {
    const { getByText } = render(<CodeGenerator />);

    expect(getByText(/generate/i)).toBeDefined();
  });

  it('generates code snippet on button click', async () => {
    const mockIsValidURL = isValidURL as Mock;
    const mockGenerateCodeSnippet = generateCodeSnippet as Mock;

    const { getByText } = render(<CodeGenerator />);

    fireEvent.click(getByText(/generate/i));

    await waitFor(() => {
      expect(mockIsValidURL).toHaveBeenCalledWith('https://example.com');
      expect(mockGenerateCodeSnippet).toHaveBeenCalled();
      expect(getByText('Generated Code')).toBeDefined();
    });
  });

  it('shows error message for invalid URL', async () => {
    (isValidURL as Mock).mockResolvedValueOnce(false);

    const { getByText } = render(<CodeGenerator />);

    fireEvent.click(getByText(/generate/i));

    await waitFor(() => {
      expect(getByText(/urlInvalid/i)).toBeDefined();
    });
  });

  it('handles errors during code generation', async () => {
    (generateCodeSnippet as Mock).mockRejectedValueOnce(
      new Error('Error generating code')
    );

    const { getByText } = render(<CodeGenerator />);

    fireEvent.click(getByText(/generate/i));

    await waitFor(() => {
      expect(addNotification).toHaveBeenCalledWith({
        message: 'Error generating code',
      });
      expect(getByText(/Error generating code/i)).toBeDefined();
    });
  });
});
