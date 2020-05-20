const StopoverModel = require('./models/StopoverModel')

const origin = process.env.ORIGIN
const destination = process.env.DESTINATION

async function search(origin, destination) {
    const stopoverList = await StopoverModel.calculate(origin, destination)
    console.log(stopoverList)
    process.exit(0)
}

search(origin, destination)
