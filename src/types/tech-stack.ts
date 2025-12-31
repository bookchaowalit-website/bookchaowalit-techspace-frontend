export interface Website {
  id: string;
  name: string;
  description: string;
  category: WebsiteCategory;
  status: WebsiteStatus;
  url?: string;
  imageUrl?: string;
  tags: string[];
  experience: ExperienceLevel;
  rating: number;
  notes?: string;
  dateAdded: string;
  lastUsed?: string;
}

export type WebsiteCategory =
  | 'Development'
  | 'Frontend'
  | 'Backend'
  | 'Database'
  | 'DevOps'
  | 'AI/ML'
  | 'Design'
  | 'Productivity'
  | 'Learning'
  | 'Entertainment'
  | 'Social Media'
  | 'News'
  | 'Shopping'
  | 'Finance'
  | 'Health'
  | 'Travel'
  | 'Other';

export type WebsiteStatus =
  | 'Active'
  | 'Using Now'
  | 'Favorites'
  | 'To Check'
  | 'Occasional'
  | 'Watching'
  | 'Learned'
  | 'Learning'
  | 'Want to Learn'
  | 'Archived';

export type ExperienceLevel =
  | 'Advanced'
  | 'Intermediate'
  | 'Beginner'
  | 'None';

export type UsageFrequency = ExperienceLevel; // deprecated alias for backward compatibility

export interface WebsiteFilter {
  category?: WebsiteCategory;
  status?: WebsiteStatus;
  experience?: ExperienceLevel;
  search?: string;
  tags?: string[];
  minRating?: number;
}

// Legacy type aliases for backward compatibility
export type TechStack = Website;
export type TechCategory = WebsiteCategory;
export type TechStatus = WebsiteStatus;
export type TechFilter = WebsiteFilter;
