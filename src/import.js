const fs = require('fs')
const csv = require('csv-parser')

const connection = require('./database/connection')
const file = process.env.IMPORT_FILE

routes = []
fs.createReadStream(file)
    .pipe(csv())
    .on('data', (row) => {
        routes.push(row)
    })
    .on('end', async () => {
        const result = await insertRoutes(routes)
        console.log('CSV file processed')
        console.log(result)
        process.exit(0)
    })
    .on('error', () => {
        console.log('File not processed')
        process.exit(1)
    })

async function insertRoutes(routes) {
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
