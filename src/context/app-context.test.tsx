import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { AppProvider, useAppContext } from './app-context';
import { useLocalStorage } from '@/hooks';

vi.mock('@/components', () => ({
  Spinner: () => <div data-testid="spinner">Loading...</div>,
}));

const variable = {
  name: 'test',
  value: '123',
  id: 'id',
};

const variableInStore = {
  [variable.id]: variable,
};

describe('AppProvider', () => {
  const TestComponent = () => {
    const { variables, variablesStore, setVariablesStore } = useAppContext();

    return (
      <div>
        <p data-testid="variables">{JSON.stringify(variables)}</p>
        <p data-testid="variablesStore">{JSON.stringify(variablesStore)}</p>
        <button
          data-testid="update-variablesStore"
          onClick={() => setVariablesStore(variableInStore)}
        >
          Update Variables Store
        </button>
      </div>
    );
  };

  it('renders the spinner when session is loading', () => {
    vi.mocked(useSession).mockReturnValue({
      status: 'loading',
      update: vi.fn(),
      data: null,
    });

    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    expect(screen.getByTestId('spinner')).toBeDefined();
  });

  it('provides default context values', () => {
    vi.mocked(useSession).mockReturnValue({
      status: 'authenticated',
      update: vi.fn(),
      data: {} as Session,
    });

    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    expect(screen.getByTestId('variables').textContent).toBe('{}');
    expect(screen.getByTestId('variablesStore').textContent).toBe('{}');
  });

  it('updates variables when variablesStore changes', () => {
    vi.mocked(useLocalStorage).mockReturnValue([variableInStore, vi.fn()]);

    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    expect(screen.getByTestId('variables').textContent).toBe(
      JSON.stringify({ [variable.name]: variable.value })
    );
  });

  it('calls setVariablesStore when updating variablesStore', () => {
    const setVariablesStoreMock = vi.fn();
    vi.mocked(useLocalStorage).mockReturnValue([{}, setVariablesStoreMock]);

    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    const updateButton = screen.getByTestId('update-variablesStore');

    act(() => {
      updateButton.click();
    });

    expect(setVariablesStoreMock).toHaveBeenCalledWith(variableInStore);
  });
});
