/* eslint-disable no-console */
import { Context } from 'aws-lambda';

import { handler } from './src/handler';

run();

async function run() {
  console.log('Starting invocation');
  await handler({}, {} as Context, () => null);
  console.log('End of invocation');
}
