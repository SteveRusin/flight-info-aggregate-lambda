import { knex } from 'knex';

import { CONFIG } from './config';

export const database = knex({
  debug: true,
  client: 'pg',
  connection: () => {
    return {
      user: CONFIG.DB_USER,
      host: CONFIG.DB_HOST,
      database: CONFIG.DATABASE,
      password: CONFIG.DB_PASSWORD,
      port: CONFIG.DB_PORT,
    };
  },
});
