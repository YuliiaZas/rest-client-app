import { useEffect, useState } from 'react';

export type UseLocalStorageArgs<T> = {
  key: string;
  defaultValue: T;
};

export function useLocalStorage<T>({
  key,
  defaultValue,
}: UseLocalStorageArgs<T>): [T, (value: T) => void] {
  const [currentValue, setCurrentValue] = useState<T>(() => {
    if (typeof window === 'undefined') return defaultValue;

    return getParsedValue(window.localStorage.getItem(key)) || defaultValue;
  });

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        const newValue = getParsedValue(event.newValue);
        if (newValue !== null) setCurrentValue(newValue);
      }
    };

    window?.addEventListener('storage', handleStorageChange);

    return () => {
      window?.removeEventListener('storage', handleStorageChange);
    };
  }, [key, defaultValue]);

  function getParsedValue(value: string | null): T | null {
    if (value === null) return null;
    try {
      const parsedValue = JSON.parse(value);
      if (Array.isArray(defaultValue) && !Array.isArray(parsedValue)) {
        window.localStorage.removeItem(key);
        return null;
      }
      return parsedValue;
    } catch (e) {
      console.error('Error while parsing localStorage value', e);
      return null;
    }
  }

  function setValue(newValue: T): void {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error('Error while setting value to localStorage', error);
    }
    setCurrentValue(newValue);
  }

  return [currentValue, setValue];
}
