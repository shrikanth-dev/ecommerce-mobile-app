
import type { HomeCategory, HomeProduct, HomeDeal } from '../types/home.types';

export const homeCategories: HomeCategory[] = [
  { id: '1', name: 'Fruits', icon: '🍎' },
  { id: '2', name: 'Vegetables', icon: '🥦' },
  { id: '3', name: 'Dairy', icon: '🥛' },
  { id: '4', name: 'Bakery', icon: '🍞' },
  { id: '5', name: 'Snacks', icon: '🍿' },
  { id: '6', name: 'Beverages', icon: '🥤' },
];

export const featuredProducts: HomeProduct[] = [
  {
    id: '1',
    name: 'Fresh Red Apples',
    description: '1 kg · Fresh & juicy',
    price: '₹149',
    oldPrice: '₹180',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500',
    background: 'bg-red-50',
    images: [
    'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=500',
    'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500',
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500',
        ],
    discountLabel: '17% OFF',
    category: 'Fruits',
  },
  {
    id: '2',
    name: 'Fresh Broccoli',
    description: '500 g · Farm fresh',
    price: '₹65',
    oldPrice: '₹80',
    image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=500',
    background: 'bg-green-50',
    images: [
        'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=500',
        'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500',
        'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500',
    ],
    discountLabel: '19% OFF',
    category: 'Vegetables'
  },
  {
    id: '3',
    name: 'Whole Milk',
    description: '1 litre · Full cream',
    price: '₹68',
    oldPrice: '₹75',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500',
    background: 'bg-blue-50',
    images: [
    'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=500',
    'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500',
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500',
    ],
    discountLabel: '7% OFF',
    category: 'Dairy'
  },
  {
    id: '4',
    name: 'Fresh Bread',
    description: '400 g · Whole wheat',
    price: '₹45',
    oldPrice: '₹55',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500',
    background: 'bg-amber-50',
    images: [
    'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=500',
    'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500',
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500',
    ],
    discountLabel: '18% OFF',
    category: 'Bakery'
  },
];

export const homeDeals: HomeDeal[] = [
  {
    id: '1',
    title: 'Up to 40% OFF',
    subtitle: 'Fresh fruits & vegetables',
    badge: 'LIMITED TIME',
        image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400",
    background: 'bg-orange-50',
  },
  {
    id: '2',
    title: 'Buy 1 Get 1',
    subtitle: 'Selected dairy products',
    badge: 'SPECIAL OFFER',
        image:
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400",
    background: 'bg-blue-50',
  },
  {
    id: '3',
    title: 'Flat 25% OFF',
    subtitle: 'Bakery and snacks',
    badge: 'WEEKEND DEAL',
      image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",
    background: 'bg-green-50',
  },
];
