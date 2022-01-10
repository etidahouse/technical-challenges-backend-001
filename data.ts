import { v4 as uuid } from 'uuid'
import { Product, Event } from './models'

export const events: Event[] = Array.from({ length: 100 }, () => ({ id: uuid() }))

export const products: Product[] = [
  {
    name: 'A',
    stock: 0,
  },
  {
    name: 'B',
    stock: 0,
  },
  {
    name: 'C',
    stock: 0,
  },
  {
    name: 'D',
    stock: 0,
  },
]
