import HttpError from './http-error';

class UnauthorizedError extends HttpError {
  constructor(errorCode: string = 'ERR_UNAUTHORIZED') {
    super(401, errorCode);
  }
}

export default UnauthorizedError;
