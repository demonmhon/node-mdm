import { Request, Response, NextFunction } from 'express';

const faviconMiddleware =
  () => (req: Request, res: Response, next: NextFunction) => {
    if (req.originalUrl.includes('favicon.ico')) return res.status(204).end();
    return next();
  };

export default faviconMiddleware;
