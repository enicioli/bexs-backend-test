const express = require('express')
const cors = require('cors')
const routes = require('./routes')

const app = express()

app.use(express.json())
app.use(cors())
app.use(routes)

if (process.env.NODE_ENV !== 'test') {
    app.listen(process.env.APP_PORT || 3333)
}

module.exports = app // for testing
