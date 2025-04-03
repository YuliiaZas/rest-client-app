import { useEffect, useMemo, useState } from 'react';

export type UseLocalStorageArgs<T> = {
  key: string;
  defaultValue: T;
};

export function useLocalStorage<T>({
  key,
  defaultValue,
}: UseLocalStorageArgs<T>): [T, React.Dispatch<T>] {
  const isTypeArray = useMemo(
    () => Array.isArray(defaultValue),
    [defaultValue]
  );

  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return defaultValue;

    try {
      const value = window.localStorage.getItem(key);

      if (!value) return defaultValue;

      const parsedValue = JSON.parse(value);

      if (isTypeArray && !Array.isArray(parsedValue)) {
        window.localStorage.removeItem(key);
        return defaultValue;
      }

      return parsedValue;
    } catch (e) {
      console.warn('Error while getting value from localStorage', e);
      return defaultValue;
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const stringifiedValue = JSON.stringify(value);
    if (window.localStorage.getItem(key) === stringifiedValue) return;

    try {
      window.localStorage.setItem(key, stringifiedValue);
    } catch (error) {
      console.warn('Error while setting value to localStorage', error);
    }
  }, [key, value]);

  return [value, setValue];
}
