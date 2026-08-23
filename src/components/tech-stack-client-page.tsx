'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowUpRight, BookOpen, ChevronDown, Code2, ExternalLink, Search, SlidersHorizontal, Star, X } from 'lucide-react';
import { categories, experienceLevels, statuses } from '@/data/tech-stacks';
import { TechFilter, TechStack } from '@/types/tech-stack';

interface TechStackClientPageProps { techStacks: TechStack[]; isLoading?: boolean; }

export function TechStackClientPage({ techStacks, isLoading = false }: TechStackClientPageProps) {
  const [filter, setFilter] = useState<TechFilter>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const filteredTechStacks = useMemo(() => techStacks.filter((stack) => {
    const query = searchTerm.toLowerCase();
    const matchesSearch = !query || [stack.name, stack.description, stack.category, ...stack.tags].some((value) => value.toLowerCase().includes(query));
    return matchesSearch && (!filter.category || stack.category === filter.category) && (!filter.status || stack.status === filter.status) && (!filter.experience || stack.experience === filter.experience) && (!filter.minRating || stack.rating >= filter.minRating);
  }), [filter, searchTerm, techStacks]);
  const usingNow = techStacks.filter((stack) => stack.status === 'Using Now').length;
  const activeFilters = Object.values(filter).filter(Boolean).length;

  const updateFilter = (key: keyof TechFilter, value: string | number) => setFilter((current) => ({ ...current, [key]: value === 'all' ? undefined : value }));
  const clearFilters = () => setFilter({});

  return (
    <div className="techspace-shell">
      <header className="techspace-header">
        <Link href="/" className="techspace-brand"><span className="techspace-rule-mark"><i /><i /><i /></span><span><strong>TECHSPACE</strong><small>the working reference</small></span></Link>
        <div className="techspace-search"><Search size={15} /><input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="search the reference..." aria-label="Search technology stacks" />{searchTerm && <button onClick={() => setSearchTerm('')} aria-label="Clear search"><X size={14} /></button>}</div>
        <div className="techspace-header-meta"><span>INDEX / 01</span><span>LOCAL DATA</span></div>
      </header>

      <main className="techspace-main">
        <section className="techspace-hero"><div><p className="techspace-kicker">BOOK / TECHNOLOGY REFERENCE</p><h1>Tools with<br /><em>receipts.</em></h1><p className="techspace-lede">A working catalog of frameworks, services, and instruments actually used across the studio. Open a line to see the note behind the name.</p></div><div className="techspace-hero-note"><span>REFERENCE NOTE 001</span><p>Every entry is a decision in context — not a badge, not a leaderboard.</p><div className="techspace-rail-line"><b /><b /><b /><b /><b /></div><small>last indexed / local source</small></div></section>

        <section className="techspace-index-bar"><div><span className="techspace-index-big">{String(filteredTechStacks.length).padStart(2, '0')}</span><span>of {techStacks.length} entries shown</span></div><div className="techspace-index-stats"><span><b>{usingNow}</b> in use</span><span><b>{new Set(techStacks.map((stack) => stack.category)).size}</b> domains</span></div><button className="techspace-filter-toggle" onClick={() => setShowFilters((open) => !open)}><SlidersHorizontal size={14} /> filters {activeFilters ? `(${activeFilters})` : ''}</button></section>

        <div className="techspace-layout">
          <aside className={`techspace-filters ${showFilters ? 'is-open' : ''}`}><div className="techspace-filter-title"><span>FILTER REGISTER</span><button onClick={clearFilters}>reset</button></div><FilterSelect label="category" value={filter.category || 'all'} options={categories} onChange={(value) => updateFilter('category', value)} /><FilterSelect label="status" value={filter.status || 'all'} options={statuses} onChange={(value) => updateFilter('status', value)} /><FilterSelect label="experience" value={filter.experience || 'all'} options={experienceLevels} onChange={(value) => updateFilter('experience', value)} /><div className="techspace-filter-group"><span>minimum rating</span><div className="techspace-rating-filter">{[1, 2, 3, 4, 5].map((rating) => <button key={rating} className={filter.minRating === rating ? 'selected' : ''} onClick={() => updateFilter('minRating', filter.minRating === rating ? 0 : rating)} aria-label={`${rating} stars minimum`}><Star size={13} fill={filter.minRating && filter.minRating >= rating ? 'currentColor' : 'none'} /></button>)}</div></div><div className="techspace-filter-foot"><span>source</span><code>src/data + MDX</code></div></aside>

          <section className="techspace-results" aria-label="Technology reference entries">{isLoading ? <p className="techspace-empty">loading reference...</p> : filteredTechStacks.length === 0 ? <div className="techspace-empty"><BookOpen size={28} /><h2>No entry on this line.</h2><p>Try a wider filter or clear the register.</p></div> : filteredTechStacks.map((stack, index) => <TechEntry key={stack.id} stack={stack} index={index} />)}</section>
        </div>
      </main>
    </div>
  );
}

function FilterSelect({ label, value, options, onChange }: { label: string; value: string; options: readonly string[]; onChange: (value: string) => void }) {
  return <label className="techspace-filter-group"><span>{label}</span><div className="techspace-select-wrap"><select value={value} onChange={(event) => onChange(event.target.value)} aria-label={label}><option value="all">all {label}s</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select><ChevronDown size={13} /></div></label>;
}

function TechEntry({ stack, index }: { stack: TechStack; index: number }) {
  return <Link href={`/stack/${stack.id}`} className="techspace-entry"><div className="techspace-entry-index">{String(index + 1).padStart(2, '0')}</div><div className="techspace-entry-mark"><Code2 size={18} /></div><div className="techspace-entry-main"><div className="techspace-entry-title"><div><h2>{stack.name}</h2><span>{stack.category} / {stack.status}</span></div><ArrowUpRight size={17} /></div><p className="techspace-entry-desc">{stack.description}</p><div className="techspace-entry-meta"><span className="techspace-status"><i /> {stack.experience}</span>{stack.rating > 0 && <span className="techspace-stars">{Array.from({ length: 5 }, (_, star) => <Star key={star} size={12} fill={star < stack.rating ? 'currentColor' : 'none'} />)} <b>{stack.rating}/5</b></span>}<span className="techspace-tags">{stack.tags.slice(0, 4).map((tag) => <em key={tag}>{tag}</em>)}</span></div></div><div className="techspace-entry-note"><span>FIELD NOTE</span><p>{stack.notes || 'No note recorded yet.'}</p>{stack.url && <span className="techspace-entry-link"><ExternalLink size={12} /> source link</span>}</div></Link>;
}
