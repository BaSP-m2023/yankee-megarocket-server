import request from 'supertest';
import app from '../app';
import SuperAdmin from '../models/SuperAdmin';
import superAdminSeed from '../seeds/super-admins';

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
  test('should return status 500', async () => {
    jest.spyOn(SuperAdmin, 'find').mockRejectedValue(new Error('Something went wrong'));
    const response = await request(app).get('/api/super-admins').send();
    expect(response.status).toBe(500);
  });
});

describe('get/api/super-admins/:id', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/api/super-admins/635316fe464e1ad6227622e4').send();
    expect(response.status).toBe(200);
  });
  test('should return status 404', async () => {
    const response = await request(app).get('/api/super-admin/wrongid').send();
    expect(response.status).toBe(404);
  });
  test('should return status 500', async () => {
    jest.spyOn(SuperAdmin, 'findById').mockRejectedValue(new Error('Something went wrong'));
    const response = await request(app).get('/api/super-admins/635316fe464e1ad6227622e4').send();
    expect(response.status).toBe(500);
  });
});
