import { describe, it, expect } from 'vitest';
import { rollDice, listStacks, getStack, searchStacks, siteSummary, pageSummary, renderStackMarkdown } from './tools';

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

  it('searchStacks finds items and returns scores', () => {
    const r = searchStacks({ q: 'react', field: 'name', limit: 5 });
    expect(r.items.length).toBeGreaterThan(0);
    expect(r.items[0].id).toBeDefined();
    expect((r.items[0] as any).score).toBeGreaterThanOrEqual(1);
  });

  it('siteSummary returns totals and categories', () => {
    const s = siteSummary();
    expect(typeof s.total).toBe('number');
    expect(typeof s.byCategory).toBe('object');
  });

  it('pageSummary reads a content file and returns excerpt/headings', () => {
    const p = pageSummary('stacks/ai-ml/databricks.mdx', 200);
    expect(p.path).toMatch(/stacks\//);
    expect(typeof p.excerpt).toBe('string');
    expect(Array.isArray(p.headings)).toBe(true);
    expect(p.lastModified).toBeDefined();
  });

  it('renderStackMarkdown returns markdown text', () => {
    const md = renderStackMarkdown('react');
    expect(md.includes('# React')).toBe(true);
  });
});