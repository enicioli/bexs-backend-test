const fs = require('fs')
const assert = require('assert')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('./../src/app')

chai.use(chaiHttp)

describe('RouteController', () => {
    describe('post /route', () => {
        it(`it should create a new route`, (done) => {
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

    describe('get /route/:origin/:destination', () => {
        it(`it should retrieve a route`, (done) => {
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
})

describe('StopoverController', () => {
    context('get /stopover/:origin/:destination with invalid params', () => {
        it(`it should return 400`, (done) => {
            chai
            .request(app)
            .get(`/stopover/XXX/XXX`)
            .end((err, res) => {
                assert.equal(res.status, 400)
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
