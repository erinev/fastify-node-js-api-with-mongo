'use strict';

const fastifyPlugin = require('fastify-plugin');
const MongoClient = require('mongodb').MongoClient;

async function mongoDbConnector (fastify) {
  const mongoOptions = {
    useNewUrlParser: true
  };

  const db = await MongoClient.connect(process.env.MONGO_SERVER_URL, mongoOptions);

  fastify.decorate('mongo', db);
}

module.exports = fastifyPlugin(mongoDbConnector);
