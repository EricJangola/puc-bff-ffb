import HttpError from './http-error';

class ForbiddenError extends HttpError {
  constructor(errorCode: string, customMessage?: string) {
    super(403, errorCode, undefined, customMessage);
  }
}

export default ForbiddenError;
