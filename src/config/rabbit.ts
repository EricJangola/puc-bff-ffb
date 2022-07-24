const {
  RABBITMQ_USER,
  RABBITMQ_PASSWORD,
  RABBITMQ_SERVER = 'rabbitmq.external.svc.cluster.local',
  QUEUE_PREFIX = 'ffb.',
} = process.env;

const rabbitmqConfig = {
  user: RABBITMQ_USER,
  password: RABBITMQ_PASSWORD,
  server: RABBITMQ_SERVER,
  url: `amqps://${RABBITMQ_USER}:${RABBITMQ_PASSWORD}@rabbitmq.external.svc.cluster.local:5671/`,
  queuePrefix: QUEUE_PREFIX,
};

export default rabbitmqConfig;
