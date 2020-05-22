const fs = require('fs')
const assert = require('assert')
const chai = require('chai')
const chaiHttp = require('chai-http')
const mockKnex = require('mock-knex');
const tracker = mockKnex.getTracker();
const app = require('./../../src/app')

chai.use(chaiHttp)

const fixtureRoute = readFixtureJSONFile('route.json')

describe('RouteController', () => {
    describe('#post /route', () => {
        before(() => {
            tracker.install()
            tracker.on('query', (query, step) => {
                [
                    () => {
                        query.response([1])
                    },
                    () => {
                        query.response(fixtureRoute)
                    }
                ][step - 1]()
            })
        })
        it('should return 201', (done) => {
            chai
            .request(app)
            .post('/route')
            .send(fixtureRoute)
            .end((err, res) => {
                assert.equal(res.status, 201)
                done()
            })
        })
        after(() => {
            tracker.uninstall()
        })
    })

    describe('#get /route/:origin/:destination', () => {
        context('existent route', () => {
            before(() => {
                tracker.install()
                tracker.on('query', (query, step) => {
                    [
                        () => {
                            query.response(fixtureRoute)
                        }
                    ][step - 1]()
                })
            })
            it('should return 200', (done) => {
                chai
                .request(app)
                .get(`/route/${fixtureRoute.origin}/${fixtureRoute.destination}`)
                .end((err, res) => {
                    assert.equal(res.status, 200)
                    done()
                })
            })
            after(() => {
                tracker.uninstall()
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
            it('should return 404', (done) => {
                chai
                .request(app)
                .get(`/route/XXX/ZZZ`)
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

    describe('#delete /route/:origin/:destination', () => {
        context('existent route', () => {
            before(() => {
                tracker.install()
                tracker.on('query', (query, step) => {
                    [
                        () => {
                            query.response(fixtureRoute)
                        },
                        () => {
                            query.response(1)
                        }
                    ][step - 1]()
                })
            })
            it('should return 204', (done) => {
                chai
                .request(app)
                .delete(`/route/${fixtureRoute.origin}/${fixtureRoute.destination}`)
                .end((err, res) => {
                    assert.equal(res.status, 204)
                    done()
                })
            })
            after(() => {
                tracker.uninstall()
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
            it('should return 404', (done) => {
                chai
                .request(app)
                .delete('/route/XXX/ZZZ')
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
