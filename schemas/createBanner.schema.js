const createBannerSchema = {
  schema: {
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        bannerType: { type: 'string', 'enum': ['Image', 'Flash'] },
        size: {
          type: 'object',
          properties: {
            width: { type: 'number' },
            height: { type: 'number' },
          },
          required: ['width', 'height']
        },
      },
      required: ['name', 'bannerType', 'size']
    },
    response: {
      201: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          bannerType: { type: 'string', 'enum': ['Image', 'Flash'] },
          size: {
            type: 'object',
            properties: {
              width: { type: 'number' },
              height: { type: 'number' },
            }
          },
          active: { type: 'boolean' },
          createdAt: { type: 'string' },
          updatedAt: { type: 'string' },
        }
      }
    }
  }
};

module.exports = createBannerSchema;
