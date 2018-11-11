'use strict'

const { test } = require('tap')
const { build } = require('../helper')

test('banners list can be retrieved', async (t) => {
  const app = build(t)

  const res = await app.inject({
    url: '/banners'
  })
  
  t.equal(res.payload, 'Banners list')
})

