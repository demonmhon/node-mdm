import { Router } from 'express';

import routesV1 from './v1';

export const appRoutes = () => {
  const router = Router();

  router.use(routesV1());
  router.use('/v1', routesV1());
  router.use('/latest', routesV1());

  return router;
};

export default appRoutes;
