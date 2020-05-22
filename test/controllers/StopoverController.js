const fs = require('fs')
const assert = require('assert')
const chai = require('chai')
const chaiHttp = require('chai-http')
const mockKnex = require('mock-knex');
const tracker = mockKnex.getTracker();
const app = require('./../../src/app')

chai.use(chaiHttp)

const fixtureRoute = readFixtureJSONFile('route.json')

describe('StopoverController', () => {
    describe('#get /stopover/:origin/:destination', () => {
        context('existent route', () => {
            before(() => {
                tracker.install()
                tracker.on('query', (query, step) => {
                    [
                        () => {
                            query.response([fixtureRoute])
                        },
                        () => {
                            query.response([fixtureRoute])
                        },
                        () => {
                            query.response([fixtureRoute])
                        }
                    ][step - 1]()
                })
            })
            it('should return 200', (done) => {
                chai
                .request(app)
                .get(`/stopover/${fixtureRoute.origin}/${fixtureRoute.destination}`)
                .end((err, res) => {
                    assert.equal(res.status, 200)
                    done()
                })
            })
            after(() => {
                tracker.uninstall()
            })
        })

        context('origin == destination', () => {
            it('should return 400', (done) => {
                chai
                .request(app)
                .get('/stopover/XXX/XXX')
                .end((err, res) => {
                    assert.equal(res.status, 400)
                    done()
                })
            })
        })

        context('nonexistent route', () => {
            before(() => {
                tracker.install()
                tracker.on('query', (query, step) => {
                    [
                        () => {
                            query.response(undefined)
                        }
                    ][step - 1]()
                })
            })
            it('should return 400', (done) => {
                chai
                .request(app)
                .get('/stopover/XXX/ZZZ')
                .end((err, res) => {
                    assert.equal(res.status, 404)
                    done()
                })
            })
            after(() => {
                tracker.uninstall()
            })
        })
    })
})

function readFixtureJSONFile(file) {
    return JSON.parse(
        fs.readFileSync(`test/fixtures/${file}`)
    )
}
