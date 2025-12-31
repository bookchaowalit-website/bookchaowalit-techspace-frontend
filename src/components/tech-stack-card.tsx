'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TechStack } from '@/types/tech-stack';
import {
  ExternalLink,
  Star,
  Calendar,
  Clock,
  Edit,
  Trash2,
  Code,
  Database,
  Smartphone,
  Cloud,
  Palette,
  TestTube,
  Settings,
  Brain,
  Blocks,
  Gamepad2,
  MoreHorizontal
} from 'lucide-react';

interface TechStackCardProps {
  techStack: TechStack;
  onEdit?: (techStack: TechStack) => void;
  onDelete?: (id: string) => void;
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

export function TechStackCard({ techStack, onEdit, onDelete }: TechStackCardProps) {
  const IconComponent = categoryIcons[techStack.category] || Code;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
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
      year: 'numeric'
    });
  };

  return (
    <Card className="condensed-card hover:shadow-sm hover:scale-[1.02] transition-transform duration-200 group cursor-pointer h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-card border border-border">
              <IconComponent className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {techStack.name}
              </h3>
              <p className="text-sm text-muted-foreground font-mono">
                {techStack.category}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            {techStack.url && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => window.open(techStack.url, '_blank')}
              >
                <ExternalLink className="h-3 w-3" />
              </Button>
            )}
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => onEdit(techStack)}
              >
                <Edit className="h-3 w-3" />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                onClick={() => onDelete(techStack.id)}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5 flex-1">
        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 font-mono leading-relaxed">
          {techStack.description}
        </p>

        {/* Status and Experience */}
        <div className="flex items-center justify-between gap-3">
          <Badge
            className={`${statusColors[techStack.status]} font-mono text-xs subtle-border flex-shrink-0`}
          >
            {techStack.status}
          </Badge>
          <div className={`text-xs font-mono font-semibold ${experienceColors[techStack.experience]} flex-shrink-0`}>
            {techStack.experience}
          </div>
        </div>

        {/* Rating */}
        {techStack.rating > 0 && (
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              {renderStars(techStack.rating)}
            </div>
            <span className="text-xs font-mono text-muted-foreground">
              {techStack.rating}/5
            </span>
          </div>
        )}

        {/* Tags */}
        {techStack.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {techStack.tags.slice(0, 3).map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs font-mono border-border hover:border-primary transition-colors"
              >
                {tag}
              </Badge>
            ))}
            {techStack.tags.length > 3 && (
              <Badge
                variant="outline"
                className="text-xs font-mono border-border text-muted-foreground"
              >
                +{techStack.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Dates */}
        <div className="flex items-center justify-between text-xs font-mono text-muted-foreground border-t border-border pt-3">
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>Added {formatDate(techStack.dateAdded)}</span>
          </div>
          {techStack.lastUsed && (
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>Used {formatDate(techStack.lastUsed)}</span>
            </div>
          )}
        </div>

        {/* Notes preview */}
        {techStack.notes && (
          <div className="border-t border-border pt-3">
            <p className="text-xs text-muted-foreground font-mono italic line-clamp-2">
              &ldquo;{techStack.notes}&rdquo;
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
