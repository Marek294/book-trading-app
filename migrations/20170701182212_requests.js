
exports.up = function(knex, Promise) {
    return knex.schema.createTable('requests', function(table) {
        table.increments();
        table.integer('book_id').notNullable();
        table.string('book_title').notNullable();
        table.integer('buyer_id').notNullable();
        table.string('buyer_username').notNullable();
        table.integer('seller_id').notNullable();
        table.string('seller_username').notNullable();
        table.string('status').notNullable();
        table.timestamps();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('requests');
};
