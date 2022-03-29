// @ts-check
/** @typedef {import('knex').Knex} Knex  */

// TODO: Setup your migration file.

/**
 * @param {Knex} knex
 * @returns {Promise<void>}
 */
async function up(knex) {
  await knex.schema.createTable('products', (table) => {
    table.string('name').unique().primary();
    table.integer('stock').notNullable().defaultTo(0);
  })
  await knex.schema.createTable('product_stock_movement_events', (table) => {
    table.uuid('id').unique().primary();
    table.timestamp('date').notNullable();
    table.string('productName').notNullable();
    table.integer('value').notNullable();
  })
  .alterTable('product_stock_movement_events', (table) => {
    table.foreign('productName').references('products.name');
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
