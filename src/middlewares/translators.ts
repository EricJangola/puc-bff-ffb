import { NextFunction, Request, RequestHandler, Response } from 'express';

import ForbiddenError from '@/errors/http/forbidden-error';

function defaultMountInboundParameters(request: Request): any {
  return {
    ...request.params,
    ...request.body,
  };
}

function checkPocIdAuthorization(accountIds?: string[], pocId?: string): void {
  if (!pocId) {
    return;
  }

  if (!accountIds?.some((accountId: string) => accountId === pocId)) {
    throw new ForbiddenError('ERR_FORBIDDEN');
  }
}

function defaultPocIdFieldPlace(request: Request): any {
  return request?.params?.pocId;
}

export function httpTranslator<P, R>(
  maestro: App.TMaestro<P, R>,
  options: App.THttpTranslatorOptions<P> = {},
): RequestHandler {
  const {
    mountInboundParameters = defaultMountInboundParameters,
    pocIdFieldPlace = defaultPocIdFieldPlace,
    httpStatusCode = 200,
    errorHandler,
  } = options;

  async function middleware(request: Request, response: Response): Promise<void> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const inboundParameters = mountInboundParameters(request);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment
      const outboundParameters = await maestro(inboundParameters);

      response.status(httpStatusCode).json(outboundParameters);
    } catch (error) {
      errorHandler?.(error);
      throw error;
    }
  }

  return (request: Request, response: Response, next: NextFunction) => {
    middleware(request, response).catch(next);
  };
}

export default {
  httpTranslator,
};
