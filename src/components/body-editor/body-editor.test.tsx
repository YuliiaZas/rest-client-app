import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import {
  addNotification,
  setAppDefaultHeaders,
  setBody,
} from '@/__tests__/mocks/mockContext';
import BodyEditor from './body-editor';
import {
  contentTypeHeaderJson,
  contentTypeHeaderText,
  defaultHeaders,
} from '@/data';

vi.mock('@monaco-editor/react', () => ({
  default: vi.fn(({ value, onChange }) => (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      data-testid="monaco-editor-mock"
    />
  )),
}));

vi.mock('@/utils', () => ({
  updateUrl: vi.fn(),
}));

describe('BodyEditor', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the BodyEditor component', () => {
    const { getByDisplayValue } = render(
      <BodyEditor body='{"key":"value"}' readOnly={false} />
    );

    expect(getByDisplayValue(/{"key":"value"}/)).toBeDefined();
  });

  it('formats JSON body when readOnly is true', () => {
    const { getByDisplayValue } = render(
      <BodyEditor body='{"key":"value"}' readOnly={true} />
    );

    expect(getByDisplayValue(/"key": "value"/)).toBeDefined();
  });

  it('shows a notification when JSON parsing fails', () => {
    render(<BodyEditor body="invalid-json" readOnly={true} />);

    expect(addNotification).toHaveBeenCalledWith({ message: 'parseBody' });
  });

  it('allows editing the body when readOnly is false', () => {
    const { getByRole } = render(
      <BodyEditor body='{"key":"value"}' readOnly={false} />
    );

    const editor = getByRole('textbox');
    fireEvent.change(editor, { target: { value: '{"key":"newValue"}' } });

    expect(setBody).toHaveBeenCalledWith('{"key":"newValue"}');
  });

  it('updates the language when a new option is selected', () => {
    const { getByText } = render(
      <BodyEditor body='{"key":"value"}' readOnly={false} />
    );

    const dropdown = getByText(/JSON/i);
    fireEvent.click(dropdown);
    const stringOption = getByText(/String/i);
    fireEvent.click(stringOption);

    expect(getByText(/String/i)).toBeDefined();
    expect(setAppDefaultHeaders).toHaveBeenCalledWith([
      ...defaultHeaders,
      contentTypeHeaderText,
    ]);

    fireEvent.click(getByText(/String/i));
    fireEvent.click(getByText(/JSON/i));
    expect(setAppDefaultHeaders).toHaveBeenCalledWith([
      ...defaultHeaders,
      contentTypeHeaderJson,
    ]);
  });
});
