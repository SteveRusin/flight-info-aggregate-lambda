import { Handler } from 'aws-lambda';
import axios from 'axios';
import { v4 } from 'uuid';

import { database } from './database';
import { getCreateRouteTableQuery, getTableName } from './route-table';
import { mapRoutesToRouteTable } from './mapper';
import { CONFIG } from './config';

export const handler: Handler = async () => {
  const tableSuffix = v4();

  await database.raw(getCreateRouteTableQuery(tableSuffix));

  await Promise.allSettled(
    CONFIG.PROVIDERS.map(async (providerUrl) => {
      // todo add retries and validate response
      const response = await axios.get(providerUrl);
      const data = response.data;

      await database.batchInsert(
        getTableName(tableSuffix),
        mapRoutesToRouteTable(data),
      );
    }),
  );
};
