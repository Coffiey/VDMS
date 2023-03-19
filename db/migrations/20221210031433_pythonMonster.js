/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('scan_monster', table => {
        table.increments('id');
        table.string('name').notNullable().unique();
        table.string('size').notNullable();
        table.string('armor_class').notNullable();
        table.string('hit_points').notNullable();
        table.integer('speed').notNullable();
        table.integer('dex').notNullable();
        table.integer('int').notNullable();
        table.integer('cha').notNullable();
        table.integer('str').notNullable();
        table.integer('con').notNullable();
        table.integer('wis').notNullable();
        table.integer('saving_throw').notNullable();
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("scan_monster");
};
