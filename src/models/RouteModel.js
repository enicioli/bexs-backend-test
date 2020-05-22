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
    async create(data) {
        return connection('route')
            .insert(data)
    },
    async update(origin, destination, data) {
        const { price } = data

        return connection('route')
            .where({
                origin,
                destination
            })
            .update({
                price
            })
    },
    async delete(origin, destination) {
        return connection('route')
            .where({
                origin,
                destination
            })
            .delete()
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
    }
}
