import HttpError from './http-error';

class PreconditionFailedError extends HttpError {
  constructor(errorCode: string, report?: string[]) {
    super(412, errorCode, report);
  }
}

export default PreconditionFailedError;
