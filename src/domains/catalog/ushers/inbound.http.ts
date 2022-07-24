import { Request } from 'express';

import { httpTranslator } from '@/middlewares/translators';

import getProductsMaestro from '../maestros/get-products';

const routes: App.TRoute[] = [
  {
    method: 'get',
    path: '/v1/products',
    handlers: [
      httpTranslator(getProductsMaestro, {
        mountInboundParameters(request: Request<any, any, any>) {},
        errorHandler(error: Error) {
          throw error;
        },
      }),
    ],
  },
];

export default routes;
