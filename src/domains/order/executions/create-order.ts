import { TOrder } from '../sheets/order.type';
import { publishOrder as orderOutbound } from '../ushers/outbound';

export default async function createStore(order: TOrder, table: string): Promise<void> {
  return orderOutbound(order, table);
}
