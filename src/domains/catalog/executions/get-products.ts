import { getProducts as getProductsOutbound } from '../ushers/outbound';

export default async function getProducts(): ReturnType<typeof getProductsOutbound> {
  return getProductsOutbound();
}
