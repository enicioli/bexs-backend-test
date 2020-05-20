const connection = require('./../database/connection')

module.exports = {
    async get(origin, destination) {
        return connection('route')
            .select('*')
            .where({
                origin,
                destination
            })
            .first()
    },
    async getByOrigin(origin) {
        return connection('route')
            .select('*')
            .where({
                origin
            })
    },
    async getByDestination(destination) {
        return connection('route')
            .select('*')
            .where({
                destination
            })
    },
    async create(data) {
        try {
            return connection('route').insert(data)
        } catch(e) {
            throw e
        }
    },
    async update(route, data) {
        try {
            const { origin, destination } = route
            const { price } = data

            return connection('route')
                .where({
                    origin,
                    destination
                })
                .update({
                    price
                })
        } catch (e) {
            throw e
        }
    },
    async delete(route) {
        const { origin, destination } = route

        return connection('route')
            .where({
                origin,
                destination
            })
            .delete()
    }
}
