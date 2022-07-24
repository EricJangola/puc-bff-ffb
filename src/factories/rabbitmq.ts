/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import jackrabbit from 'jackrabbit';

import rabbitmqConfig from '@/config/rabbit';

const rabbit = jackrabbit(rabbitmqConfig.url);

export function exchange(): any {
  return rabbit.default();
}

export function queue(name: string): any {
  return exchange().queue({ name: `${rabbitmqConfig.queuePrefix}${name}` });
}

export function publish(name: any, message: any): Promise<void> {
  const publishOptions = {
    key: name,
  };
  return exchange().publish(message, publishOptions);
}
