import pool from '@/db';

export const createCollection = async (name: string, path: string, description?: string) => {
  const result = await pool.query(
    'INSERT INTO collections (name, path, description) VALUES ($1, $2, $3) RETURNING *',
    [name, path, description]
  );
  return result.rows[0];
};

export const getCollectionByPath = async (path: string) => {
  const result = await pool.query('SELECT * FROM collections WHERE path = $1', [path]);
  return result.rows[0];
};
