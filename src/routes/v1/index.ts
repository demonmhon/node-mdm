import { Router } from 'express';

import { serve, spec, swaggerJSON } from '../../controllers/v1/docs-controller';
import dataController from '../../controllers/v1/data-controller';

const routesV1 = () => {
  const router = Router();
  router.use('/docs', serve, spec);
  router.route('/swagger.json').get(swaggerJSON);

  router
    .route('/data')
    .get(dataController.getAll)

  return router;
};

export default routesV1;
