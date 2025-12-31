import { TechStack } from '../../types/tech-stack';
import { techStacks } from '../../data/tech-stacks';

export function rollDice(sides: number) {
  if (!Number.isInteger(sides) || sides < 2) throw new Error('sides must be an integer >= 2');
  const value = 1 + Math.floor(Math.random() * sides);
  return { content: [{ type: 'text', text: `🎲 You rolled a ${value}!` }] };
}

export function listStacks(opts?: { category?: string; limit?: number; offset?: number }) {
  let items: TechStack[] = techStacks;
  if (opts?.category) items = items.filter((s) => s.category === opts.category);
  const limit = opts?.limit ?? 20;
  const offset = opts?.offset ?? 0;
  const page = items.slice(offset, offset + limit);
  return { total: items.length, limit, offset, items: page };
}

export function getStack(id: string) {
  const found = techStacks.find((s) => s.id === id);
  if (!found) throw new Error('stack not found');
  return found;
}
