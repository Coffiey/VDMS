/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('monster', table => {
        table.string('index').notNullable();
        table.string('monster_reference').notNullable().unique()
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('monster', table => {
        table.dropColumn('index');
        table.dropColumn('monster_reference');
      })
};
