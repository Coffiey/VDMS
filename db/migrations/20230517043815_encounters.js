/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("encounters", (table) => {
    table.increments("id").primary();
    table
      .integer("campaigns_id")
      .references("campaigns.id")
      .notNullable()
      .onDelete("CASCADE");
    table.string("encounter_name").notNullable().unique();
    table.text("notes").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("campaigns");
};
