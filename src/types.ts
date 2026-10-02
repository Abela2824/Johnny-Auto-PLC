export type PageId = 'home' | 'about' | 'services' | 'why-us' | 'gallery' | 'future-project' | 'contact';

export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  equipmentOrMethod?: string;
  image: string;
  category: 'primary' | 'specialized' | 'support';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Workshop' | 'Body Repair' | 'Painting' | 'Diagnostics' | 'Vehicles' | 'Facility' | 'Projects';
  description: string;
  image: string;
  aspectRatio?: 'landscape' | 'portrait' | 'square';
}

export interface StatItem {
  value: string;
  label: string;
  sublabel?: string;
  verified: boolean; // Internal verification flag as instructed
  verificationNote?: string;
}

export interface FeaturePoint {
  id: string;
  title: string;
  summary: string;
  detail: string;
  iconName: string;
  badge?: string;
}

export interface ProjectSpec {
  name: string;
  status: string;
  location: string;
  area: string;
  plannedCapacity: string;
  summary: string;
  details: string[];
  objectives: string[];
}

export interface QuoteFormData {
  fullName: string;
  phone: string;
  email: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  serviceCategory: string;
  preferredDate: string;
  notes: string;
}
