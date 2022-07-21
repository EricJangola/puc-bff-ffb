import HttpError from './http-error';

class ServiceUnavailableError extends HttpError {
  constructor(errorCode: string = 'ERR_SERVICE_UNAVAILABLE') {
    super(503, errorCode);
  }
}

export default ServiceUnavailableError;
