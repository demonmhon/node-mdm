import { Request, Response, NextFunction } from 'express';
import { BadRequest } from '../../utils/custom-errors';
import { createCollection } from '../../services/collection-service';

export const getAllCollections = (req: Request, res: Response) => {
  return res.send({
    total: 0,
    data: [],
  });
}


export const postCollection = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      throw new BadRequest('Required fields missing');
    }
    if (typeof name !== 'string') {
      throw new BadRequest('Incorrect data type');
    }
    const path = req.body.path || name.toLowerCase().replace(/\s+/g, '-');

    const result = await createCollection(name, path, description);

    return res.status(201).send({
      status: 'success',
      message: 'Collection created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};


export default {
  getAllCollections,
  postCollection
}