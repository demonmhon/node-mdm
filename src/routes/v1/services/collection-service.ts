import db from '@/db';

export const createCollection = async (
  name: string,
  path: string,
  description?: string
) => {
  const result = await db.query(
    'INSERT INTO collections (name, key, description) VALUES ($1, $2, $3) RETURNING *',
    [name, path, description]
  );
  return result.rows[0];
};

export const getCollectionByKey = async (path: string) => {
  const result = await db.query('SELECT * FROM collections WHERE key = $1', [
    path,
  ]);
  return result.rows[0];
};

export const getCollectionItemsByCollectionId = async (
  collectionId: number
) => {
  const result = await db.query(
    'SELECT * FROM collection_items WHERE collection_id = $1',
    [collectionId]
  );
  return result.rows;
};
