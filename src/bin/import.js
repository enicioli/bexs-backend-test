const fs = require('fs')
const csv = require('csv-parser')
const connection = require('./../database/connection')

async function importFile(file) {
    await Promise.all([readStream(file, routes = [])])
    const result = await fillDatabase(routes)
    return result
}

function readStream(file, routes) {
    return new Promise((resolve, reject) => {
        fs.createReadStream(file)
            .pipe(csv())
            .on('data', (row) => {
                routes.push(row)
            })
            .on('end', () => {
                resolve()
            })
    })
}

async function fillDatabase(routes) {
    await connection('route').delete()

    success = 0
    failure = 0
    total = routes.length
    for (i = 0; i < total; i++) {
        bulk = []
        for (j = 0; j < 300 && i < total; j++, i++) {
            bulk.push(routes[i])
        }

        try {
            await connection('route').insert(bulk)
            success += bulk.length
        } catch (e) {
            failure += bulk.length
        }
    }

    return {
        success,
        failure
    }
}

module.exports = importFile
