const routes = require('express').Router()

const RouteController = require('./controllers/RouteController')
const StopoverController = require('./controllers/StopoverController')

routes.get('/route/origin/:origin', RouteController.listByOrigin)
routes.get('/route/destination/:destination', RouteController.listByDestination)
routes.post('/route', RouteController.create)
routes.put('/route/:origin/:destination', RouteController.update)
routes.patch('/route/:origin/:destination', RouteController.update)
routes.get('/route/:origin/:destination', RouteController.one)
routes.delete('/route/:origin/:destination', RouteController.delete)

routes.get('/stopover/:origin/:destination', StopoverController.calculate)

module.exports = routes
