'use strict';

module.exports = async function (fastify) {
  fastify.get('/', async function () {
    return 'Hello from REST Node JS API server with fastify!';
  });
};
