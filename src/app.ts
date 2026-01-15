import util from 'util';
import express, { Application } from 'express';
import compression from 'compression';
import cors from 'cors';
import _get from 'lodash/get';

import config from './config';
import faviconMiddleware from './middlewares/favicon';
import healthMiddleware from './middlewares/health';
import logAccess from './middlewares/log-access';
import appRoutes from './routes/app';
import errorsMiddleware, {
  errorNotFoundMiddleware,
} from './middlewares/errors';

export class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.init();
  }

  private init() {
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors());

    this.app.use(faviconMiddleware());
    this.app.use(healthMiddleware());
    this.app.use(logAccess());
    this.app.use(appRoutes());
    this.app.use(errorsMiddleware());
    this.app.use(errorNotFoundMiddleware());
  }

  public listen() {
    const appEnv = _get(config, 'env', 'development');
    const appName = _get(config, 'app.name', 'api');
    const appPort = _get(config, 'app.port', 3000);

    return this.app.listen(appPort, () => {
      console.info(
        util.format(
          '%s: Express server listening on port %d in %s mode',
          appName,
          appPort,
          appEnv
        )
      );
      if (appEnv === 'development') {
        console.info(util.format('Open http://localhost:%d', appPort));
      }
    });
  }
}

export default App;

export const expressApp = new App().app;
