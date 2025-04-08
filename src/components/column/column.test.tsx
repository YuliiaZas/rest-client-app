import { describe, expect, it } from 'vitest';
import { Column } from './column';

describe('Column', () => {
  it('should return the type passed as a prop', () => {
    const type = 'text';
    const title = 'test';
    const body = (data: string) => <span>{data}</span>;
    const result = Column<string>({ type, title, body });
    expect(result).toBe(type);
  });
});
