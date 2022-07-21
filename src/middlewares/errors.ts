import { NextFunction, Request, Response } from 'express';

import HttpError from '@/errors/http/http-error';
import logger from '@/factories/logger';
import errorCodes from '@/resources/error-codes';

function handleHttpError(error: HttpError, response: Response): void {
  const { errorCode } = error;
  const errorMessage = error.message || errorCodes[errorCode];

  response.status(error.statusCode).json({
    error: {
      name: error.name,
      code: errorCode,
      message: errorMessage,
      report: error.report,
    },
  });
}

function errorMiddleware(error: Error, _request: Request, response: Response, _next: NextFunction): void {
  if (error instanceof HttpError) {
    handleHttpError(error, response);
    return;
  }

  logger.error(error);

  response.status(500).json({
    error: {
      code: 0,
      message: 'Internal Server Error',
    },
  });
}

export default errorMiddleware;
