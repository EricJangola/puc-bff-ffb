class BaseError extends Error {
  constructor(public errorCode: string, message?: string) {
    super(message);

    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unsafe-argument
    Error.captureStackTrace(this, this.contructor);
    this.name = this.constructor.name;
  }
}

export default BaseError;
