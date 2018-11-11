'use strict'

const { test } = require('tap')
const { build } = require('../helper')

test('root route is working', async (t) => {
  const app = build(t)

  const res = await app.inject({
    url: '/'
  })

  t.equal(res.payload, 'Hello from REST Node JS API server with fastify!')
  //t.deepEqual(JSON.parse(res.payload), { root: true })
})
