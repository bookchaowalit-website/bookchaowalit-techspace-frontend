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

export function searchStacks(opts: { q: string; field?: 'name'|'description'|'tags'; limit?: number } ) {
  const q = (opts.q || '').toLowerCase().trim();
  const field = opts.field || 'name';
  const limit = opts.limit ?? 20;
  if (!q) return { total: 0, limit, offset: 0, items: [] };

  function scoreItem(s: TechStack) {
    let score = 0;
    const name = s.name.toLowerCase();
    const desc = (s.description || '').toLowerCase();
    const tags = (s.tags || []).map(String);
    if (field === 'name' || field === 'description') {
      if (name.includes(q)) score += 2;
      if (desc.includes(q)) score += 1;
      for (const t of tags) if (t.includes(q)) score += 1;
    } else {
      // tags
      for (const t of tags) if (t.includes(q)) score += 2;
      if (name.includes(q)) score += 1;
      if (desc.includes(q)) score += 1;
    }
    return score;
  }

  const scored = techStacks
    .map((s) => ({ s, score: scoreItem(s) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => ({ ...x.s, score: x.score }));

  return { total: scored.length, limit, offset: 0, items: scored };
}

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function siteSummary() {
  const total = techStacks.length;
  const byCategory: Record<string, number> = {};
  for (const s of techStacks) byCategory[s.category] = (byCategory[s.category] || 0) + 1;
  const newest = [...techStacks].sort((a,b)=> (b.dateAdded || '').localeCompare(a.dateAdded || ''))[0];
  const lastUsed = [...techStacks].sort((a,b)=> (b.lastUsed || '').localeCompare(a.lastUsed || ''))[0];
  return { total, byCategory, newest: newest?.id ?? null, lastUsed: lastUsed?.id ?? null };
}

export function pageSummary(relPath: string, excerptLength = 300) {
  // Normalize path from content/ root
  const base = path.resolve(process.cwd(), 'content');
  let full = path.resolve(base, relPath);
  if (!fs.existsSync(full)) {
    // try adding .mdx
    if (fs.existsSync(`${full}.mdx`)) full = `${full}.mdx`;
    else if (fs.existsSync(`${full}.md`)) full = `${full}.md`;
  }
  if (!fs.existsSync(full)) throw new Error('page not found');
  const raw = fs.readFileSync(full, 'utf8');
  const parsed = matter(raw);
  const title = parsed.data?.title || path.basename(full);
  // extract headings from content
  const lines = parsed.content.split('\n');
  const headings = lines.filter((l) => l.trim().startsWith('#')).map((h) => h.replace(/^#+\s*/, '').trim());
  // simple strip of code blocks and MDX tags
  let text = parsed.content.replace(/```[\s\S]*?```/g, '').replace(/<[^>]+>/g, '');
  text = text.replace(/\{\{[^}]*\}\}/g, '');
  const excerpt = text.replace(/\s+/g, ' ').trim().slice(0, excerptLength);
  const stat = fs.statSync(full);
  return { title, excerpt, headings, path: path.relative(base, full), lastModified: stat.mtime.toISOString() };
}

export function renderStackMarkdown(id: string) {
  const s = getStack(id);
  const lines = [];
  lines.push(`# ${s.name}`);
  if (s.description) lines.push('', s.description);
  lines.push('', `- Category: ${s.category}`);
  if (s.tags && s.tags.length) lines.push(`- Tags: ${s.tags.join(', ')}`);
  if (s.url) lines.push(`- URL: ${s.url}`);
  if (s.notes) lines.push('', '## Notes', '', s.notes);
  return lines.join('\n');
}
