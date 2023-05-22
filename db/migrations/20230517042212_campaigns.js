/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("campaigns", (table) => {
    table.increments("id").primary();
    table
      .integer("user_id")
      .references("user.id")
      .notNullable()
      .onDelete("CASCADE");
    table.string("campaign_name").notNullable();
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
