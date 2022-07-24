const {
  RABBITMQ_USER,
  RABBITMQ_PASSWORD,
  RABBITMQ_SERVER = 'beaver.rmq.cloudamqp.com/uzyupvaa',
  QUEUE_PREFIX = 'ffb.',
} = process.env;

const rabbitmqConfig = {
  user: RABBITMQ_USER,
  password: RABBITMQ_PASSWORD,
  server: RABBITMQ_SERVER,
  url: `amqps://${RABBITMQ_USER}:${RABBITMQ_PASSWORD}@beaver.rmq.cloudamqp.com/uzyupvaa`,
  queuePrefix: QUEUE_PREFIX,
};

export default rabbitmqConfig;
