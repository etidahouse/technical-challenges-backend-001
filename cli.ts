import knex from 'knex'
import amqp from 'amqplib'
import { prompt } from 'inquirer'

import { events, products } from './data'
import { database_connection, queue_name } from './constants'

const pg = knex({
  client: 'pg',
  connection: database_connection,
})

async function setupExperiment() {
  await pg('products').insert(products)
}

async function resetExperiment() {
  await pg('products').update({ stock: 0 })
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
    const { choice } = await prompt<{ choice: 'SETUP' | 'START' | 'RESET' | 'END' }>([
      {
        name: 'choice',
        message: 'Please make a choice',
        choices: [
          { name: 'Setup', value: 'SETUP' },
          { name: 'Start', value: 'START' },
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
