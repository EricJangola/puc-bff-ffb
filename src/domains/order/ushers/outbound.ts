import axios from 'axios';

import ffbconfig from '@/config/ffb';
import { publish } from '@/factories/rabbitmq';

import { TOrder } from '../sheets/order.type';

export async function publishOrder(order: TOrder, table: string): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  await publish('ffb.order', { order, table });
}
