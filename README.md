[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/enicioli/bexs-backend-test/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/enicioli/bexs-backend-test/?branch=master)
[![Build Status](https://scrutinizer-ci.com/g/enicioli/bexs-backend-test/badges/build.png?b=master)](https://scrutinizer-ci.com/g/enicioli/bexs-backend-test/build-status/master)

# Flight API
This project is an API of Flight Routes, based on [this](/INSTRUCTIONS.md) instructions

## Dependencies
- [Docker](https://www.docker.com/) (along with docker-compose)

## Installation
```shell script
git clone git@github.com:enicioli/bexs-backend-test.git
```
```shell script
cd bexs-backend-test
```
```shell script
sudo docker-compose up -d --build
```

### One container will be initialized:
- bexs-backend-test (REST API connected to the host port 3333)

>When the container is built, some sample data is imported into the database.
>
>This sample data is based on this [file](/resources/IATA.csv) with more than 80.000 different route combinations between 288 airports in Brazil at random prices.

## Console

### Find the best price for a route via console:
```shell script
sudo docker exec -it bexs-backend-test /bin/sh -c "npm run console search"
```
>Then, inform an origin (ex: GRU) and a destination (ex: GIG).

Or just:
```shell script
sudo docker exec -it bexs-backend-test /bin/sh -c "npm run console search GRU GIG"
```

>This search may take a few seconds, as the [default database](/resources/IATA.csv) is very large.

### Import your own csv database file via console:

> Note: Your file must have the following headings in the first line: `origin,destination,price`

- #### Upload your file to container:
```shell script
sudo docker cp /path/to/filename.csv bexs-backend-test:/usr/src/app/resources
```

- #### Run import command:
```shell script
sudo docker exec -it bexs-backend-test /bin/sh -c "npm run console import"
```
>Then, type your filename.csv as prompted.

Or just:
```shell script
sudo docker exec -it bexs-backend-test /bin/sh -c "npm run console import filename.csv"
```

## REST API
>[This file](/bexs-backend-test.postman_collection.json) contains a [Postman](https://www.getpostman.com/) collection with examples of all the endpoints.

#### Main technologies
- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Chalk](https://github.com/chalk/chalk)
- [Knex](http://knexjs.org/)
- [Mocha](https://mochajs.org/)
- [Chai](https://www.chaijs.com/)
