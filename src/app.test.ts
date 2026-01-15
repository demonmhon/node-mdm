import request from 'supertest';

import { expressApp } from './app';

describe('Common endpoints', () => {
  it('health check', async () => {
    const res = await request(expressApp).get('/health').send();
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('app');
  });

  it('non-existent endpoint', async () => {
    const res = await request(expressApp).get('/test-not-found-route').send();
    expect(res.statusCode).toEqual(404);
    expect(res.headers['content-type']).toMatch(/json/);
  });
});
