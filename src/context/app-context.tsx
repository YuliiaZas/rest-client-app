'use client';

import { useSession } from 'next-auth/react';
import { Spinner } from '@/components';
import { useLocalStorage } from '@/hooks';
import { Variables } from '@/types';
import { VariablesStore } from '@/types/variable.type';
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

interface AppContextProps {
  variables: Variables;
  variablesStore: VariablesStore;
  setVariablesStore: React.Dispatch<VariablesStore>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const { status } = useSession();

  const [variablesStore, setVariablesStore] = useLocalStorage<VariablesStore>({
    key: 'variables',
    defaultValue: {},
  });
  const [variables, setVariables] = useState<Record<string, string>>({});

  useEffect(() => {
    const updatedVariables: Record<string, string> = {};
    Object.values(variablesStore).forEach((variable) => {
      updatedVariables[variable.name] = variable.value;
    });
    setVariables(updatedVariables);
  }, [variablesStore]);

  if (status === 'loading') {
    return <Spinner />;
  }

  return (
    <AppContext.Provider
      value={{ variables, variablesStore, setVariablesStore }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
