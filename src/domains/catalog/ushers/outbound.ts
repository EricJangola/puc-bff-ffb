import axios from 'axios';

import ffbconfig from '@/config/ffb';

import { TProduct } from '../sheets/product.type';

const api = axios.create({ baseURL: ffbconfig.apiUrl });

export async function getProducts(): Promise<TProduct[]> {
  const response = await api.get<TProduct[]>('/v1/products');
  return response.data;
}
