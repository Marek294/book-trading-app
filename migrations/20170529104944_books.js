
exports.up = function(knex, Promise) {
    return knex.schema.createTable('books', function(table) {
        table.increments();
        table.string('book_id').notNullable();
        table.integer('user_id').notNullable();
        table.string('title').notNullable();
        table.string('authors').notNullable();
        table.string('image_thumbnail').notNullable();
        table.timestamps();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('books');
};
