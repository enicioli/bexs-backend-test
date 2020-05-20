class StopoverCalculation
{
    constructor(routes) {
        this.routes = {}
        routes.forEach(route => {
            if (!this.routes.hasOwnProperty(route.origin)) {
                this.routes[route.origin] = {}
            }
            this.routes[route.origin][route.destination] = route
        })

        this.lists = []
        this.bestList = null
        this.showAll = false
    }

    calculateBestStopoverListByPrice(origin, destination) {
        this.showAll = false
        this.populate(origin, destination)

        return this.bestList
    }

    calculateAllStopoverLists(origin, destination) {
        this.showAll = true
        this.populate(origin, destination)

        return this.lists.filter(list => list.isClosed)
    }

    populate(origin, destination) {
        this.reset()

        const routes = this.getRoutesByOrigin(origin)

        for (let [k, route] of Object.entries(routes)) {
            const list = this.newList(origin, destination)
            this.addToList(list, route)
            this.stopoverTree(list)
            this.lists.push(list)
        }
    }

    stopoverTree(list) {
        if (this.isBestList(list)) {
            this.bestList = list
        } else {
            if (this.isListDiscarded(list)) {
                return
            }
        }

        const routes = this.getRoutesByOrigin(list.tail)

        const departures = []
        for (let route of Object.values(routes)) {
            if (this.canAddToList(list, route)) {
                departures.push(route)
            }
        }

        departures.forEach((route, i) => {
            if (i === (departures.length - 1)) {
                this.addToList(list, route)
                this.stopoverTree(list)
            } else {
                const listClone = JSON.parse(JSON.stringify(list))
                this.addToList(listClone, route)
                this.stopoverTree(listClone)
                this.lists.push(listClone)
            }
        })
    }

    getRoutesByOrigin(origin) {
        return this.routes.hasOwnProperty(origin)
            ? this.routes[origin]
            : {}
    }

    reset() {
        this.lists = []
        this.bestList = null
    }

    isBestList(list) {
        return list.isClosed
            && (
                !this.bestList
                || (
                    this.bestList
                    && (
                        list.price < this.bestList.price
                        || (
                            list.price == this.bestList.price
                            && list.size < this.bestList.size
                        )
                    )
                )
            )
    }

    isListDiscarded(list) {
        return !this.showAll
            && this.bestList
            && (
                (
                    !list.isClosed
                    && list.price >= this.bestList.price
                )
                || (
                    list.isClosed
                    && (
                        list.price > this.bestList.price
                        || (
                            list.price == this.bestList.price
                            && list.size >= this.bestList.size
                        )
                    )
                )
            )
    }

    newList(origin, destination) {
        return {
            head: origin,
            body: [
                origin
            ],
            tail: origin,
            destination: destination,
            size: 0,
            price: 0,
            isClosed: false
        }
    }

    addToList(list, route) {
        if (!this.canAddToList(list, route)) {
            return false
        }

        list.size++
        list.price += parseFloat(route.price)
        list.body.push(route.destination)
        list.tail = route.destination

        if (list.tail === list.destination) {
            list.isClosed = true
        }

        return true
    }

    canAddToList(list, route) {
        return !list.isClosed
            && list.tail === route.origin
            && !list.body.includes(route.destination)
    }
}

module.exports = StopoverCalculation
