import Joi from '@/factories/joi';

const order = Joi.object({
  table: Joi.string().min(1).max(100).required(),
  order: Joi.object({
    products: Joi.array().items(
      Joi.object({
        name: Joi.string(),
        price: Joi.number(),
      }),
    ),
  }),
});

export default {
  order,
};
