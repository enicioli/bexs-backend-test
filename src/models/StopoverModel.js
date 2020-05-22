const connection = require('./../database/connection')
const StopoverCalculation = require('./StopoverModel/StopoverCalculation')

module.exports = {
    async calculate(origin, destination) {
        const routes = await connection('route')
            .select('*')
            .orderByRaw(`case when origin like '${origin}' then 0 else 1 end`)
            .orderByRaw(`case when destination like '${destination}' then 0 else 1 end`)

        if (routes === undefined) {
            return null
        }

        const calculation = new StopoverCalculation(routes)
        const stopoverList = calculation.calculateBestStopoverListByPrice(origin, destination)

        if (!stopoverList) {
            return null
        }

        return {
            origin: stopoverList.head,
            destination: stopoverList.destination,
            price: stopoverList.price,
            stopovers: stopoverList.body
        }
    }
}
