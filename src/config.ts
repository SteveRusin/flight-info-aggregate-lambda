export const CONFIG = {
  PROVIDERS: process.env.PROVIDERS!.split(',')!,
  DB_HOST: process.env.DB_HOST!,
  DB_PORT: process.env.DB_PORT!,
  DB_PASSWORD: process.env.DB_PASSWORD!,
  DATABASE: process.env.DATABASE!,
  DB_USER: process.env.DB_USER!,
  RETRY_DELAY: (process.env.RETRY_DELAY && +process.env.RETRY_DELAY) || 10_000,
} as const;
