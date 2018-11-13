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

module.exports = {
  getBanners: async function(fastify, offset = 0, limit = 100) {
    const database = fastify.mongo.db(process.env.MONGO_DATABASE_NAME);
    const bannersCollection = database.collection(process.env.MONGO_BANNERS_COLLECTION_NAME);

    let banners = await bannersCollection
      .find()
      .skip(offset)
      .limit(limit)
      .toArray();

    return banners.map(MapMongoItemToDto);
  },
  getBannerById: async function(fastify, bannerId) {
    const database = fastify.mongo.db(process.env.MONGO_DATABASE_NAME);
    const bannersCollection = database.collection(process.env.MONGO_BANNERS_COLLECTION_NAME);

    const _id = new MongoObjectId(bannerId);

    const foundBanner = await bannersCollection.findOne({ _id });

    if (foundBanner === null) {
      const bannerNotFoundError = new Error();
      bannerNotFoundError.statusCode = 404;
      bannerNotFoundError.message = 'Banner was not found';
      throw bannerNotFoundError;
    }

    return MapMongoItemToDto(foundBanner);
  },
  createBanner: async function(fastify, newBanner) {
    const database = fastify.mongo.db(process.env.MONGO_DATABASE_NAME);
    const bannersCollection = database.collection(process.env.MONGO_BANNERS_COLLECTION_NAME);

    const upperCasedBannerName = newBanner.name.toUpperCase();

    const bannerWithSameName = await bannersCollection.findOne({ upperCasedName: upperCasedBannerName });

    if (bannerWithSameName !== null) {
      const duplicateBannerNameError = new Error();
      duplicateBannerNameError.statusCode = 400;
      duplicateBannerNameError.message = `Banner with name '${newBanner.name}' already exists`;
      throw duplicateBannerNameError;
    }

    const dateTimeNow = new Date().toLocaleString('lt-LT');
    const newBannerDocument = {
      ...newBanner,
      upperCasedName: upperCasedBannerName,
      active: true,
      createdAt: dateTimeNow,
      updatedAt: dateTimeNow,
    };

    await bannersCollection.insertOne(newBannerDocument);

    return MapMongoItemToDto(newBannerDocument);
  }
};
