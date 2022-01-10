import express from 'express'
import knex from 'knex'
import amqp from 'amqplib'

import { Event } from './models'
import { database_connection, queue_name } from './constants'

const port = 1000

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
            const event: Event = JSON.parse(message.content.toString())
            console.log(event)
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
