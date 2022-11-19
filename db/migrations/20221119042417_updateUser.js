/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('user', table => {
        table.dropColumn('first_name');
        table.dropColumn('last_name');
        table.dropColumn('email');
        table.string('user_name').unique().notNullable();
        table.string('password').notNullable();
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('user', table => {
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.dropColumn('user_name');
      })
};
