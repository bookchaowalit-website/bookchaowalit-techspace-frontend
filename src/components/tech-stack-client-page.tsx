'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/header';
import { FilterSidebar } from '@/components/filter-sidebar';
import { TechStackCard } from '@/components/tech-stack-card';
import { TechStackListItem } from '@/components/tech-stack-list-item';
import { TechStackCardSkeleton, TechStackListItemSkeleton } from '@/components/skeleton-loaders';
import { TechStack, TechFilter } from '@/types/tech-stack';
import { GridIcon, ListIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface TechStackClientPageProps {
  techStacks: TechStack[];
  isLoading?: boolean;
}

export function TechStackClientPage({ techStacks, isLoading = false }: TechStackClientPageProps) {
  const [filter, setFilter] = useState<TechFilter>({});
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [searchTerm, setSearchTerm] = useState('');

    // Filter tech stacks based on current filters and search
  const filteredTechStacks = useMemo(() => {
    return techStacks.filter((stack) => {
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
          stack.name.toLowerCase().includes(searchLower) ||
          stack.description.toLowerCase().includes(searchLower) ||
          stack.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
          stack.category.toLowerCase().includes(searchLower);
        if (!matchesSearch) {
          return false;
        }
      }

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
    <div className="min-h-screen bg-background">
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <main className="container max-w-7xl mx-auto px-4 md:px-6 py-6 pb-20 lg:pb-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Sidebar */}
          <FilterSidebar filter={filter} onFilterChange={setFilter} />

          {/* Main Content */}
          <div className="flex-1 space-y-6 min-w-0">
            {/* Header Actions */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
              <div className="space-y-1">
                <h1 className="text-2xl font-semibold text-primary">
                  Website Collection
                </h1>
                <p className="text-muted-foreground font-mono text-sm">
                  Showing {filteredTechStacks.length} of {techStacks.length} websites
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="hover:shadow-sm transition"
                >
                  <GridIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="hover:shadow-sm transition"
                >
                  <ListIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Tech Stack Grid */}
            {isLoading ? (
              <div className={`
                animate-pulse transition-opacity duration-300
                ${viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-12 lg:gap-16'
                  : 'space-y-12'
                }
              `}>
                {Array.from({ length: 6 }).map((_, index) => (
                  viewMode === 'grid' ? (
                    <TechStackCardSkeleton key={index} />
                  ) : (
                    <TechStackListItemSkeleton key={index} />
                  )
                ))}
              </div>
            ) : filteredTechStacks.length > 0 ? (
              <div className={`
                transition-all duration-300
                ${viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-12 lg:gap-16'
                  : 'space-y-12'
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
                <div className="text-6xl mb-4">🔖</div>
                <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                  No websites found
                </h3>
                <p className="text-sm text-muted-foreground font-mono">
                  Try adjusting your filters or search term. Or{' '}
                  <Link href="/create" className="text-primary hover:underline">
                    add your first website
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
