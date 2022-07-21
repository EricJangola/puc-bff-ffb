import HttpError from './http-error';

class UnprocessableEntityError extends HttpError {
  constructor(errorCode: string, report?: string[]) {
    super(422, errorCode, report);
  }
}

export default UnprocessableEntityError;
