const getBannersSchema = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            bannerType: { type: 'string', enum: ['Image', 'Flash'] },
            size: {
              type: 'object',
              properties: {
                width: { type: 'number' },
                height: { type: 'number' }
              }
            },
            active: { type: 'boolean' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' }
          }
        }
      }
    }
  }
};

module.exports = getBannersSchema;
