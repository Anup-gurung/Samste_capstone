export type ProjectCategory = 
  | 'Web Development'
  | 'Mobile Applications'
  | 'Artificial Intelligence'
  | 'Machine Learning'
  | 'Data Science'
  | 'UI/UX Design'
  | 'IoT and Hardware'
  | 'Research and Innovation';

export type ProjectStatus = 'Live Demo' | 'Prototype' | 'Research' | 'Open Source';

export interface StudentCreator {
  id: string;
  name: string;
  role: string;
  department: string;
  year: string;
  bio: string;
  avatar: string;
  github?: string;
  linkedin?: string;
  email?: string;
  featuredProjectSlug?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  category: ProjectCategory;
  status: ProjectStatus;
  coverImage: string;
  gallery: string[];
  technologies: string[];
  student: StudentCreator;
  academicYear: string;
  semester?: string;
  featured: boolean;
  demoUrl?: string;
  repoUrl?: string;
  problem: string;
  solution: string;
  keyFeatures: string[];
  challenges: string[];
  learningOutcomes: string[];
  viewsCount: number;
  likesCount: number;
  createdAt: string;
}
