'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Terminal, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
}

export function Header({ searchTerm = '', onSearchChange }: HeaderProps) {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl mx-auto flex h-16 items-center justify-between gap-4 px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity cursor-pointer">
          <div className="relative">
            <Terminal className="h-7 w-7 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">Web Space</h1>
            <p className="text-sm text-muted-foreground">Your Website Collection</p>
          </div>
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search websites..."
              value={searchTerm}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="pl-9 pr-9"
              aria-label="Search websites"
            />
            {searchTerm && (
              <button
                onClick={() => onSearchChange?.('')}
                className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Search Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
          aria-label="Toggle search"
        >
          <Search className="h-4 w-4" />
        </Button>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="subtle-border text-sm"
            aria-label="Add new website"
          >
            <span className="text-sm hidden sm:inline">Add Website</span>
            <span className="text-sm sm:hidden">Add</span>
          </Button>
          <Button
            variant="default"
            size="sm"
            className="hidden sm:flex text-sm font-medium"
            aria-label="Export collection"
          >
            Export
          </Button>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {isMobileSearchOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur p-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search websites..."
              value={searchTerm}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="pl-9 pr-9"
              aria-label="Search websites"
              autoFocus
            />
            {searchTerm && (
              <button
                onClick={() => onSearchChange?.('')}
                className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
