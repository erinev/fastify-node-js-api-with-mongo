'use strict';

const createBannerSchema = require('../schemas/createBanner.schema');
const getBannerByIdSchema = require('../schemas/getBannerById.schema');
const getBannersSchema = require('../schemas/getBanners.schema');
const bannersRepository = require('../repositories/banners.repository');

module.exports = async function (fastify) {
  const database = fastify.mongo.db(process.env.MONGO_DATABASE_NAME);
  const bannersCollection = database.collection(process.env.MONGO_BANNERS_COLLECTION_NAME);

  fastify.get('/banners', { getBannersSchema }, async function (_, reply) {
    reply.code(200);

    return bannersRepository.getBanners(bannersCollection);
  });

  fastify.get('/banners/:id', { getBannerByIdSchema }, async function (request, reply) {
    reply.code(200);

    return bannersRepository.getBannerById(bannersCollection, request.params.id);
  });

  fastify.post('/banners', { createBannerSchema }, async function (request, reply) {
    reply.code(201);

    return bannersRepository.createBanner(bannersCollection, request.body);
  });
};
