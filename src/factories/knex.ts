/* eslint-disable @typescript-eslint/no-unsafe-assignment,
  @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return */
import createKnex from 'knex';

import databaseConfig from '@/config/database';

const knex = createKnex({
  client: 'pg',
  useNullAsDefault: true,
  debug: false,
  connection: {
    database: databaseConfig.database,
    host: databaseConfig.host,
    user: databaseConfig.username,
    password: databaseConfig.password,
    charset: databaseConfig.charset,
    ssl: databaseConfig.ssl,
    decimalNumbers: true,

    typeCast(field: any, next: any) {
      const { type, length, string } = field;

      if (type === 'TINY' && length === 1) {
        const value = string();
        switch (value) {
          case '1':
            return true;
          case '0':
            return false;
          default:
            return value;
        }
      }

      return next();
    },
  },
});

export default knex;
