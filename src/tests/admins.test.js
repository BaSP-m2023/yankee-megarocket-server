import request from 'supertest';
import app from '../app';
import Admin from '../models/Admin';
import adminSeed from '../seeds/admins';

const mockAdmin = {
  firstName: 'Pepito',
  lastName: 'Perez',
  dni: '1234567',
  email: 'pepi@perez.com',
  phone: '1123456789',
  password: 'Passu0rdg',
};

let mockAdminId;


beforeAll(async () => {
  await Admin.collection.insertMany(adminSeed);
});

describe('GET /api/admins', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/api/admins').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('should return status 404', async () => {
    const response = await request(app).get('/api/admin').send();
    expect(response.status).toBe(404);
  });
});

describe('POST /api/admins', () => {
  test('should create a new admin and return a status 201', async () => {
    const response = await request(app).post('/api/admins').send(mockAdmin);
    expect(response.status).toBe(201);
    mockAdminId = response.body.data._id;
  });
});

describe('GET BY ID /api/admins', () => {
  test('should return status 200', async () => {
    const response = await request(app).get(`/api/admins/${ mockAdminId }`).send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('should return status 404', async () => {
    const response = await request(app).get('/api/admin').send();
    expect(response.status).toBe(404);
  });
});

describe('DELETE /api/admins', () => {
  test('should delete an existing admin and return a status 200', async () => {
    const response = await request(app).delete(`/api/admins/${mockAdminId}`);
    expect(response.status).toBe(200);
  });
});


