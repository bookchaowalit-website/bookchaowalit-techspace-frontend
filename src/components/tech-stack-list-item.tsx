'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TechStack } from '@/types/tech-stack';
import {
  ExternalLink,
  Star,
  Calendar,
  Clock,
  Code,
  Database,
  Smartphone,
  Cloud,
  Palette,
  TestTube,
  Settings,
  Brain,
  Gamepad2,
  MoreHorizontal
} from 'lucide-react';

interface TechStackListItemProps {
  techStack: TechStack;
}

const categoryIcons: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  'Development': Code,
  'Design': Palette,
  'Productivity': Settings,
  'Learning': Brain,
  'Entertainment': Gamepad2,
  'Social Media': Smartphone,
  'News': Database,
  'Shopping': Cloud,
  'Finance': TestTube,
  'Health': Brain,
  'Travel': Cloud,
  'Other': MoreHorizontal
};

const statusColors: Record<string, string> = {
  'Active': 'bg-primary text-primary-foreground',
  'Favorites': 'bg-accent text-accent-foreground',
  'To Check': 'bg-chart-4 text-foreground',
  'Occasional': 'bg-secondary text-secondary-foreground',
  'Watching': 'bg-chart-2 text-foreground',
  'Archived': 'bg-muted text-muted-foreground'
};

const experienceColors: Record<string, string> = {
  'Daily': 'text-chart-1',
  'Weekly': 'text-primary',
  'Monthly': 'text-chart-3',
  'Rarely': 'text-chart-4',
  'Never Used': 'text-muted-foreground'
};

export function TechStackListItem({ techStack }: TechStackListItemProps) {
  const IconComponent = categoryIcons[techStack.category] || Code;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating
            ? 'text-yellow-400 fill-yellow-400'
            : 'text-muted-foreground'
        }`}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card className="condensed-card hover:shadow-sm hover:scale-[1.01] transition-transform duration-200 group cursor-pointer">
      <CardContent className="p-6">
        <div className="flex items-start gap-6">
          {/* Icon */}
          <div className="flex-shrink-0">
            <div className="p-3 rounded-xl bg-card border border-border group-hover:border-primary transition-colors">
              <IconComponent className="h-8 w-8 text-primary" />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0 space-y-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors cursor-pointer mb-1">
                  {techStack.name}
                </h3>
                <p className="text-muted-foreground font-mono text-sm leading-relaxed mb-3">
                  {techStack.description}
                </p>
              </div>

              {techStack.url && (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-shrink-0 ml-4 hover:shadow-sm transition"
                  onClick={() => window.open(techStack.url, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit
                </Button>
              )}
            </div>

            {/* Meta Information Row */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <Badge variant="outline" className="subtle-border flex-shrink-0">
                {techStack.category}
              </Badge>

              <Badge className={`${statusColors[techStack.status]} font-mono text-xs flex-shrink-0`}>
                {techStack.status}
              </Badge>

              <span className={`font-mono text-sm font-semibold ${experienceColors[techStack.experience]} flex-shrink-0`}>
                {techStack.experience}
              </span>

              {/* Rating */}
              {techStack.rating > 0 && (
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {renderStars(techStack.rating)}
                  </div>
                  <span className="font-mono text-sm text-muted-foreground flex-shrink-0">
                    {techStack.rating}/5
                  </span>
                </div>
              )}
            </div>

            {/* Tags */}
            {techStack.tags.length > 0 && (
              <div className="mb-5">
                <div className="flex flex-wrap gap-2">
                  {techStack.tags.slice(0, 6).map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="font-mono text-xs border-border hover:border-primary transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {techStack.tags.length > 6 && (
                    <Badge variant="outline" className="font-mono text-xs border-border">
                      +{techStack.tags.length - 6} more
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Footer Information */}
            <div className="flex flex-col gap-4 text-xs font-mono text-muted-foreground border-t border-border pt-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>Added {formatDate(techStack.dateAdded)}</span>
                </div>
                {techStack.lastUsed && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>Last used {formatDate(techStack.lastUsed)}</span>
                  </div>
                )}
              </div>

              {techStack.notes && (
                <div className="text-right max-w-xs">
                  <p className="truncate italic">
                    &ldquo;{techStack.notes}&rdquo;
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
