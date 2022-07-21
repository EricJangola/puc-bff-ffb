import createOrderExecution from '../executions/create-order';
import { TOrder } from '../sheets/order.type';

export type TCreateStoreData = {
  table: string;
  order: TOrder;
};

export default async function createOrderMaestro(createStoreData: TCreateStoreData): Promise<void> {
  return createOrderExecution(createStoreData.order, createStoreData.table);
}
