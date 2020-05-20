const RouteModel = require('./../models/RouteModel')
const StopoverModel = require('./../models/StopoverModel')

module.exports = {
    async calculate(request, response) {
        const { origin, destination } = request.params

        if (origin === destination) {
            return response.status(400).send()
        }

        const routesByOrigin = await RouteModel.getByOrigin(origin)

        if (routesByOrigin === undefined) {
            return response.status(404).send()
        }

        const routesByDestination = await RouteModel.getByDestination(destination)

        if (routesByDestination === undefined) {
            return response.status(404).send()
        }

        const stopoverList = await StopoverModel.calculate(origin, destination)

        if (!stopoverList) {
            return response.status(404).send()
        }

        return response.json(stopoverList)
    }
}
