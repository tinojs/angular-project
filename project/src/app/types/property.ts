import { User } from './user';

export interface Property {
  _id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  price: number;
  location?: string;
  rooms?: number;
  area?: number;
  creator: User;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export type CreatePropertyDto = Omit<
  Property,
  '_id' | 'creator' | 'createdAt' | 'updatedAt' | '__v'
>;