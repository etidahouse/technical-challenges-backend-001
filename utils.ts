import { Knex } from 'knex'
import { Product, ProductStockChangeEvent } from './models'

export type ProductStockChangeEventStorage = {
  insertProductStockChangeEvent: (event: ProductStockChangeEvent) => Promise<void>
}

export type ProductStorage = {
  selectProductByName: (name: string) => Promise<Product>
  updateProduct: (product: Pick<Product, 'name'> & Partial<Product>) => Promise<void>
}

export function productStockChangeEventStorage(pg: Knex): ProductStockChangeEventStorage {
  return {
    insertProductStockChangeEvent: async (event) => {
      await pg('product_stock_movement_events').insert({ ...event, date: new Date(event.date) })
    },
  }
}

export function productStorage(pg: Knex): ProductStorage {
  return {
    selectProductByName: async (name) => {
      const product = await pg<Product>('products').select('*').where({ name }).first()

      if (product === null || product === undefined) throw new Error(`product(${name}) not found.`)

      return product
    },
    updateProduct: async (product) => {
      await pg('products').update(product).where({ name: product.name })
    },
  }
}

export function agregateProductStockChange(stock: number, value: number): number {
  return stock + value
}

export async function manageProductStock(
  event: ProductStockChangeEvent,
  productStockChangeEventStorage: ProductStockChangeEventStorage,
  productStorage: ProductStorage,
) {
  // persiste stock event
  await productStockChangeEventStorage.insertProductStockChangeEvent(event)

  // get product
  const product = await productStorage.selectProductByName(event.productName)

  // mathematical operation
  const stock = agregateProductStockChange(product.stock, event.value)

  // update stock
  await productStorage.updateProduct({ ...product, stock })
}
