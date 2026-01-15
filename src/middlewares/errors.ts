import {
  Router,
  Request,
  Response,
  ErrorRequestHandler,
  NextFunction,
} from 'express';
import util from 'util';
import _get from 'lodash/get';

import { ResourceNotfound, BadRequest } from '../utils/custom-errors';

export const handleNotFound = (req: Request, res: Response) => {
  const err = res.locals.err ? res.locals.err : null;
  const errors = ['Not found'];
  if (err && _get(err, 'message', null)) {
    errors.push(_get(err, 'message', null));
  }
  res
    .status(404)
    .send({
      code: 404,
      status: 'Error',
      message: util.format('Resource %s not found', req.url),
      errors,
    })
    .end();
};

export const errorNotFoundMiddleware = (): Router =>
  Router().use(handleNotFound);

export const handleBadRequest = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response
) => {
  res
    .status(400)
    .send({
      code: 400,
      status: 'Error',
      message: util.format('Cannot process the request for %s', req.url),
      errors: [_get(err, 'message', {})],
    })
    .end();
};

export const errorMiddlware =
  () =>
  (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (res.headersSent) return next(err);
    switch (err.name) {
      case ResourceNotfound.name:
        res.locals.err = err;
        return handleNotFound(req, res);
      case BadRequest.name:
        return handleBadRequest(err, req, res);
      default:
        res
          .status(500)
          .send({
            code: 500,
            status: 'Error',
            message: _get(err, 'message', {}),
          })
          .end();
    }
  };

export default errorMiddlware;
