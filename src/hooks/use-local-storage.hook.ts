import { AppError } from '@/entites';
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
      if (
        (Array.isArray(defaultValue) && !Array.isArray(parsedValue)) ||
        (!Array.isArray(defaultValue) && Array.isArray(parsedValue))
      ) {
        throw new AppError('wrongTypeLS');
      }
      return parsedValue;
    } catch (error: unknown) {
      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError('parseLS');
    }
  }

  function setValue(newValue: T): void {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch {
      throw new AppError('saveLS');
    }
    setCurrentValue(newValue);
  }

  return [currentValue, setValue];
}
