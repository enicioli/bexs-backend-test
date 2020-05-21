const fs = require('fs')
const assert = require('assert')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('./../../src/app')

chai.use(chaiHttp)

describe('RouteController', () => {
    describe('#post /route', () => {
        it('should 201', (done) => {
            chai
            .request(app)
            .post(`/route`)
            .send(readFixtureJSONFile('route.json'))
            .end((err, res) => {
                assert.equal(res.status, 201)
                done()
            })
        })
    })

    describe('#get /route/:origin/:destination', () => {
        it('should return 200', (done) => {
            const route = readFixtureJSONFile('route.json')
            chai
            .request(app)
            .get(`/route/${route.origin}/${route.destination}`)
            .end((err, res) => {
                assert.equal(res.status, 200)
                done()
            })
        })
    })

    describe('#get /route/:origin/:destination nonexistent', () => {
        it('should return 404', (done) => {
            chai
            .request(app)
            .get(`/route/XXX/ZZZ`)
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
