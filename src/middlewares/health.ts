import { Router, Request, Response } from 'express';
import config from '../config';

const sendHealthReport = (req: Request, res: Response) => {
  res.status(200).send({ status: 'OK', app: config.app }).end();
};

const healthMiddleware = (): Router => {
  const router = Router();
  router.route('/').get(sendHealthReport);
  router.route('/health').get(sendHealthReport);

  return router;
};

export default healthMiddleware;
