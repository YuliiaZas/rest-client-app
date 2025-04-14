import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useSession } from 'next-auth/react';
import { useLocalStorage } from '@/hooks';
import { Session } from 'next-auth';
import { useAppContext, AppProvider } from './app-context';

vi.mock('next-auth/react', () => ({
  useSession: vi.fn(() => ({
    status: 'loading',
    update: vi.fn(),
    data: {} as Session,
  })),
}));

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

vi.mock('@/hooks', () => ({
  useLocalStorage: vi.fn().mockReturnValue([{}, vi.fn()]),
}));

describe('AppProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockUseSession = vi.mocked(useSession);
  const mockUseLocalStorage = vi.mocked(useLocalStorage);

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
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    expect(screen.getByTestId('spinner')).toBeDefined();
  });

  it('provides default context values', () => {
    mockUseSession.mockImplementation(() => ({
      status: 'authenticated',
      update: vi.fn(),
      data: {} as Session,
    }));

    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    expect(screen.getByTestId('variables').textContent).toBe('{}');
    expect(screen.getByTestId('variablesStore').textContent).toBe('{}');
  });

  it('updates variables when variablesStore changes', () => {
    mockUseLocalStorage.mockReturnValue([variableInStore, vi.fn()]);

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
    mockUseLocalStorage.mockReturnValue([{}, setVariablesStoreMock]);

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
