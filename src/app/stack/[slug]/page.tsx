import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getTechStackBySlug, getAllTechStackSlugs } from '@/lib/mdx';
import { Header } from '@/components/header';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
  import {
  ArrowLeft,
  Calendar,
  Clock,
  ExternalLink,
  Star,
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
import Link from 'next/link';

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

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// MDX Components for rich content
const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h1 className="text-3xl font-semibold text-primary mb-6" {...props} />,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className="text-2xl font-semibold text-primary mt-8 mb-4" {...props} />,
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className="text-xl font-semibold text-primary mt-6 mb-3" {...props} />,
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-4" {...props} />,
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => <ul className="font-mono text-sm text-muted-foreground mb-4 pl-6" {...props} />,
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => <ol className="font-mono text-sm text-muted-foreground mb-4 pl-6 list-decimal" {...props} />,
  li: (props: React.HTMLAttributes<HTMLLIElement>) => <li className="mb-2" {...props} />,
  code: (props: React.HTMLAttributes<HTMLElement>) => <code className="bg-card border px-2 py-1 rounded text-primary font-mono text-xs" {...props} />,
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => <pre className="bg-card border p-4 rounded-lg overflow-x-auto mb-4 font-mono text-xs" {...props} />,
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground mb-4" {...props} />,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a className="text-primary hover:underline" {...props} />,
};

export async function generateStaticParams() {
  const slugs = getAllTechStackSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function TechStackPage({ params }: PageProps) {
  try {
    const { slug } = await params;
    const techStack = getTechStackBySlug(slug);

    if (!techStack) {
      notFound();
    }

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
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container max-w-4xl mx-auto px-4 md:px-6 py-6">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="subtle-border hover:shadow-sm transition">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span className="font-mono">Back to Library</span>
            </Button>
          </Link>
        </div>

        {/* Header Card */}
        <Card className="condensed-card mb-10">
          <CardHeader>
            <div className="flex items-start gap-6">
              {/* Icon */}
              <div className="p-4 rounded-xl bg-card border border-border shrink-0">
                <IconComponent className="h-12 w-12 text-primary" />
              </div>

              {/* Title and Meta */}
              <div className="flex-1 min-w-0 space-y-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-4xl font-semibold text-primary mb-2">
                      {techStack.name}
                    </h1>
                    <p className="font-mono text-lg text-muted-foreground">
                      {techStack.description}
                    </p>
                  </div>

                  {techStack.url && (
                    <Button
                      asChild
                      className="hover:shadow-sm transition"
                    >
                      <a href={techStack.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        <span className="font-mono">Visit Site</span>
                      </a>
                    </Button>
                  )}
                </div>

                {/* Meta Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-mono text-muted-foreground block mb-1">Category</span>
                    <Badge variant="outline" className="subtle-border">
                      {techStack.category}
                    </Badge>
                  </div>

                  <div>
                    <span className="font-mono text-muted-foreground block mb-1">Status</span>
                    <Badge className={`${statusColors[techStack.status]} font-mono`}>
                      {techStack.status}
                    </Badge>
                  </div>

                  <div>
                    <span className="font-mono text-muted-foreground block mb-1">Frequency</span>
                    <span className={`font-mono font-semibold ${experienceColors[techStack.experience]}`}>
                      {techStack.experience}
                    </span>
                  </div>
                </div>

                {/* Rating */}
                {techStack.rating > 0 && (
                  <div className="flex items-center gap-3 mt-4">
                    <span className="font-mono text-sm text-muted-foreground">Rating:</span>
                    <div className="flex gap-1">
                      {renderStars(techStack.rating)}
                    </div>
                    <span className="font-mono text-sm text-muted-foreground">
                      {techStack.rating}/5
                    </span>
                  </div>
                )}

                {/* Tags */}
                {techStack.tags.length > 0 && (
                  <div className="mt-6">
                    <span className="font-mono text-sm text-muted-foreground block mb-3">Tags:</span>
                    <div className="flex flex-wrap gap-3">
                      {techStack.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="font-mono text-xs border-border hover:border-primary transition-colors"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dates */}
                <div className="flex flex-wrap items-center gap-6 mt-8 text-xs font-mono text-muted-foreground border-t border-border/50 pt-5">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    <span>Added {formatDate(techStack.dateAdded)}</span>
                  </div>
                  {techStack.lastUsed && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      <span>Last used {formatDate(techStack.lastUsed)}</span>
                    </div>
                  )}
                  {techStack.readingTime && (
                    <div className="flex items-center gap-2">
                      <span>{techStack.readingTime.text}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Content */}
        <Card className="condensed-card">
          <CardContent className="p-8 md:p-10 space-y-8">
            <div className="prose prose-invert max-w-none space-y-6">
              <MDXRemote source={techStack.content} components={mdxComponents} />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
  } catch (error) {
    console.error('Error loading tech stack:', error);
    notFound();
  }
}
