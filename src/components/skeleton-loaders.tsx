'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function TechStackCardSkeleton() {
  return (
    <Card className="pixel-card">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-muted animate-pulse">
              <div className="h-5 w-5 bg-muted-foreground/20 rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="h-6 w-32 bg-muted-foreground/20 rounded animate-pulse"></div>
              <div className="h-4 w-20 bg-muted-foreground/20 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="h-4 w-full bg-muted-foreground/20 rounded animate-pulse"></div>
          <div className="h-4 w-3/4 bg-muted-foreground/20 rounded animate-pulse"></div>
        </div>

        <div className="flex items-center justify-between">
          <div className="h-6 w-16 bg-muted-foreground/20 rounded animate-pulse"></div>
          <div className="h-4 w-12 bg-muted-foreground/20 rounded animate-pulse"></div>
        </div>

        <div className="flex space-x-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-3 w-3 bg-muted-foreground/20 rounded animate-pulse"></div>
          ))}
        </div>

        <div className="flex flex-wrap gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-5 w-16 bg-muted-foreground/20 rounded animate-pulse"></div>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs border-t border-border pt-3">
          <div className="h-3 w-20 bg-muted-foreground/20 rounded animate-pulse"></div>
          <div className="h-3 w-16 bg-muted-foreground/20 rounded animate-pulse"></div>
        </div>
      </CardContent>
    </Card>
  );
}

export function TechStackListItemSkeleton() {
  return (
    <Card className="pixel-card">
      <CardContent className="p-6">
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0">
            <div className="p-3 rounded-xl bg-muted animate-pulse">
              <div className="h-8 w-8 bg-muted-foreground/20 rounded"></div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0 space-y-2">
                <div className="h-7 w-40 bg-muted-foreground/20 rounded animate-pulse"></div>
                <div className="h-4 w-full bg-muted-foreground/20 rounded animate-pulse"></div>
                <div className="h-4 w-2/3 bg-muted-foreground/20 rounded animate-pulse"></div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="h-6 w-20 bg-muted-foreground/20 rounded animate-pulse"></div>
              <div className="h-6 w-16 bg-muted-foreground/20 rounded animate-pulse"></div>
              <div className="h-4 w-12 bg-muted-foreground/20 rounded animate-pulse"></div>
            </div>

            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-5 w-16 bg-muted-foreground/20 rounded animate-pulse"></div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-4">
                <div className="h-3 w-20 bg-muted-foreground/20 rounded animate-pulse"></div>
                <div className="h-3 w-16 bg-muted-foreground/20 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
