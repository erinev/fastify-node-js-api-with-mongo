'use strict';

module.exports = async function (fastify, options) {
  fastify.get('/', async function (request, reply) {
    return 'Hello from REST Node JS API server with fastify!';
  });
};
