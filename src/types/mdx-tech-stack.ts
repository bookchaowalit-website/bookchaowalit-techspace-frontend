import { TechStack } from './tech-stack';

export interface MDXTechStackFrontmatter {
  name: string;
  description: string;
  category: string;
  status: string;
  url?: string;
  imageUrl?: string;
  tags: string[];
  experience: string;
  rating: number;
  notes?: string;
  dateAdded: string;
  lastUsed?: string;
  featured?: boolean;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  learningResources?: string[];
  projectsUsed?: string[];
}

export interface MDXTechStack extends MDXTechStackFrontmatter {
  id: string;
  slug: string;
  content: string;
  readingTime?: {
    text: string;
    minutes: number;
    words: number;
  };
}

// Convert MDX tech stack to original format for compatibility
export function mdxToTechStack(mdx: MDXTechStack): TechStack {
  return {
    id: mdx.id,
    name: mdx.name,
    description: mdx.description,
    category: mdx.category as any,
    status: mdx.status as any,
    url: mdx.url,
    imageUrl: mdx.imageUrl,
    tags: mdx.tags,
    experience: mdx.experience as any,
    rating: mdx.rating,
    notes: mdx.notes,
    dateAdded: mdx.dateAdded,
    lastUsed: mdx.lastUsed,
  };
}