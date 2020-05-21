const fs = require('fs')
const assert = require('assert')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('./../../src/app')
const connection = require('./../../src/database/connection')

chai.use(chaiHttp)

describe('StopoverController', () => {
    context('#get /stopover/:origin/:destination (origin = destination)', () => {
        it('it should return 400', (done) => {
            chai
            .request(app)
            .get('/stopover/XXX/XXX')
            .end((err, res) => {
                assert.equal(res.status, 400)
                done()
            })
        })
    })

    context('#get /stopover/:origin/:destination (nonexistent)', () => {
        it('it should return 400', (done) => {
            chai
            .request(app)
            .get('/stopover/XXX/ZZZ')
            .end((err, res) => {
                assert.equal(res.status, 404)
                done()
            })
        })
    })
})

function readFixtureJSONFile(file) {
    return JSON.parse(
        fs.readFileSync(`test/fixtures/${file}`)
    )
}
