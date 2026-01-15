import pkg from '../../package.json';

const getLogLevelValue = (env: string | undefined): string => {
  if (!env) {
    return 'info';
  }
  return ['development', 'dev'].includes(env) ? 'debug' : 'info';
};

const config = {
  env: process.env.NODE_ENV ?? 'development',
  logLevel: getLogLevelValue(process.env.NODE_ENV),
  app: {
    name: pkg.name ?? 'api',
    port: process.env.PORT ?? 3000,
  },
};

export default config;
