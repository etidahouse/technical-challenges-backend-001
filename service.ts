import amqp from 'amqplib'
import express from 'express'
import knex from 'knex'
import { database_connection, queue_name } from './constants'
import { ProductStockChangeEvent } from './models'
import { manageProductStock, productStockChangeEventStorage, productStorage } from './utils'

const port = 2022

const pg = knex({
  client: 'pg',
  connection: database_connection,
  migrations: {
    directory: 'migrations',
    tableName: 'migrations',
  },
})

amqp
  .connect('amqp://localhost')
  .then((connection) => connection.createChannel())
  .then((channel) => {
    channel.assertQueue(queue_name, { durable: true })
    channel.prefetch(1)

    console.log('[*] Waiting for messages in %s. To exit press CTRL+C', queue_name)

    setInterval(
      () =>
        channel.get(queue_name).then(async (message) => {
          if (message !== false) {
            const event: ProductStockChangeEvent = JSON.parse(message.content.toString())

            console.log(event)

            await manageProductStock(event, productStockChangeEventStorage(pg), productStorage(pg))

            channel.ack(message)
          }
        }),
      10,
    )
  })

const app = express()

app.listen(port, () => {
  pg.migrate.latest()
  console.log(`service working on ${port}`)
})
