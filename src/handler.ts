import { Handler } from 'aws-lambda';
import axios from 'axios';
import axiosRetry from 'axios-retry';

import { database } from './database';
import {
  NEW_ROUTES_TABLE_NAME,
  getCreateRouteTableQuery,
  getSwapTablesQuery,
} from './route-table';
import { mapRoutesToRouteTable } from './mapper';
import { CONFIG } from './config';
import { chunkify } from './chunkify';
import { Route } from './models';
import { logger } from './logger';

axiosRetry(axios, {
  retries: 3,
  retryDelay: () => CONFIG.RETRY_DELAY,
});

export const handler: Handler = async () => {
  const providersNotDefined = CONFIG.PROVIDERS.length === 0;

  if (providersNotDefined) {
    logger.info('No providers defined. Terminating job');

    return;
  }

  logger.info(`Starting aggregation job at: ${new Date()}`);

  logger.info(`Creating table for new injection`);
  await database.raw(getCreateRouteTableQuery());

  logger.info(
    `Aggregating data for the next providers: ${CONFIG.PROVIDERS.join('; ')}`,
  );

  const results = await Promise.allSettled(
    CONFIG.PROVIDERS.map(async (providerUrl) => {
      const response = await axios.get(providerUrl);
      let data: Route[] = response.data;

      logger.info(`Got ${data.length} items from ${providerUrl}`);

      const chunkedData = chunkify(data);

      data = null!;

      logger.info(`Inserting data from ${providerUrl}`);

      await Promise.all(
        chunkedData.map((chunk) =>
          database(database.raw(NEW_ROUTES_TABLE_NAME))
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

  const hasSucceededInjections = results.some(
    (res) => res.status === 'fulfilled',
  );

  if (hasSucceededInjections) {
    await database.raw(getSwapTablesQuery());
  }

  results.forEach((result) => {
    if (result.status === 'fulfilled') {
      logger.info(`Successfully injected data for: ${result.value}`);
    } else {
      logger.error(result.reason?.message);
    }
  });
};
