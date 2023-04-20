import { Handler } from 'aws-lambda';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { v4 } from 'uuid';

import { database } from './database';
import { getCreateRouteTableQuery, getTableName } from './route-table';
import { mapRoutesToRouteTable } from './mapper';
import { CONFIG } from './config';
import { chunkify } from './chunkify';
import { Route } from './models';
import { logger } from './logger';

axiosRetry(axios, {
  retries: 3,
  retryDelay: () => 10_000,
});

export const handler: Handler = async () => {
  logger.info(`Starting aggregation job at: ${new Date()}`);
  const tableSuffix = v4();

  logger.info(`Creating new table: ${getTableName(tableSuffix)}`);
  await database.raw(getCreateRouteTableQuery(tableSuffix));

  logger.info(
    `Aggregating data for the next providers: ${CONFIG.PROVIDERS.join('; ')}`,
  );

  const results = await Promise.allSettled(
    CONFIG.PROVIDERS.map(async (providerUrl) => {
      const response = await axios.get(providerUrl);
      const data: Route[] = response.data;

      logger.info(`Got ${data.length} from ${providerUrl}`);

      const chunkedData = chunkify(data);

      logger.info(`Inserting data from ${providerUrl}`);

      await Promise.all(
        chunkedData.map((chunk) =>
          database(getTableName(tableSuffix))
            .insert(mapRoutesToRouteTable(chunk))
            .onConflict([
              'airline',
              'source_airport',
              'destination_airport',
              'code_share',
              'equipment',
              'stops',
            ])
            .ignore(),
        ),
      );

      return providerUrl;
    }),
  );

  results.forEach((result) => {
    if (result.status === 'fulfilled') {
      logger.info(`Successfully injected data for: ${result.value}`);
    } else {
      logger.error(result.reason?.message);
    }
  });
};
