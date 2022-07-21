import winston, { format, createLogger } from 'winston';

function level(): string {
  return global.__LOCAL__ ? 'debug' : 'warn';
}

function transports(): winston.transport[] {
  if (global.__LOCAL__) {
    const customFormat = format.printf(info => {
      const message = (info.stack as string) || info.message;
      return `${info.level}: ${message}`;
    });
    return [
      new winston.transports.Console({
        format: format.combine(format.colorize(), customFormat),
      }),
    ];
  }

  return [
    new winston.transports.Console({
      format: format.combine(format.timestamp()),
    }),
  ];
}

const logger = createLogger({
  level: level(),
  format: format.errors({ stack: true }),
  transports: transports(),
});

export default logger;
