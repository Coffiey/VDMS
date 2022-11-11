/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('pc', table => {
        table.increments('id');
        table.string('name').notNullable().unique();
        table.string('class').notNullable();
        table.string('sub_class').notNullable();
        table.string('race').notNullable();
        table.integer('level').notNullable();
        table.integer('max_hp').notNullable();
        table.integer('dex').notNullable();
        table.integer('int').notNullable();
        table.integer('cha').notNullable();
        table.integer('str').notNullable();
        table.integer('con').notNullable();
        table.integer('wis').notNullable();
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("pc");
};
