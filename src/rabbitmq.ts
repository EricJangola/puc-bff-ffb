import { existsSync, readdirSync } from 'fs';
import { join, resolve } from 'path';

import logger from './factories/logger';
import { consume } from './factories/rabbitmq';

const domainsBaseDirectory = resolve(__dirname, 'domains');

function getFileAbsolutePath(subdirectory: string): string {
  return join(domainsBaseDirectory, subdirectory, 'ushers/inbound.amqp');
}

function existsModule(absolutePath: string): boolean {
  return existsSync(`${absolutePath}.js`) || existsSync(`${absolutePath}.ts`);
}

/* eslint-disable global-require, import/no-dynamic-require,
  @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access */
function requireModule(absolutePath: string): App.TQueue {
  return require(absolutePath).default || require(absolutePath);
}

const consumers: App.TQueue[] = readdirSync(domainsBaseDirectory)
  .map(getFileAbsolutePath)
  .filter(existsModule)
  .flatMap(requireModule);

export default function registerConsumers(): void {
  logger.info('registering consumers');
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  consumers.forEach(async consumer => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    logger.info(`registering queue ${consumer.queue}`);
    await consume(consumer.queue, consumer.method);
  });
  logger.info('all registered.');
}
