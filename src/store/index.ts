import { create } from 'zustand';
import type { Category, Site, SubmitForm } from '@/types';
import { categories as mockCategories, sites as mockSites } from '@/data/mock';

interface Store {
  categories: Category[];
  sites: Site[];
  searchQuery: string;
  selectedCategory: string | null;
  theme: 'dark' | 'light';
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (id: string | null) => void;
  toggleTheme: () => void;
  submitSite: (form: SubmitForm) => void;
  approveSite: (id: string) => void;
  rejectSite: (id: string) => void;
  deleteSite: (id: string) => void;
  addCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  getFilteredSites: () => Site[];
  getSitesByCategory: (categoryId: string) => Site[];
  getSiteById: (id: string) => Site | undefined;
  getPendingSites: () => Site[];
}

export const useStore = create<Store>((set, get) => ({
  categories: mockCategories,
  sites: mockSites,
  searchQuery: '',
  selectedCategory: null,
  theme: 'dark',

  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (id) => set({ selectedCategory: id }),

  toggleTheme: () => {
    const next = get().theme === 'dark' ? 'light' : 'dark';
    set({ theme: next });
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(next);
  },

  submitSite: (form) => {
    const newSite: Site = {
      id: String(Date.now()),
      name: form.name,
      url: form.url,
      description: form.description,
      logo: form.logo || `https://www.google.com/s2/favicons?domain=${new URL(form.url).hostname}&sz=64`,
      categoryId: form.categoryId,
      tags: form.tags,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
      visitCount: 0,
      isRecommended: false,
    };
    set((s) => ({ sites: [newSite, ...s.sites] }));
  },

  approveSite: (id) =>
    set((s) => ({
      sites: s.sites.map((site) =>
        site.id === id ? { ...site, status: 'approved' as const } : site
      ),
    })),

  rejectSite: (id) =>
    set((s) => ({
      sites: s.sites.map((site) =>
        site.id === id ? { ...site, status: 'rejected' as const } : site
      ),
    })),

  deleteSite: (id) =>
    set((s) => ({ sites: s.sites.filter((s) => s.id !== id) })),

  addCategory: (category) =>
    set((s) => ({ categories: [...s.categories, category] })),

  deleteCategory: (id) =>
    set((s) => ({ categories: s.categories.filter((c) => c.id !== id) })),

  getFilteredSites: () => {
    const { sites, searchQuery } = get();
    if (!searchQuery) return sites.filter((s) => s.status === 'approved');
    return sites.filter(
      (s) =>
        s.status === 'approved' &&
        (s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())))
    );
  },

  getSitesByCategory: (categoryId) =>
    get().sites.filter((s) => s.categoryId === categoryId && s.status === 'approved'),

  getSiteById: (id) => get().sites.find((s) => s.id === id),

  getPendingSites: () => get().sites.filter((s) => s.status === 'pending'),
}));