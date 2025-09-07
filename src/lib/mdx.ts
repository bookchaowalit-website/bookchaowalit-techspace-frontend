import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXTechStack, MDXTechStackFrontmatter } from '@/types/mdx-tech-stack';

const contentDirectory = path.join(process.cwd(), 'content/stacks');

// Ensure content directory exists
if (!fs.existsSync(contentDirectory)) {
  fs.mkdirSync(contentDirectory, { recursive: true });
}

export function getAllTechStackSlugs(): string[] {
  try {
    if (!fs.existsSync(contentDirectory)) {
      return [];
    }
    
    const filenames = fs.readdirSync(contentDirectory);
    return filenames
      .filter(name => name.endsWith('.mdx'))
      .map(name => name.replace(/\.mdx$/, ''));
  } catch (error) {
    console.error('Error reading tech stack slugs:', error);
    return [];
  }
}

export function getTechStackBySlug(slug: string): MDXTechStack | null {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.mdx`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    const frontmatter = data as MDXTechStackFrontmatter;
    
    // Calculate reading time (rough estimate)
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    
    return {
      ...frontmatter,
      id: slug,
      slug,
      content,
      readingTime: {
        text: `${minutes} min read`,
        minutes,
        words,
      },
    };
  } catch (error) {
    console.error(`Error reading tech stack ${slug}:`, error);
    return null;
  }
}

export function getAllTechStacks(): MDXTechStack[] {
  const slugs = getAllTechStackSlugs();
  const techStacks = slugs
    .map(slug => getTechStackBySlug(slug))
    .filter((stack): stack is MDXTechStack => stack !== null)
    .sort((a, b) => {
      // Sort by featured first, then by date added (newest first)
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    });
    
  return techStacks;
}

export function getFeaturedTechStacks(): MDXTechStack[] {
  return getAllTechStacks().filter(stack => stack.featured);
}

export function getTechStacksByCategory(category: string): MDXTechStack[] {
  return getAllTechStacks().filter(stack => 
    stack.category.toLowerCase() === category.toLowerCase()
  );
}

export function getTechStacksByStatus(status: string): MDXTechStack[] {
  return getAllTechStacks().filter(stack => 
    stack.status.toLowerCase() === status.toLowerCase()
  );
}

export function searchTechStacks(query: string): MDXTechStack[] {
  const searchTerm = query.toLowerCase();
  return getAllTechStacks().filter(stack => 
    stack.name.toLowerCase().includes(searchTerm) ||
    stack.description.toLowerCase().includes(searchTerm) ||
    stack.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
    stack.content.toLowerCase().includes(searchTerm) ||
    stack.notes?.toLowerCase().includes(searchTerm)
  );
}