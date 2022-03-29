import { v4 as uuid } from 'uuid'
import { Product, ProductStockChangeEvent } from './models'

function randomItem<T>(data: T[]) {
  return data[Math.floor(Math.random() * data.length)]
}

function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

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

export const events: ProductStockChangeEvent[] = Array.from({ length: 100 }, () => ({
  id: uuid(),
  date: Date.now(),
  productName: randomItem(products).name,
  value: randomNumber(-100, 100),
}))
