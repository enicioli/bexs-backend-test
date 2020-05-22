const RouteModel = require('./../models/RouteModel')

module.exports = {
    async create(request, response) {
        const { origin, destination, price } = request.body

        try {
            await RouteModel.create({
                origin,
                destination,
                price
            })
        } catch (e) {
            return response.status(400).json(e)
        }

        return response.status(201).send()
    },
    async update(request, response) {
        const { origin, destination } = request.params
        const { price } = request.body

        try {
            var updated = await RouteModel.update(origin, destination, { price })
        } catch (e) {
            return response.status(400).json(e)
        }

        return response.status(updated ? 200 : 404).send()
    },
    async one(request, response) {
        const { origin, destination } = request.params

        try {
            var route = await RouteModel.get(origin, destination)
        } catch (e) {
            return response.status(400).json(e)
        }

        if (route === undefined) {
            return response.status(404).send()
        }

        return response.json(route)
    },
    async delete(request, response) {
        const { origin, destination } = request.params

        try {
            var deleted = await RouteModel.delete(origin, destination)
        } catch (e) {
            return response.status(400).json(e)
        }

        return response.status(deleted ? 204 : 404).send()
    },
    async listByOrigin(request, response) {
        const { origin } = request.params

        try {
            var routes = await RouteModel.getByOrigin(origin)
        } catch (e) {
            return response.status(400).json(e)
        }
        
        return response.json(routes)
    },
    async listByDestination(request, response) {
        const { destination } = request.params

        try {
            var routes = await RouteModel.getByDestination(destination)
        } catch (e) {
            return response.status(400).json(e)
        }
    
        return response.json(routes)
    }
}
