import { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import _get from 'lodash/get';

import config from '../../config';
import swaggerDocument from '../../routes/v1/swagger.json';
const appPort = _get(config, 'app.port', 3000);

const fixDevelopmentServerURL = () => {
  const docServer = swaggerDocument?.servers || [];
  const server = docServer.map((item: { url: string }) => {
    if (item.url.includes('localhost:')) {
      const newLocalhost = item.url.replace(
        /localhost:\d+/,
        `localhost:${appPort}`
      );
      item.url = newLocalhost;
    }
    return item;
  });
  return server;
};

const options = {
  customCss: '.swagger-ui .topbar { display: none }',
  swaggerOptions: {
    url: fixDevelopmentServerURL(),
  },
};

export const serve = swaggerUi.serve;
export const spec = swaggerUi.setup(swaggerDocument, options);

export const swaggerJSON = (req: Request, res: Response) =>
  res.send(swaggerDocument);

export default { serve, spec, swaggerJSON };
