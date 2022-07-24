import getProductsExecution from '../executions/get-products';
import { TProduct } from '../sheets/product.type';

export default async function getProducts(): Promise<TProduct[]> {
  return getProductsExecution();
}
