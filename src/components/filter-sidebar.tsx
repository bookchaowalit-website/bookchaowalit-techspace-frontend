'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TechFilter, TechCategory, TechStatus, ExperienceLevel } from '@/types/tech-stack';
import { categories, statuses, experienceLevels } from '@/data/tech-stacks';
import { Filter, RotateCcw, Star } from 'lucide-react';

interface FilterSidebarProps {
  filter: TechFilter;
  onFilterChange: (filter: TechFilter) => void;
}

export function FilterSidebar({ filter, onFilterChange }: FilterSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const clearFilters = () => {
    onFilterChange({});
  };

  const updateFilter = (key: keyof TechFilter, value: any) => {
    onFilterChange({
      ...filter,
      [key]: value === 'all' ? undefined : value
    });
  };

  const activeFiltersCount = Object.keys(filter).filter(key => 
    filter[key as keyof TechFilter] !== undefined && filter[key as keyof TechFilter] !== ''
  ).length;

  return (
    <div className="w-64 lg:w-72 shrink-0 space-y-4">
      {/* Filter Header */}
      <Card className="pixel-card p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-primary" />
            <h2 className="font-pixel text-lg text-primary">Filters</h2>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="pixel-border">
                {activeFiltersCount}
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="font-mono text-xs hover:glow-accent"
          >
            <RotateCcw className="h-3 w-3 mr-1" />
            Clear
          </Button>
        </div>

        {/* Category Filter */}
        <div className="space-y-2 mb-4">
          <label className="text-sm font-mono font-semibold text-foreground">Category</label>
          <Select
            value={filter.category || 'all'}
            onValueChange={(value) => updateFilter('category', value)}
          >
            <SelectTrigger className="glow-accent">
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
            <SelectTrigger className="glow-accent">
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
          <label className="text-sm font-mono font-semibold text-foreground">Experience</label>
          <Select
            value={filter.experience || 'all'}
            onValueChange={(value) => updateFilter('experience', value)}
          >
            <SelectTrigger className="glow-accent">
              <SelectValue placeholder="All Levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
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
                className="p-1 h-8 w-8 hover:glow transition-all duration-300"
              >
                <Star className={`h-3 w-3 ${filter.minRating === rating ? 'fill-current' : ''}`} />
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Quick Stats */}
      <Card className="pixel-card p-4 tech-grid">
        <h3 className="font-pixel text-sm text-primary mb-3">Quick Stats</h3>
        <div className="space-y-2 font-mono text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Using Now:</span>
            <span className="text-primary">8</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Learning:</span>
            <span className="text-accent">1</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Want to Learn:</span>
            <span className="text-chart-4">1</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Stacks:</span>
            <span className="text-foreground font-semibold">12</span>
          </div>
        </div>
      </Card>
    </div>
  );
}