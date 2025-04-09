'use client';

import { contentTypeHeaderJson, defaultHeaders, Method } from '@/data';
import { UnionErrorType } from '@/entites';
import { useFormattedParams } from '@/hooks';
import { IHeader, IResponse } from '@/types';
import { createContext, ReactNode, useContext, useState } from 'react';

type ClientContextType = {
  url: string;
  body: string;
  method: Method;
  headers: IHeader[];
  headerParams: string;
  setUrl: (url: string) => void;
  setBody: (body: string) => void;
  setMethod: React.Dispatch<React.SetStateAction<Method>>;
  setHeaders: (headers: IHeader[]) => void;
  setHeaderParams: React.Dispatch<React.SetStateAction<string>>;
  response: IResponse | null;
  setResponse: (response: IResponse | null) => void;
  appDefaultHeaders: IHeader[];
  setAppDefaultHeaders: (headers: IHeader[]) => void;
  error: UnionErrorType | null;
  setError: (error: UnionErrorType | null) => void;
};

type ClientProviderProps = {
  children: ReactNode;
  params: Promise<{ params: string[] }>;
};

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export function ClientProvider({ children, params }: ClientProviderProps) {
  const [error, setError] = useState<UnionErrorType | null>(null);
  const formattedParams = useFormattedParams(params);
  const [response, setResponse] = useState<IResponse | null>(null);
  const [appDefaultHeaders, setAppDefaultHeaders] = useState<IHeader[]>([
    ...defaultHeaders,
    contentTypeHeaderJson,
  ]);

  return (
    <ClientContext.Provider
      value={{
        ...formattedParams,
        response,
        setResponse,
        appDefaultHeaders,
        setAppDefaultHeaders,
        error,
        setError,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}

export const useClientContext = (): ClientContextType => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error('useClientContext must be used within an ClientContext');
  }
  return context;
};
