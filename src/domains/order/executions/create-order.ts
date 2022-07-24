import { TOrder } from '../sheets/order.type';
import { createOrder as orderOutbound } from '../ushers/outbound';

export default async function createStore(order: TOrder, table: string): Promise<void> {
  return orderOutbound(order, table);
}
