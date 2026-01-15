import { createLogger, format, transports } from 'winston';

import config from '../config';

const logger = createLogger({
  format: format.json(),
  transports: !['test'].includes(config.env)
    ? [
        new transports.Console({
          level: config.logLevel,
          format: format.combine(
            format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            format.colorize(),
            format.simple()
          ),
          handleExceptions: true,
        }),
      ]
    : [],
});

export default logger;
