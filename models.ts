export type Product = {
  name: string
  stock: number
}

export type ProductStockChangeEvent = {
  id: string
  date: number
  productName: string
  value: number
}
