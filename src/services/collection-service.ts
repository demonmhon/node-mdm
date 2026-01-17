import pool from '../db';

export const createCollection = async (name: string, path: string, description?: string) => {
  const result = await pool.query(
    'INSERT INTO collections (name, path, description) VALUES ($1, $2, $3) RETURNING *',
    [name, path, description]
  );
  return result.rows[0];
};