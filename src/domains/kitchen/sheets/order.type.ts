import { TProduct } from './product.type';

export type TOrder = {
  id?: number;
  products: TProduct[];
};
