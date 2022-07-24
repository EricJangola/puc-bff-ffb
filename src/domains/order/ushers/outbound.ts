import axios from 'axios';

import ffbconfig from '@/config/ffb';

import { TOrder } from '../sheets/order.type';

const api = axios.create({ baseURL: ffbconfig.apiUrl });

export async function createOrder(order: TOrder, table: string): Promise<void> {
  const response = await api.post<void>('/v1/products', { order, table });
  return response.data;
}
