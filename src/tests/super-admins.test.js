import request from 'supertest';
import app from '../app';
import SuperAdmin from '../models/SuperAdmin';
import superAdminSeed from '../seeds/super-admins';

const mockSuper = {
  email: 'superadmin@super.com',
  password: 'superadmin123',
};

beforeAll(async () => {
  await SuperAdmin.collection.insertMany(superAdminSeed);
});

describe('get/api/super-admins', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/api/super-admins').send();
    expect(response.status).toBe(200);
  });
  test('should return status 404', async () => {
    const response = await request(app).get('/api/super-admin').send();
    expect(response.status).toBe(404);
  });
});

describe('get/api/super-admins/:id', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/api/super-admins').send();
    expect(response.status).toBe(200);
  });
});
