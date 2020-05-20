const knex = require('knex')
const config = require('./../../knexfile')
const connection = knex(config)

// for testing
if (process.env.NODE_ENV === 'test') {
    var mockDb = require('mock-knex'); 
    mockDb.mock(connection)
    module.exports = mockDb
}

module.exports = connection
