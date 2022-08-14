import { json as parseJSON } from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import logger from './factories/logger';
import errorMiddleware from './middlewares/errors';
import registerConsumers from './rabbitmq';
import routes from './routes';

const app = express();

const stream = {
  write(text: string): void {
    logger.info(text);
  },
};

app.use(cors());
app.use(helmet({ contentSecurityPolicy: global.__PROD__ }));
app.use(parseJSON());
app.use(morgan(global.__LOCAL__ ? 'dev' : 'combined', { stream }));
app.use(routes);
app.use(errorMiddleware);

registerConsumers();

export default app;
