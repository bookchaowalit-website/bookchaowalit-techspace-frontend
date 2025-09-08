import { TechStack, TechCategory, TechStatus, ExperienceLevel } from './tech-stack';

export interface MDXTechStackFrontmatter {
  name: string;
  description: string;
  category: TechCategory;
  status: TechStatus;
  url?: string;
  imageUrl?: string;
  tags: string[];
  experience: ExperienceLevel;
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
    category: mdx.category,
    status: mdx.status,
    url: mdx.url,
    imageUrl: mdx.imageUrl,
    tags: mdx.tags,
    experience: mdx.experience,
    rating: mdx.rating,
    notes: mdx.notes,
    dateAdded: mdx.dateAdded,
    lastUsed: mdx.lastUsed,
  };
}