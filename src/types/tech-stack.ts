export interface TechStack {
  id: string;
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
}

export type TechCategory = 
  | 'Frontend'
  | 'Backend'
  | 'Database'
  | 'DevOps'
  | 'Mobile'
  | 'AI/ML'
  | 'Design'
  | 'Testing'
  | 'Cloud'
  | 'Blockchain'
  | 'Gaming'
  | 'Other';

export type TechStatus = 
  | 'Using Now'
  | 'Used Before'
  | 'Want to Learn'
  | 'Learning'
  | 'Watching'
  | 'Archived';

export type ExperienceLevel = 
  | 'Beginner'
  | 'Intermediate' 
  | 'Advanced'
  | 'Expert'
  | 'None';

export interface TechFilter {
  category?: TechCategory;
  status?: TechStatus;
  experience?: ExperienceLevel;
  search?: string;
  tags?: string[];
  minRating?: number;
}