// @ts-check
/** @typedef {import('knex').Knex} Knex  */

// TODO: Setup your migration file.

/**
 * @param {Knex} knex
 * @returns {Promise<void>}
 */
async function up(knex) {
  await knex.schema.createTable('products', (table) => {
    // ... define your columns
  })
}

/**
 * @param {Knex} knex
 * @returns {Promise<void>}
 */
async function down(knex) {
  await knex.schema.dropTable('products')
}

module.exports = { up, down }
