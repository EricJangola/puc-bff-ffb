import Joi from '@/factories/joi';

const createStore = Joi.object({
  pocId: Joi.string().min(1).max(100).required(),
  name: Joi.string().trim().min(1).max(200).required(),
});

const updateStorePocId = Joi.object({
  newPocId: Joi.string().min(1).max(100).required(),
});

const timeRangeObj = {
  start: Joi.string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .messages({
      'string.pattern.base': '{#label} doesnt match the time format "HH:MM"',
    }),
  end: Joi.string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .messages({
      'string.pattern.base': '{#label} doesnt match the time format "HH:MM"',
    }),
};

const window = Joi.object().keys({
  weekdays: Joi.array().unique().items(Joi.string().valid('MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN')),
  timeRange: Joi.object(timeRangeObj),
});

const updateDelivery = Joi.object({
  enabled: Joi.boolean().optional(),
  range: Joi.array().optional(),
  estimatedTime: Joi.number().optional(),
  orderMinimum: Joi.number().optional(),
  fee: Joi.number().optional(),
  windows: Joi.array().items(window).optional(),
});

const storeAddress = Joi.object({
  street: Joi.string(),
  city: Joi.string(),
  countryCode: Joi.string(),
  postalCode: Joi.string(),
  stateOrProvinceCode: Joi.string(),
});

const updatePickup = Joi.object({
  enabled: Joi.boolean(),
  location: storeAddress,
  estimatedTime: Joi.number(),
  windows: Joi.array().items(window),
});

const regexSocialMediaUrl = (domain: string): RegExp => {
  return new RegExp(`^(https?://)?(www.)?${domain}/[a-zA-Z0-9._-]+`);
};

const updateStore = Joi.object({
  id: Joi.number(),
  name: Joi.string(),
  description: Joi.string(),
  subdomain: Joi.string()
    .regex(/^[a-zA-Z0-9-]+$/)
    .messages({
      'string.pattern.base': '{#label} accepts only letters, numbers, and -.',
    }),
  phone: Joi.string(),
  email: Joi.string(),
  status: Joi.string().valid('online', 'offline'),
  socialMedia: {
    facebookUrl: Joi.string()
      .regex(regexSocialMediaUrl('facebook.com'))
      .messages({
        'string.pattern.base': '{#label} is not a valid Facebook url',
      })
      .allow('', null),
    instagramUrl: Joi.string()
      .regex(regexSocialMediaUrl('instagram.com'))
      .messages({
        'string.pattern.base': '{#label} is not a valid Instagram url',
      })
      .allow('', null),
    twitterUrl: Joi.string()
      .regex(regexSocialMediaUrl('twitter.com'))
      .messages({
        'string.pattern.base': '{#label} is not a valid Twitter url',
      })
      .allow('', null),
  },
  address: storeAddress,
  windows: Joi.array().items(window),
});

const createPayments = Joi.array()
  .items(
    Joi.object({
      title: Joi.string().trim().min(1).max(200).required(),
      description: Joi.string().trim().min(1).max(200).required(),
      enabled: Joi.required(),
      instructionsForCustomer: Joi.required(),
    }),
  )
  .required();

const updatePayment = Joi.array()
  .items(
    Joi.object({
      id: Joi.required(),
      title: Joi.string().trim().min(1).max(200).required(),
      description: Joi.string().trim().min(1).max(200).required(),
      enabled: Joi.required(),
      instructionsForCustomer: Joi.required(),
    }),
  )
  .required();

const updatePhoneNotifications = Joi.array()
  .items(
    Joi.object({
      phone: Joi.string()
        .pattern(/^\+[0-9]+$/)
        .message('invalid phone format')
        .required(),
      enabled: Joi.boolean().required(),
    }),
  )
  .required();

const updateEmailNotifications = Joi.array()
  .items(
    Joi.object({
      email: Joi.string()
        .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
        .message('invalid email format')
        .required(),
      enabled: Joi.boolean().required(),
    }),
  )
  .required();

const createPhoneNotification = Joi.object({
  code: Joi.string().required(),
  phone: Joi.string()
    .pattern(/^\+[0-9]+$/)
    .message('invalid phone format')
    .required(),
  enabled: Joi.boolean().invalid(false),
});

const createPhoneVerification = Joi.object({
  phone: Joi.string()
    .pattern(/^\+[0-9]+$/)
    .message('invalid phone format')
    .required(),
  enabled: Joi.boolean().invalid(false),
});

const createEmailNotification = Joi.object({
  email: Joi.string()
    .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .message('invalid email format')
    .required(),
  enabled: Joi.boolean().required(),
});

const createProducts = Joi.object({
  name: Joi.string(),
  enabled: Joi.boolean(),
  price: Joi.number(),
  discountPrice: Joi.number().optional(),
  sku: Joi.string().optional(),
  categoryId: Joi.number(),
  image: Joi.binary().optional(),
});

const uploadImageProducts = Joi.object({
  image: Joi.binary().optional(),
});

export default {
  createStore,
  updateDelivery,
  updatePickup,
  createPayments,
  createPhoneNotification,
  createProducts,
  uploadImageProducts,
  createPhoneVerification,
  updatePayment,
  updateStore,
  updateStorePocId,
  updatePhoneNotifications,
  updateEmailNotifications,
  createEmailNotification,
};
