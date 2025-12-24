import { brand } from "./brand"
import { category } from "./category"
import { subcategory } from "./subcategory"

export interface CartResponse {
  status: string
  numOfCartItems: number
  cartId: string
  data: CartData
}

export interface CartData {
  _id: string
  cartOwner: string
  products: Product[]
  createdAt: string
  updatedAt: string
  totalCartPrice: number
}

export interface Product {
  count: number
  _id: string
  price: number
  subcategory: subcategory[]
  title: string
  quantity: number
  imageCover: string
  category: category
  brand: brand
  ratingsAverage: number
  id: string
}


