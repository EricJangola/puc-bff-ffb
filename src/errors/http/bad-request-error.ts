import HttpError from './http-error';

class BadRequestError extends HttpError {
  constructor(errorCode: string, report?: string[], customMessage?: string) {
    super(400, errorCode, report, customMessage);
  }
}

export default BadRequestError;
