import { Router } from 'express';

import { serve, spec, swaggerJSON } from '../../controllers/v1/docs-controller';
import dataController from '../../controllers/v1/data-controller';
import manageController from '../../controllers/v1/manage-controller';

const routesV1 = () => {
  const router = Router();
  router.use('/docs', serve, spec);
  router.route('/swagger.json').get(swaggerJSON);

  router
    .route('/data')
    .get(dataController.getAll)
  router.route('/data/:id?').get(dataController.getById);
  router.route('/manage/collections').get(manageController.getAllCollections);
  router.route('/manage/collections').post(manageController.postCollection);
  router.route('/manage/collections/:id?')
    .get(manageController.getAllCollectionById)
    .patch(manageController.patchCollection)
    .delete(manageController.deleteCollection)


  return router;
};

export default routesV1;
