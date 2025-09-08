'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Terminal, Zap } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer">
          <div className="relative">
            <Terminal className="h-8 w-8 text-primary" />
            <Zap className="absolute -top-1 -right-1 h-4 w-4 text-accent animate-pulse" />
          </div>
          <div>
            <h1 className="font-pixel text-xl text-primary">Tech Space</h1>
            <p className="text-xs text-muted-foreground font-mono">Stack & Product Library</p>
          </div>
        </Link>

        {/* Search */}
        <div className="flex items-center space-x-4 flex-1 max-w-sm mx-8">
          <div className="relative w-full">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tech stacks..."
              className="pl-8 bg-card border-border glow-accent focus:glow transition-all duration-300"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="pixel-border hover:glow transition-all duration-300"
          >
            <span className="font-mono text-xs">Add Stack</span>
          </Button>
          <Button
            variant="default"
            size="sm"
            className="bg-primary hover:bg-primary/90 glow font-mono text-xs"
          >
            Export
          </Button>
        </div>
      </div>
    </header>
  );
}
