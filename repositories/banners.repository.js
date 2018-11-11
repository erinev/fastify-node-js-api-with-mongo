'use strict';

const MongoObjectId = require('mongodb').ObjectID;

const appendIdToMongoItem = item => ({
  ...item,
  id: item._id.toString()
});

function MapMongoItemToDto(mongoItem) {
  let dto = appendIdToMongoItem(mongoItem);

  delete dto._id;
  delete dto.upperCasedName;

  return dto;
}

async function GetBanners(fastify, offset = 0, limit = 100) {
  const database = fastify.mongo.db(process.env.MONGO_DATABASE_NAME);
  const bannersCollection = database.collection(process.env.MONGO_BANNERS_COLLECTION_NAME);

  let banners = await bannersCollection
    .find()
    .skip(offset)
    .limit(limit)
    .toArray();

  return banners.map(MapMongoItemToDto);
}

async function GetBannerById(fastify, bannerId) {
  const database = fastify.mongo.db(process.env.MONGO_DATABASE_NAME);
  const bannersCollection = database.collection(process.env.MONGO_BANNERS_COLLECTION_NAME);

  const _id = new MongoObjectId(bannerId);

  const foundBanner = await bannersCollection.findOne({ _id });

  if (foundBanner === null) {
    throw new Error(`Banner with id '${bannerId}' was not found`);
  }

  return MapMongoItemToDto(foundBanner);
}
