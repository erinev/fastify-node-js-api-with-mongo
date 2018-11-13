'use strict';

const createBannerSchema = require('../schemas/createBanner.schema');
const getBannerByIdSchema = require('../schemas/getBannerById.schema');
const getBannersSchema = require('../schemas/getBanners.schema');
const bannersRepository = require('../repositories/banners.repository');

module.exports = async function (fastify) {
  fastify.get('/banners', { getBannersSchema }, async function (_, reply) {
    reply.code(200);

    return bannersRepository.getBanners(fastify);
  });

  fastify.get('/banners/:id', { getBannerByIdSchema }, async function (request, reply) {
    reply.code(200);

    return bannersRepository.getBannerById(fastify, request.params.id);
  });

  fastify.post('/banners', { createBannerSchema }, async function (request, reply) {
    reply.code(201);

    return bannersRepository.createBanner(fastify, request.body);
  });
};
