import { Product, ProductStockChangeEvent } from './models'
import { agregateProductStockChange, manageProductStock, ProductStockChangeEventStorage, ProductStorage } from './utils'

function mockProductStockChangeEvent(event?: Partial<ProductStockChangeEvent>): ProductStockChangeEvent {
  return {
    id: '',
    date: 0,
    value: 0,
    productName: '',
    ...event,
  }
}

describe('manage product stock', () => {
  test('agregateProductStockChange', () => {
    expect(10).toStrictEqual(agregateProductStockChange(0, 10))
  })

  test('manageProductStock', async () => {
    const event = mockProductStockChangeEvent({ productName: 'A', value: 10 })
    const product: Product = { name: 'A', stock: 0 }

    const insertProductStockChangeEventMock = jest.fn(async () => {})
    const selectProductByNameMock = jest.fn(async () => product)
    const updateProductMock = jest.fn(async () => {})
    const productStockChangeEventStorage: ProductStockChangeEventStorage = {
      insertProductStockChangeEvent: insertProductStockChangeEventMock,
    }
    const productStorage: ProductStorage = {
      selectProductByName: selectProductByNameMock,
      updateProduct: updateProductMock,
    }

    expect(await manageProductStock(event, productStockChangeEventStorage, productStorage)).toBeUndefined()
    expect(insertProductStockChangeEventMock).toHaveBeenCalledTimes(1)
    expect(insertProductStockChangeEventMock).toHaveBeenCalledWith(event)
    expect(selectProductByNameMock).toHaveBeenCalledTimes(1)
    expect(selectProductByNameMock).toHaveBeenCalledWith('A')
    expect(updateProductMock).toHaveBeenCalledTimes(1)
    expect(updateProductMock).toHaveBeenCalledWith({ name: event.productName, stock: 10 })
  })

  test.todo('test')
})
