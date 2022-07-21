import HttpError from './http-error';

class TimeoutError extends HttpError {
  constructor(errorCode: string, report?: string[]) {
    super(504, errorCode, report);
  }
}

export default TimeoutError;
