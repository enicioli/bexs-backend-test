FROM keymetrics/pm2:12-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY knexfile.js ./
COPY ./src ./src
COPY ./resources ./resources

ENV NPM_CONFIG_LOGLEVEL warn
#RUN npm ci --$NODE_ENV
RUN npm install
RUN npx knex migrate:latest
RUN npm run import-default-database

EXPOSE $APP_PORT
CMD ["pm2-runtime", "src/app.js"]
