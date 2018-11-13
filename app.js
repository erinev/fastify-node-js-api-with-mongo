'use strict';

const path = require('path');
const autoLoad = require('fastify-autoload');

require('dotenv').config();

module.exports = function (fastify, options, next) {
  fastify.register(autoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, options)
  });

  fastify.register(autoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, options)
  });

  next();
};
