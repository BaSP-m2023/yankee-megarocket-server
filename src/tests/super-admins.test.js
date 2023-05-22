import request from 'supertest';
import app from '../app';
import SuperAdmin from '../models/SuperAdmin';
import superAdminSeed from '../seeds/super-admins';

const mockSuper = {
  email: 'superadmin@super.com',
  password: 'superadmin123',
};

const mockIncomplete = {
  email: 'superadmin@super.com',
  password: 's',
};

const mockEmptyArr = [];

beforeAll(async () => {
  await SuperAdmin.collection.insertMany(superAdminSeed);
});

describe('get/api/super-admins', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/api/super-admins').send();
    expect(response.status).toBe(200);
  });
  test('should return status 404 when the path is wrong', async () => {
    const response = await request(app).get('/api/super-admin').send();
    expect(response.status).toBe(404);
  });
  test('should return status 404 when superAdmins is empty', async () => {
    jest.spyOn(SuperAdmin, 'find').mockResolvedValue(mockEmptyArr);
    const response = await request(app).get('/api/super-admins').send();
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
  test('should return status 404 when the path is wrong', async () => {
    const response = await request(app).get('/api/super-admin').send();
    expect(response.status).toBe(404);
  });
  test('should return status 404 when Id is not found', async () => {
    const response = await request(app).get('/api/super-admins/635316fe464e1ad6227622e5').send();
    expect(response.status).toBe(404);
  });
  test('should return status 500', async () => {
    jest.spyOn(SuperAdmin, 'findById').mockRejectedValue(new Error('Something went wrong'));
    const response = await request(app).get('/api/super-admins/635316fe464e1ad6227622e4').send();
    expect(response.status).toBe(500);
  });
});

describe('post/api/super-admins/', () => {
  test('should return status 201', async () => {
    const response = await request(app).post('/api/super-admins/').send(mockSuper);
    expect(response.status).toBe(201);
  });
  test('should return status 400 if superadmin can not be created', async () => {
    const response = await request(app).post('/api/super-admins/').send(mockIncomplete);
    expect(response.status).toBe(400);
  });
  test('should return status 500', async () => {
    jest.spyOn(SuperAdmin, 'create').mockRejectedValue(new Error('Something went wrong'));
    const response = await request(app).post('/api/super-admins/').send(mockSuper);
    expect(response.status).toBe(500);
  });
});
