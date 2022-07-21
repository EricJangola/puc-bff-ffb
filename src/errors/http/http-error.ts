class HttpError extends Error {
  constructor(
    public statusCode: number,
    public errorCode: string,
    public report?: string[],
    public message: string = '',
  ) {
    super(message);

    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unsafe-argument
    Error.captureStackTrace(this, this.contructor);
    this.name = this.constructor.name;

    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.report = report;
  }
}

export default HttpError;
