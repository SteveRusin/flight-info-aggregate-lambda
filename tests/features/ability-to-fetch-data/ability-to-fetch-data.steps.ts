import { Context } from 'aws-lambda';
import { Given, When, Then } from '@cucumber/cucumber';
import { rest } from 'msw';
import { expect } from 'chai';

import { handler } from '../../../src/handler';
import { httpServer } from '../bootstrap';
import { getRouteMock1, getRouteMock2 } from '../mocks';
import { database } from '../../../src/database';
import { ROUTES_TABLE_NAME } from '../../../src/route-table';

Given('datasources returns duplicate data', () => {
  httpServer.use(
    rest.get('http://provider1', (_req, res, ctx) => {
      return res(ctx.json([getRouteMock1()]));
    }),
    rest.get('http://provider2', (_req, res, ctx) => {
      return res(ctx.json([getRouteMock1(), getRouteMock2()]));
    }),
  );
});

When('lambda is invoked', async () => {
  await handler({}, {} as Context, () => null);
});

Then('database should contain uniq data', async () => {
  const [result] = await database
    .count('*')
    .from(database.raw(ROUTES_TABLE_NAME));

  expect(+result.count).equal(2);
});
