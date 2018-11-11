'use strict';

const MongoObjectId = require('mongodb').ObjectID;

const createBannerSchema = require('../schemas/createBanner.schema');
const getBannerByIdSchema = require('../schemas/getBannerById.schema');
const getBannersSchema = require('../schemas/getBanners.schema');

const appendIdToMongoItem = item => ({
  ...item,
  id: item._id.toString(),
});

function mapMongoItemToDto (mongoItem) {
  let dto = appendIdToMongoItem(mongoItem);

  delete dto._id;
  delete dto.upperCasedName;
  
  return dto;
}

module.exports = async function (fastify, options) {
  const database = fastify.mongo.db('NodeJsRestApi');
  const bannersCollection = database.collection('Banners');

  fastify.get('/banners', { getBannersSchema }, async function (request, reply) {
    let banners = await bannersCollection.find().toArray();

    reply.code(200);

    return banners.map(mapMongoItemToDto);
  });

  fastify.get('/banners/:id', { getBannerByIdSchema }, async function (request, reply) {
    const _id = new MongoObjectId(request.params.id);

    const foundBanner = await bannersCollection.findOne({ _id });

    if (foundBanner === null) {
        throw new Error(`Banner with id '${request.params.id}' was not found`);
    }

    reply.code(200);

    return mapMongoItemToDto(foundBanner);
  });

  fastify.post('/banners', { createBannerSchema }, async function (request, reply) {
    const upperCasedBannerName = request.body.name.toUpperCase();

    const bannerWithSameName = await bannersCollection.findOne({ upperCasedName: upperCasedBannerName });

    if (bannerWithSameName !== null) {
      throw new Error(`Banner with name '${request.body.name}' already exists`);
    }
    
    const dateTimeNow = new Date().toLocaleString("lt-LT");
    const newBannerDocument = {
      ...request.body,
      upperCasedName: upperCasedBannerName,
      active: true,
      createdAt: dateTimeNow,
      updatedAt: dateTimeNow,
    };

    await bannersCollection.insertOne(newBannerDocument);

    reply.code(201);

    return mapMongoItemToDto(newBannerDocument);
  });
};