/* eslint-disable */
import { random } from 'lodash';

import admin from '@/config/firebase';
import logger from '@/factories/logger';

import { TOrder } from '../sheets/order.type';

// This is an example! Please remove and replace with Maestro stuff
function onOrderReceive(data: any): TOrder | undefined {
  logger.info('Received queue data', data);

  // TODO: add firebase part
  // const orderDb = db.collection('orders');
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  // const order = orderDb.doc(`order-${new Date()}`);
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  // order.set(data.content.toString());
  try {
    const order = JSON.parse(data.content.toString()) as TOrder;
    sendPushNotification(order);

    return order;
  } catch (err) {
    logger.error(err);
    throw err;
  }
}

async function sendPushNotification(order: TOrder): Promise<void> {
  const message = {
    notification: {
      title: `New order ${random()}`,
      body: JSON.stringify(order.products),
    },
    token: '',
  };
  await admin.messaging().send(message);
}

const consumers: App.TQueue[] = [
  {
    queue: 'order',
    method: onOrderReceive,
  },
];

export default consumers;
