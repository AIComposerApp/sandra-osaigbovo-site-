export interface ConsultationOption {
  id: string;
  title: string;
  duration: string;
  price: string;
  tagline: string;
  description: string;
  keyIncludes: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
  content: string[];
}

export interface BookingFormData {
  consultationId: string;
  date: string;
  time: string;
  fullName: string;
  email: string;
  phone: string;
  lipedemaStage: string;
  message: string;
}

export type ActiveTab = 'home' | 'about' | 'consultations' | 'blog' | 'contact';
