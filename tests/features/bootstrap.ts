import { BeforeAll, AfterAll, Before, setDefaultTimeout } from '@cucumber/cucumber';
import { setupServer } from 'msw/node';

import { database } from '../../src/database';

export const httpServer = setupServer();

BeforeAll(() => {
  httpServer.listen();
});

Before(() => {
  httpServer.resetHandlers();
});

AfterAll(() => {
  httpServer.close();
  database.destroy();
});

setDefaultTimeout(30_000);
