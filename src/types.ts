export type BottleSize = '1L' | '500ml';

export interface Flavor {
  id: string;
  name: string;
  badge: string;
  badgeColor: 'tertiary' | 'primary' | 'secondary' | 'warm';
  description: string;
  price1L: number;
  price500ml: number;
  image?: string;
  highlight?: boolean;
}

export interface CartItem {
  id: string;
  flavorId: string;
  flavorName: string;
  size: BottleSize;
  sizeLabel: string;
  unitPrice: number;
  quantity: number;
}

export interface SpecialPackage {
  id: string;
  name: string;
  categoryBadge: string;
  isRecommended?: boolean;
  description: string;
  features: string[];
  startingPrice: number;
  buttonLabel: string;
  defaultAssortment: { flavorId: string; size: BottleSize; quantity: number }[];
}

export interface DeliveryFormData {
  fullName: string;
  phone: string;
  streetAndNumber: string;
  colony: string;
  postalCode?: string;
  references: string;
}

export interface ProductReview {
  id: string;
  authorName: string;
  rating: number; // 1 to 5
  favoriteFlavor?: string;
  comment: string;
  imageUrl?: string;
  createdAt: string;
  likes: number;
}

