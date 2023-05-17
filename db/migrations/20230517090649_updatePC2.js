/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("pc", (table) => {
    table.dropColumn("encounters_id");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("pc", (table) => {
    table
      .integer("encounters_id")
      .references("encounters.id")
      .onDelete("CASCADE");
  });
};
