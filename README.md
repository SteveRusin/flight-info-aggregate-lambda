# Flight info aggregate lambda

## Project description

This lambda fetches route info hourly from comma separated providers defined by `process.env.PROVIDERS` variable and inserts it into `ROUTES_NEW` table. Once all data have been inserted it swaps `ROUTES` and `ROUTES_NEW` table, hence avoiding db locks.

## Prerequisite

- Node >= v18
- Docker >=20

## Project installation instructions

1. Clone the project
1. Switch to node v18 using [fnm](https://github.com/Schniz/fnm), [nvm](https://github.com/nvm-sh/nvm) or other node version manager of your choice
1. Run `npm ci` command to install dependencies
1. Copy and rename `.env.example` -> `.env`; Content of `.env.example` should work for local environment setup
1. Start local database with `npm run compose:db:up` command
1. Run `npm run start:dev` to start dev server in watch mode and invoke lambda on changes

## Project configuration

Project can be configured using `.env` file for local development and `.env.integration` for integration tests.

## Npm scripts

- `npm run build` - builds into dist folder
- `npm run lambda:update` - pushes lambda zip to aws
- `npm run test:ci` - run linter and tests. Used by ci environment
- `npm run build:ci` - build artifacts. Used by ci environment
- `npm run zip-dist` - zips dist folder before pushing to aws
- `npm run start:dev` - starts dev server in watch mode
- `npm run lint:eslint` - run eslint
- `npm run lint` - lint the project using eslint
- `npm run test` - run unit tests
- `npm run compose:db:up` - starts postgres container using `docker-compose.dev.yml` file
- `npm run compose:db-int:up` - starts postgres container for integration tests using - `npm run test:integration` - starts integration tests. Uses `.env.integration` configuration
- `npm run compose:test:integration` - runs docker compose for integration tests using `docker-compose.int.yml` file

## Unit Tests

- Unit tests are written in `*.spec.ts` files alongside the entity they are testing.
- Refer to [this](https://github.com/goldbergyoni/javascript-testing-best-practices) documentation for unit test style guide
- Run `npm run test` to kick off jest unit tests

## Integration Tests

- To run int tests in docker run `npm run compose:test:integration`
- To run int tests outside docker you need to start integration image of database by running `npm run compose:db-int:up` followed by `npm run test:integration` command.
