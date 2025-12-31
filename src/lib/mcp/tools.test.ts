import { describe, it, expect } from 'vitest';
import { rollDice, listStacks, getStack } from './tools';

describe('mcp tools', () => {
  it('rollDice returns appropriate content', () => {
    const res = rollDice(6);
    expect(res.content?.[0]?.text).toMatch(/You rolled a \d+/);
  });

  it('listStacks returns paginated results', () => {
    const res = listStacks({ limit: 2 });
    expect(res.items.length).toBeLessThanOrEqual(2);
    expect(typeof res.total).toBe('number');
  });

  it('getStack returns a stack by id', () => {
    const s = getStack('react');
    expect(s.id).toBe('react');
  });
});