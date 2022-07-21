const { PG_DATABASE, PG_HOST, PG_PORT = '5432', PG_USER, PG_PASS, PG_SSL } = process.env;

const databaseConfig = {
  host: PG_HOST,
  port: Number(PG_PORT),
  username: PG_USER,
  password: PG_PASS,
  database: PG_DATABASE,
  ssl: PG_SSL === 'true',
  charset: 'utf8mb4',
};

export default databaseConfig;
