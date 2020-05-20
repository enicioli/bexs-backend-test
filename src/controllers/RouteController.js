const RouteModel = require('./../models/RouteModel')

module.exports = {
    async listByOrigin(request, response) {
        const { origin } = request.params
        const routes = await RouteModel.getByOrigin(origin)
    
        return response.json(routes)
    },
    async listByDestination(request, response) {
        const { destination } = request.params
        const routes = await RouteModel.getByDestination(destination)
    
        return response.json(routes)
    },
    async one(request, response) {
        const { origin, destination } = request.params
        const route = await RouteModel.get(origin, destination)

        return route
            ? response.json(route)
            : response.status(404).send()
    },
    async create(request, response) {
        const { origin, destination, price } = request.body
    
        try {
            await RouteModel.create({
                origin,
                destination,
                price
            })
        } catch(e) {
            return response.status(400).json(e)
        }

        return response.status(201).json(await RouteModel.get(origin, destination))
    },
    async update(request, response) {
        const { origin, destination } = request.params
        const { price } = request.body
        let route = await RouteModel.get(origin, destination)

        if (!route) {
            return response.status(404).send()
        }
    
        try {
            route = await RouteModel.update(route, { price })
        } catch (e) {
            return response.status(400).json(e)
        }

        return response.json(await RouteModel.get(origin, destination))
    },
    async delete(request, response) {
        const { origin, destination } = request.params
        const route = await RouteModel.get(origin, destination)

        if (!route) {
            return response.status(404).send()
        }

        await RouteModel.delete(route)
    
        return response.status(204).send()
    }
}
