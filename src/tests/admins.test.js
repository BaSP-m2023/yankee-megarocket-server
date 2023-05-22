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

const mockAdminId = adminSeed[0]._id; // eslint-disable-line
const mockAdminIdNotFound = '6466631c2c2d037df75e72f5';

beforeEach(async () => {
  await Admin.collection.insertMany(adminSeed);
});
afterEach(async () => {
  await Admin.collection.deleteMany();
});

describe('GET /api/admins', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/api/admins').send();
    expect(response.status).toBe(200);
  });
  test('should return status 404', async () => {
    await Admin.collection.deleteMany();
    const response = await request(app).get('/api/admins').send();
    expect(response.status).toBe(404);
  });
  test('should return status 500', async () => {
    jest.spyOn(Admin, 'find').mockRejectedValue(new Error('Somenthing went wrong with the server'));
    const response = await request(app).get('/api/admins').send();
    expect(response.status).toBe(500);
  });
});

describe('GET BY ID /api/admins', () => {
  test('should return status 200', async () => {
    const response = await request(app).get(`/api/admins/${mockAdminId}`).send();
    expect(response.status).toBe(200);
  });
  test('should return status 404', async () => {
    const response = await request(app).get(`/api/admins/${mockAdminIdNotFound}`).send();
    expect(response.status).toBe(404);
  });
  test('should return status 500', async () => {
    jest.spyOn(Admin, 'findById').mockRejectedValue(new Error('Somenthing went wrong with the server'));
    const response = await request(app).get(`/api/admins/${mockAdminId}`).send();
    expect(response.status).toBe(500);
  });
});

describe('POST /api/admins', () => {
  test('should create a new admin and return a status 201', async () => {
    const response = await request(app).post('/api/admins').send(mockAdmin);
    expect(response.status).toBe(201);
  });
  test('should return status 400', async () => {
    const response = await request(app).post('/api/admins').send({});
    expect(response.status).toBe(400);
  });
  test('should return status 500', async () => {
    jest.spyOn(Admin, 'create').mockRejectedValue(new Error('Somenthing went wrong with the server'));
    const response = await request(app).get('/api/admins').send(mockAdmin);
    expect(response.status).toBe(500);
  });
});
