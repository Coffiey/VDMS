/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("monster", (table) => {
    table.increments("id").primary();
    table.string("monster_id").notNullable();
    table.string("monster_name").notNullable();
    table.integer("health").defaultTo(null);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("monster");
};
