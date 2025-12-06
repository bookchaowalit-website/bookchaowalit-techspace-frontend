export interface Website {
  id: string;
  name: string;
  description: string;
  category: WebsiteCategory;
  status: WebsiteStatus;
  url?: string;
  imageUrl?: string;
  tags: string[];
  experience: UsageFrequency;
  rating: number;
  notes?: string;
  dateAdded: string;
  lastUsed?: string;
}

export type WebsiteCategory =
  | 'Development'
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
  | 'Favorites'
  | 'To Check'
  | 'Occasional'
  | 'Watching'
  | 'Archived';

export type UsageFrequency =
  | 'Daily'
  | 'Weekly'
  | 'Monthly'
  | 'Rarely'
  | 'Never Used';

export interface WebsiteFilter {
  category?: WebsiteCategory;
  status?: WebsiteStatus;
  experience?: UsageFrequency;
  search?: string;
  tags?: string[];
  minRating?: number;
}

// Legacy type aliases for backward compatibility
export type TechStack = Website;
export type TechCategory = WebsiteCategory;
export type TechStatus = WebsiteStatus;
export type ExperienceLevel = UsageFrequency;
export type TechFilter = WebsiteFilter;
