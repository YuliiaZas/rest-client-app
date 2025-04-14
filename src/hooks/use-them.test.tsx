import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useTheme } from './use-theme';
import { AppTheme } from '@/entites';

describe('useTheme', () => {
  it('provides the default theme', () => {
    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe(AppTheme.light);
  });

  it('applies the default theme to document.body', () => {
    renderHook(() => useTheme());

    expect(document.body.classList.contains(AppTheme.light)).toBe(true);
    expect(document.body.classList.contains(AppTheme.dark)).toBe(false);
  });

  it('updates the theme to dark', () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.setTheme(AppTheme.dark);
    });

    expect(result.current.theme).toBe(AppTheme.dark);

    expect(document.body.classList.contains(AppTheme.dark)).toBe(true);
    expect(document.body.classList.contains(AppTheme.light)).toBe(false);
  });

  it('updates the theme back to light', () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.setTheme(AppTheme.dark);
    });

    act(() => {
      result.current.setTheme(AppTheme.light);
    });

    expect(result.current.theme).toBe(AppTheme.light);

    expect(document.body.classList.contains(AppTheme.light)).toBe(true);
    expect(document.body.classList.contains(AppTheme.dark)).toBe(false);
  });
});
