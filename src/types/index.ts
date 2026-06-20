export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  siteCount: number;
  color: string;
}

export interface Site {
  id: string;
  name: string;
  url: string;
  description: string;
  logo: string;
  categoryId: string;
  tags: string[];
  status: 'approved' | 'pending' | 'rejected';
  createdAt: string;
  visitCount: number;
  isRecommended: boolean;
  isVerified: boolean;
}

export interface SubmitForm {
  name: string;
  url: string;
  description: string;
  categoryId: string;
  email: string;
  customCategory?: string;
}