import Joi from 'joi';

import defaultConfig from '@/config/validation';
import UnprocessableEntityError from '@/errors/http/unprocessable-entity-error';

export function validateSchema<P>(schema: Joi.Schema<P>, data: any, config?: object): P {
  const result = schema.validate(data, {
    ...defaultConfig,
    ...config,
  });

  if (!result.error) {
    return result.value as P;
  }

  const report = result.error.details.map(detail => {
    return detail.message.replace(/['"]/g, '');
  });

  throw new UnprocessableEntityError('ERR_INVALID_PARAMETERS', report);
}

export function changeValidationObject(
  schemaObject: Record<string, Joi.AnySchema>,
  required?: string[],
  exclude?: string[],
): object {
  return Object.entries(schemaObject).reduce((object, entry) => {
    const [key, schema] = entry;

    if (exclude?.includes(key)) {
      return object;
    }

    let presence: Joi.PresenceMode = 'optional';
    if (required?.includes(key)) {
      presence = 'required';
    }

    return {
      ...object,
      [key]: schema.presence(presence),
    };
  }, {});
}

export default {};
