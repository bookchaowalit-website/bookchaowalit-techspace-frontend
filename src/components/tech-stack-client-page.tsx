'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/header';
import { FilterSidebar } from '@/components/filter-sidebar';
import { TechStackCard } from '@/components/tech-stack-card';
import { TechStackListItem } from '@/components/tech-stack-list-item';
import { TechStack, TechFilter } from '@/types/tech-stack';
import { GridIcon, ListIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface TechStackClientPageProps {
  techStacks: TechStack[];
}

export function TechStackClientPage({ techStacks }: TechStackClientPageProps) {
  const [filter, setFilter] = useState<TechFilter>({});
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

    // Filter tech stacks based on current filters
  const filteredTechStacks = useMemo(() => {
    return techStacks.filter((stack) => {
      // Category filter
      if (filter.category && stack.category !== filter.category) {
        return false;
      }

      // Status filter
      if (filter.status && stack.status !== filter.status) {
        return false;
      }

      // Experience filter
      if (filter.experience && stack.experience !== filter.experience) {
        return false;
      }

      // Rating filter
      if (filter.minRating && stack.rating < filter.minRating) {
        return false;
      }

      return true;
    });
  }, [filter, techStacks]);

  return (
    <div className="min-h-screen bg-background tech-grid scanlines">
      <Header />

      <main className="container max-w-7xl mx-auto px-4 md:px-6 py-6">
        <div className="flex gap-4 lg:gap-6">
          {/* Sidebar */}
          <FilterSidebar filter={filter} onFilterChange={setFilter} />

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Header Actions */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h1 className="font-pixel text-2xl text-primary">
                  Tech Stack Library
                </h1>
                <p className="text-muted-foreground font-mono text-sm">
                  Showing {filteredTechStacks.length} of {techStacks.length} technologies
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="hover:glow transition-all duration-300"
                >
                  <GridIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="hover:glow transition-all duration-300"
                >
                  <ListIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Tech Stack Grid */}
            {filteredTechStacks.length > 0 ? (
              <div className={`
                ${viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'space-y-4'
                }
              `}>
                {filteredTechStacks.map((techStack) => (
                  <Link href={`/stack/${techStack.id}`} key={techStack.id}>
                    {viewMode === 'grid' ? (
                      <TechStackCard
                        techStack={techStack}
                        onEdit={(stack: TechStack) => console.log('Edit:', stack)}
                        onDelete={(id: string) => console.log('Delete:', id)}
                      />
                    ) : (
                      <TechStackListItem
                        techStack={techStack}
                      />
                    )}
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🤖</div>
                <h3 className="font-pixel text-lg text-muted-foreground mb-2">
                  No tech stacks found
                </h3>
                <p className="text-sm text-muted-foreground font-mono">
                  Try adjusting your filters or search term. Or{' '}
                  <Link href="/create" className="text-primary hover:underline">
                    create your first tech stack
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
