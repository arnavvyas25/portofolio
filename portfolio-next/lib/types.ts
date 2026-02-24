/**
 * Type Definitions
 *
 * Central location for all TypeScript interfaces and types used across the application.
 * This promotes type safety and makes refactoring easier.
 */

// Navigation item type
export interface NavItem {
  label: string;
  href: string;
}

// Project type for portfolio projects
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  category: ProjectCategory;
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured: boolean;
  slug: string; // Blog post slug for detailed write-up
}

// Project categories for filtering
export type ProjectCategory =
  | 'machine-learning'
  | 'web-development'
  | 'data-science'
  | 'cloud'
  | 'research';

// Research publication type
export interface Publication {
  id: string;
  title: string;
  authors: string[];
  journal?: string;
  conference?: string;
  year: number;
  abstract?: string;
  paperUrl?: string;
  doi?: string;
  keywords?: string[];
  link?: string;
  type?: 'journal' | 'conference' | 'preprint';
}

// Conference presentation type
export interface ConferencePresentation {
  id: string;
  title: string;
  conference: string;
  location: string;
  year: number;
  role: string;
  presentationType: string;
  link?: string;
}

// Research experience type
export interface ResearchExperience {
  id: string;
  title: string;
  institution: string;
  duration: string;
  description: string;
  highlights?: string[];
}

// Work experience type
export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | 'Present';
  description: string;
  responsibilities: string[];
  techStack?: string[];
}

// Skill category type
export interface SkillCategory {
  name: string;
  skills: string[];
}

// Blog post metadata type
export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  readingTime: string;
  published: boolean;
}

// Blog post with content
export interface BlogPost extends BlogPostMeta {
  content: string;
}

// Contact form data type
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// API response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

// Social link type
export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

// Site metadata type
export interface SiteMetadata {
  title: string;
  description: string;
  author: string;
  siteUrl: string;
  socialLinks: SocialLink[];
}

// Education type
export interface Education {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string | 'Present';
  gpa?: string;
  highlights?: string[];
}

// Impact statement type
export interface ImpactStatement {
  metric: string;
  title: string;
  description: string;
  detail: string;
}

// Philosophy principle type
export interface PhilosophyPrinciple {
  title: string;
  description: string;
}

// Engineering philosophy type
export interface EngineeringPhilosophy {
  title: string;
  summary: string;
  principles: PhilosophyPrinciple[];
}

// Leadership highlight type
export interface LeadershipHighlight {
  title: string;
  description: string;
}

// Future direction type
export interface FutureDirection {
  title: string;
  summary: string;
  areas: string[];
}

// Research interest type
export interface ResearchInterest {
  title: string;
  description: string;
}

// Hero content type
export interface HeroContent {
  headline: string;
  subheadline: string;
  description: string;
}
