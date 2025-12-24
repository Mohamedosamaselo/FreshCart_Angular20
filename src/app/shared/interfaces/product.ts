import { category } from './category';
import { subcategory } from './subcategory';
import { brand } from './brand';

export interface product {
  sold?: number;
  images: string[];
  subcategory: subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: category;
  brand: brand;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
  priceAfterDiscount?: number;
  availableColors?: any[];
}
