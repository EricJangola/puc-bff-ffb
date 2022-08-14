import amqplib, { Message } from 'amqplib';

import rabbitmqConfig from '@/config/rabbit';

import logger from './logger';

let connection: amqplib.Connection | null = null;
let channel: amqplib.Channel | null = null;

const connect = async (): Promise<amqplib.Channel> => {
  const connectionString =
    `${rabbitmqConfig.protocol}://${rabbitmqConfig.user}:${rabbitmqConfig.password}@` +
    `${rabbitmqConfig.host}:${rabbitmqConfig.port}/${rabbitmqConfig.virtualHost}`;
  try {
    logger.info('starting connection');
    connection = await amqplib.connect(connectionString, {
      checkServerIdentity: () => undefined,
      verify: rabbitmqConfig.sslVerify,
      fail_if_no_peer_cert: rabbitmqConfig.failIfNoPeerCert,
    });
    logger.info('connection created', connection);
    channel = await connection.createChannel();
    logger.info('channel created', channel);
    return channel;
  } catch (error) {
    logger.error('RabbitMQ Failed to connect', error);
    throw error;
  } finally {
    logger.warn('Should be all done.', connection, channel);
  }
};

const getQueueName = (queue: string): string => {
  return `${rabbitmqConfig.queuePrefix}${queue}`;
};

export const consume = async (queue: string, callback: any, ack: boolean = true): Promise<void> => {
  if (!channel) {
    channel = await connect();
  }
  await channel.assertQueue(getQueueName(queue));
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  await channel.consume(getQueueName(queue), message => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    callback(message);
    if (ack) {
      channel?.ack(message as Message);
    }
  });
};

export const publish = async (queue: string, message: any): Promise<boolean> => {
  if (!channel) {
    channel = await connect();
  }
  await channel.assertQueue(getQueueName(queue));
  return channel.sendToQueue(getQueueName(queue), Buffer.from(JSON.stringify(message)));
};
// /* eslint-disable @typescript-eslint/no-unsafe-call */
// /* eslint-disable @typescript-eslint/no-unsafe-return */
// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
// /* eslint-disable @typescript-eslint/no-unsafe-member-access */
// import jackrabbit from 'jackrabbit';

// import rabbitmqConfig from '@/config/rabbit';

// const rabbit = jackrabbit(rabbitmqConfig.url);

// export function exchange(): any {
//   return rabbit.default();
// }

// export function queue(name: string): any {
//   return exchange().queue({ name: `${rabbitmqConfig.queuePrefix}${name}` });
// }

// export function publish(name: any, message: any): Promise<void> {
//   const publishOptions = {
//     key: name,
//   };
//   return exchange().publish(message, publishOptions);
// }

// export function consume(name: string): any {
//   return exchange().consume(name);
// }
