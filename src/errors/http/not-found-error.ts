import HttpError from './http-error';

class NotFoundError extends HttpError {
  constructor(errorCode: string = 'ERR_RESOURCE_NOT_FOUND') {
    super(404, errorCode);
  }
}

export default NotFoundError;
