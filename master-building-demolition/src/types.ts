export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  location: string;
  demolitionType: string;
  details: string;
  timestamp: string;
  status: 'pending' | 'scheduled' | 'inprogress' | 'completed' | 'cancelled';
  notes?: string;
  source?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  image?: string;
  minCostEstimate?: string;
  features: string[];
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'cost' | 'process' | 'safety' | 'general';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  projectType: string;
  location: string;
  quote: string;
  rating: number;
  avatarUrl?: string;
}

export interface ProjectGalleryItem {
  id: string;
  title: string;
  location: string;
  type: string;
  beforeImg: string;
  duringImg: string;
  afterImg: string;
  description: string;
  completedYear: string;
}
