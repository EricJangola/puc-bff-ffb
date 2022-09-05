import { Request } from 'express';

import { httpTranslator } from '@/middlewares/translators';
import { validateBody } from '@/middlewares/validations';

import createOrderMaestro from '../maestros/create-order';
import { TOrder } from '../sheets/order.type';
import validators from './validators';

const routes: App.TRoute[] = [
  {
    method: 'post',
    path: '/v1/orders',
    handlers: [
      validateBody(validators.order),
      httpTranslator(createOrderMaestro, {
        mountInboundParameters(request: Request<any, any, { table: string; order: TOrder }>) {
          const { body } = request;
          return {
            table: body.table,
            order: body.order,
          };
        },
        errorHandler(error: Error) {
          throw error;
        },
      }),
    ],
  },
];

export default routes;
