import { NextFunction, Request, Response } from 'express';
import { Query, ParamsDictionary } from 'express-serve-static-core'; // eslint-disable-line import/no-unresolved
import Joi from 'joi';

import { validateSchema } from '@/helpers/validations';

export function validateBody<P = any>(schema: Joi.AnySchema<P>, config?: object) {
  return (request: Request, _: Response, next: NextFunction): void => {
    try {
      const customConfig = {
        stripUnknown: true,
        ...config,
      };

      const result = validateSchema(schema, request.body, customConfig);
      request.body = result;

      next();
    } catch (err) {
      next(err);
    }
  };
}

export function validateQuery<P extends Query>(schema: Joi.Schema<P>, config?: object) {
  return (request: Request, _: Response, next: NextFunction): void => {
    try {
      const result = validateSchema(schema, request.query, config);
      request.query = result;

      next();
    } catch (err) {
      next(err);
    }
  };
}

export function validateParams<P extends ParamsDictionary>(schema: Joi.Schema<P>, config?: object) {
  return (request: Request, _: Response, next: NextFunction): void => {
    try {
      const result = validateSchema(schema, request.params, config);
      request.params = result;

      next();
    } catch (err) {
      next(err);
    }
  };
}

export default {};
