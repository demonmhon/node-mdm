import { Request, Response } from 'express';

import { ResourceNotfound, BadRequest } from '@/utils/custom-errors';
import * as collectionService from '../services/collection-service';
import { transformCollectionItems } from '../transformers/collection-transformer';

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

export const getById = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) {
    throw new BadRequest();
  }
  // const collection = collections.find((item) => item.id == id);
  // if (collection) {
  //   return res.send(collection);
  // }
  const collection = await collectionService.getCollectionByKey(id);

  if (collection) {
    const items = await collectionService.getCollectionItemsByCollectionId(
      collection.id
    );
    const transformedItems = transformCollectionItems(items);
    return res.send({
      ...collection,
      items: transformedItems,
    });
  }
  throw new ResourceNotfound(`Collection ${id} not found`);
};

export default { getAll, getById };
