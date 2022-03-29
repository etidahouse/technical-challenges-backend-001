import amqp from 'amqplib'
import { prompt } from 'inquirer'
import knex from 'knex'
import { database_connection, queue_name } from './constants'
import { events, products } from './data'
import { Product } from './models'

const pg = knex({
  client: 'pg',
  connection: database_connection,
})

async function setupExperiment() {
  await pg('products').insert(products)
}

async function resetExperiment() {
  await pg('products').update({ stock: 0 })
  await pg('product_stock_movement_events').delete()
}

async function checkExperiment() {
  const clonedProducts: Product[] = JSON.parse(JSON.stringify(products))
  for (const event of events) {
    const product = clonedProducts.find((product) => product.name === event.productName)
    if (product === undefined) return console.error(`Product(name=${event.productName}) does not exist`)

    product.stock = product.stock + event.value
  }
  for (const product of clonedProducts) {
    const result = await pg<Product>('products').select('*').where({ name: product.name }).first()
    if (result === undefined || result === null)
      return console.error(`Product(name=${product.name}) is missing from database.`)

    if (result.stock !== product.stock)
      return console.error(
        `Product(name=${product.name}) has ${result.stock} but it is supposed to be ${product.stock}.`,
      )
  }
}

async function startExperiment() {
  amqp
    .connect('amqp://localhost')
    .then((connection) => connection.createChannel())
    .then((channel) => {
      channel.assertQueue(queue_name, { durable: true })

      for (const event of events) {
        channel.sendToQueue(queue_name, Buffer.from(JSON.stringify(event)))
      }
    })
}

async function main() {
  while (true) {
    const { choice } = await prompt<{ choice: 'SETUP' | 'START' | 'CHECK' | 'RESET' | 'END' }>([
      {
        name: 'choice',
        message: 'Please make a choice',
        choices: [
          { name: 'Setup', value: 'SETUP' },
          { name: 'Start', value: 'START' },
          { name: 'Check', value: 'CHECK' },
          { name: 'Reset', value: 'RESET' },
          { name: 'End', value: 'END' },
        ],
        type: 'list',
      },
    ])

    switch (choice) {
      case 'SETUP':
        await setupExperiment()
        break
      case 'START':
        await startExperiment()
        break
      case 'CHECK':
        await checkExperiment()
        break
      case 'RESET':
        await resetExperiment()
        break
      case 'END':
        process.exit(0)
      default:
        break
    }

    console.log('done')
  }
}

main().then(console.log).catch(console.error)
