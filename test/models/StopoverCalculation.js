const fs = require('fs')
const assert = require('assert')
const StopoverCalculation = require('./../../src/models/StopoverModel/StopoverCalculation')

describe('StopoverCalculation', () => {
    describe('#constructor', () => {
        it('should map routes into an object indexed by origin and destination', (done) => {
            const routes = [{origin: 'a', destination: 'b', price: 1}]
            const stopoverCalculation = new StopoverCalculation(routes)
            const actual = stopoverCalculation.routes
            const expected = {'a':{'b':{origin: 'a', destination: 'b', price: 1}}}
            assert.deepEqual(actual, expected)
            done()
        })
    })

    describe('#getRoutesByOrigin', () => {
        it('should return only the routes from a given origin', (done) => {
            const routeA = {origin: 'a', destination: 'b', price: 1}
            const routeB = {origin: 'b', destination: 'c', price: 2}
            const routes = [routeA, routeB]
            const stopoverCalculation = new StopoverCalculation(routes)
            const actual = stopoverCalculation.getRoutesByOrigin(routeA.origin)
            const expected = {'b':{origin: 'a', destination: 'b', price: 1}}
            assert.deepEqual(actual, expected)
            done()
        })
    })

    describe('#isBestList', () => {
        it('should return true if bestList is empty and the given list is closed', (done) => {
            const stopoverCalculation = new StopoverCalculation([])
            const list = {isClosed: true}
            const actual = stopoverCalculation.isBestList(list)
            assert.equal(actual, true)
            done()
        })
        it('should return false if bestList is empty and the given list is not closed', (done) => {
            const stopoverCalculation = new StopoverCalculation([])
            const list = {isClosed: false}
            const actual = stopoverCalculation.isBestList(list)
            assert.equal(actual, false)
            done()
        })
        it('should return true if bestList is not empty and the given list is cheaper', (done) => {
            const stopoverCalculation = new StopoverCalculation([])
            const listA = {isClosed: true, price: 10}
            stopoverCalculation.bestList = listA
            const listB = {isClosed: true, price: 5}
            const actual = stopoverCalculation.isBestList(listB)
            assert.equal(actual, true)
            done()
        })
        it('should return false if bestList is not empty and the given list is more expensive', (done) => {
            const stopoverCalculation = new StopoverCalculation([])
            const listA = {isClosed: true, price: 10}
            stopoverCalculation.bestList = listA
            const listB = {isClosed: true, price: 20}
            const actual = stopoverCalculation.isBestList(listB)
            assert.equal(actual, false)
            done()
        })
        it('should return true if bestList is not empty and the given list is equal but shorter', (done) => {
            const stopoverCalculation = new StopoverCalculation([])
            const listA = {isClosed: true, price: 10, size: 5}
            stopoverCalculation.bestList = listA
            const listB = {isClosed: true, price: 10, size: 3}
            const actual = stopoverCalculation.isBestList(listB)
            assert.equal(actual, true)
            done()
        })
        it('should return true if bestList is not empty and the given list is equal but longer', (done) => {
            const stopoverCalculation = new StopoverCalculation([])
            const listA = {isClosed: true, price: 10, size: 5}
            stopoverCalculation.bestList = listA
            const listB = {isClosed: true, price: 10, size: 10}
            const actual = stopoverCalculation.isBestList(listB)
            assert.equal(actual, false)
            done()
        })
    })

    describe('#canAddToList', () => {
        it('should return false if the given list is closed', (done) => {
            const stopoverCalculation = new StopoverCalculation([])
            const list = {isClosed: true}
            const actual = stopoverCalculation.canAddToList(list)
            assert.equal(actual, false)
            done()
        })
        it('should return false if the given route already on the list', (done) => {
            const stopoverCalculation = new StopoverCalculation([])
            const list = {isClosed: false, body:['a', 'b']}
            const route = {origin: 'a', destination: 'c', price: 1}
            const actual = stopoverCalculation.canAddToList(list, route)
            assert.equal(actual, false)
            done()
        })
        it('should return false if the given origin already on the list', (done) => {
            const stopoverCalculation = new StopoverCalculation([])
            const list = {isClosed: false, body:['a', 'b']}
            const route = {origin: 'a', destination: 'c', price: 1}
            const actual = stopoverCalculation.canAddToList(list, route)
            assert.equal(actual, false)
            done()
        })
        it('should return false if the given origin is not equal the list tail', (done) => {
            const stopoverCalculation = new StopoverCalculation([])
            const list = {isClosed: false, tail: 'a'}
            const route = {origin: 'b', destination: 'c', price: 1}
            const actual = stopoverCalculation.canAddToList(list, route)
            assert.equal(actual, false)
            done()
        })
        it('should return true if the given route must be accepted', (done) => {
            const stopoverCalculation = new StopoverCalculation([])
            const list = {isClosed: false, tail: 'a', body: ['a']}
            const route = {origin: 'a', destination: 'b', price: 1}
            const actual = stopoverCalculation.canAddToList(list, route)
            assert.equal(actual, true)
            done()
        })
    })

    describe('#addToList', () => {
        it('should return true and close the list if the destination is reached', (done) => {
            const stopoverCalculation = new StopoverCalculation([])
            const list = {isClosed: false, destination: 'b', body: ['a'], tail:'a'}
            const route = {origin: 'a', destination: list.destination, price: 1}
            const oldBody = JSON.parse(JSON.stringify(list.body))
            actual = stopoverCalculation.addToList(list, route)
            assert.equal(actual, true)
            assert.equal(list.isClosed, true)
            oldBody.push(route.destination); assert.deepEqual(list.body, oldBody)
            assert.equal(list.tail, route.destination)
            assert.equal()
            done()
        })
    })
})
