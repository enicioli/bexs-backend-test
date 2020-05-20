exports.up = function (knex) {
    return knex.schema.createTable('route', (table) => {
        table.string('origin').notNullable()
        table.string('destination').notNullable()
        table.decimal('price').notNullable()
        table.unique(['origin','destination']);
    })
}

exports.down = function (knex) {
    return knex.schema.dropTable('route')
}
