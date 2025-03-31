import { AppTheme } from '@/entites';
import { useEffect, useState } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState<AppTheme>(AppTheme.light);

  useEffect(() => {
    const body = document.body;
    if (theme === AppTheme.dark) {
      body.classList.remove(AppTheme.light);
      body.classList.add(AppTheme.dark);
    } else {
      body.classList.remove(AppTheme.dark);
      body.classList.add(AppTheme.light);
    }
  }, [theme]);

  return { theme, setTheme };
};
