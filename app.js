'use strict'

const Path = require('path')
const AutoLoad = require('fastify-autoload')

require('dotenv').config()

module.exports = function (fastify, options, next) {
  fastify.register(AutoLoad, {
    dir: Path.join(__dirname, 'plugins'),
    options: Object.assign({}, options)
  })

  fastify.register(AutoLoad, {
    dir: Path.join(__dirname, 'routes'),
    options: Object.assign({}, options)
  })

  next()
}
