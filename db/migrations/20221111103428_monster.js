/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('monster', table => {
        table.increments('id');
        table.string('monster_id').notNullable().unique();
        table.string('monster_name').notNullable().unique();
        table.integer('health').defaultTo(null);
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("monster");
};
