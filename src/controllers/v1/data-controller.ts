import { Request, Response } from 'express';

import { ResourceNotfound, BadRequest } from '../../utils/custom-errors';

// TODO: implement real getAll() resource
const collections = [
  {
    id: '1',
    name: 'Collection A',
    items: 100,
    createdAt: '2023-01-15T10:00:00Z',
  },
];

export const getAll = (req: Request, res: Response) => {
  return res.send({
    total: collections.length,
    data: [...collections],
  });
};

export default { getAll };
