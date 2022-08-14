import { publish } from '@/factories/rabbitmq';

import { TOrder } from '../sheets/order.type';

// export async function publishOrder(order: TOrder, table: string): Promise<void> {
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
//   await publish('ffb.order', { order, table });
// }

// This is an example! Please remove and replace with actual code
export async function publishOrder(order: TOrder, table: string): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const data = { order, table };
  await publish('order', data);
}
