'use strict'

const fastify = require('fastify')
const fastifyPlugin = require('fastify-plugin')
const app = require('../app')

function config () {
  return {}
}

function build (t) {
  const api = fastify()

  api.register(fastifyPlugin(app), config())

  t.tearDown(api.close.bind(api))

  return api
}

module.exports = {
  config,
  build
}
