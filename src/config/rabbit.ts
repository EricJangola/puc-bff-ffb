const {
  RABBITMQ_USER,
  RABBITMQ_PASSWORD,
  RABBITMQ_HOST = 'beaver-01.rmq.cloudamqp.com',
  RABBITMQ_PORT = '5672',
  RABBITMQ_VHOST = 'uzyupvaa',
  RABBITMQ_QUEUE_PREFIX = 'ffb.',
  RABBITMQ_CONNECTION_PARAMS = 'transport.verifyHost=false',
  RABBITMQ_SSL_ENABLED = false,
  RABBITMQ_EXCHANGE = 'ffb.exchange',
  RABBITMQ_SSL_VERIFY = 'verify_none',
  RABBITMQ_FAIL_IF_NO_PEER_CERT = false,
} = process.env;

const rabbitmqConfig = {
  user: RABBITMQ_USER,
  password: RABBITMQ_PASSWORD,
  host: RABBITMQ_HOST,
  port: RABBITMQ_PORT,
  virtualHost: RABBITMQ_VHOST,
  connectionParams: RABBITMQ_CONNECTION_PARAMS,
  queuePrefix: RABBITMQ_QUEUE_PREFIX,
  sslEnabled: RABBITMQ_SSL_ENABLED,
  protocol: RABBITMQ_SSL_ENABLED ? 'amqps' : 'amqp',
  exchange: RABBITMQ_EXCHANGE,
  sslVerify: RABBITMQ_SSL_VERIFY,
  failIfNoPeerCert: RABBITMQ_FAIL_IF_NO_PEER_CERT,
};

export default rabbitmqConfig;
// const {
//   RABBITMQ_USER,
//   RABBITMQ_PASSWORD,
//   RABBITMQ_SERVER = 'beaver.rmq.cloudamqp.com/uzyupvaa',
//   QUEUE_PREFIX = 'ffb.',
// } = process.env;

// const rabbitmqConfig = {
//   user: RABBITMQ_USER,
//   password: RABBITMQ_PASSWORD,
//   server: RABBITMQ_SERVER,
//   url: `amqps://${RABBITMQ_USER}:${RABBITMQ_PASSWORD}@beaver.rmq.cloudamqp.com/uzyupvaa`,
//   queuePrefix: QUEUE_PREFIX,
// };

// export default rabbitmqConfig;
