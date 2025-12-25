import { product } from './product';




export interface CartResponse {
  status: string
  numOfCartItems: number
  cartId: string
  data: CartData
}

export interface CartData {
  _id: string
  cartOwner: string
  products: product[]
  createdAt: string
  updatedAt: string
  totalCartPrice: number
}




