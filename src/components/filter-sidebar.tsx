'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TechFilter } from '@/types/tech-stack';
import { categories, statuses, experienceLevels } from '@/data/tech-stacks';
import { Filter, RotateCcw, Star, X } from 'lucide-react';
import { useState } from 'react';

interface FilterSidebarProps {
  filter: TechFilter;
  onFilterChange: (filter: TechFilter) => void;
}

export function FilterSidebar({ filter, onFilterChange }: FilterSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const clearFilters = () => {
    onFilterChange({});
  };

  const updateFilter = (key: keyof TechFilter, value: string | number | undefined) => {
    onFilterChange({
      ...filter,
      [key]: value === 'all' ? undefined : value
    });
  };

  const activeFiltersCount = Object.keys(filter).filter(key =>
    filter[key as keyof TechFilter] !== undefined && filter[key as keyof TechFilter] !== ''
  ).length;

  return (
    <>
      {/* Mobile Filter Button */}
      <Button
        variant="outline"
        className="lg:hidden fixed bottom-4 right-4 z-40 subtle-border shadow-lg bg-card"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle filters"
      >
        <Filter className="h-4 w-4 mr-2" />
        Filters
        {activeFiltersCount > 0 && (
          <Badge variant="secondary" className="ml-2 subtle-border">
            {activeFiltersCount}
          </Badge>
        )}
      </Button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div className={`
        w-64 lg:w-72 shrink-0 space-y-4
        lg:block
        fixed lg:sticky top-0 right-0 h-full lg:h-auto
        bg-background lg:bg-transparent
        z-50 lg:z-auto
        p-4 lg:p-0
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}>
      {/* Filter Header */}
      <Card className="condensed-card p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-primary">Filters</h2>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="subtle-border">
                {activeFiltersCount}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="font-mono text-xs hover:shadow-sm"
              aria-label="Clear all filters"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Clear
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="lg:hidden"
              aria-label="Close filters"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="space-y-2 mb-4">
          <label className="text-sm font-mono font-semibold text-foreground">Category</label>
          <Select
            value={filter.category || 'all'}
            onValueChange={(value) => updateFilter('category', value)}
          >
            <SelectTrigger className="hover:shadow-sm">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Status Filter */}
        <div className="space-y-2 mb-4">
          <label className="text-sm font-mono font-semibold text-foreground">Status</label>
          <Select
            value={filter.status || 'all'}
            onValueChange={(value) => updateFilter('status', value)}
          >
            <SelectTrigger className="hover:shadow-sm">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Experience Filter */}
        <div className="space-y-2 mb-4">
          <label className="text-sm font-mono font-semibold text-foreground">Usage Frequency</label>
          <Select
            value={filter.experience || 'all'}
            onValueChange={(value) => updateFilter('experience', value)}
          >
            <SelectTrigger className="hover:shadow-sm">
              <SelectValue placeholder="All Frequencies" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Frequencies</SelectItem>
              {experienceLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Rating Filter */}
        <div className="space-y-2">
          <label className="text-sm font-mono font-semibold text-foreground">Minimum Rating</label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <Button
                key={rating}
                variant={filter.minRating === rating ? "default" : "outline"}
                size="sm"
                onClick={() => updateFilter('minRating', filter.minRating === rating ? undefined : rating)}
                className="p-1 h-8 w-8 hover:shadow-sm transition"
              >
                <Star className={`h-3 w-3 ${filter.minRating === rating ? 'fill-current' : ''}`} />
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Quick Stats */}
      <Card className="p-4">
        <h3 className="text-sm font-semibold text-primary mb-3">Quick Stats</h3>
        <div className="space-y-2 font-mono text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Active:</span>
            <span className="text-primary">8</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">To Check:</span>
            <span className="text-accent">1</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Favorites:</span>
            <span className="text-chart-4">1</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Sites:</span>
            <span className="text-foreground font-semibold">12</span>
          </div>
        </div>
      </Card>
      </div>
    </>
  );
}
