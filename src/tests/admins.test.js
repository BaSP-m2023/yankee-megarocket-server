import request from 'supertest';
import app from '../app';
import Admin from '../models/Admin';
import adminSeed from '../seeds/admins';

const mockAdmin = {
  firstName: 'Pepito',
  lastName: 'Perez',
  dni: 1234567,
  email: 'pepi@perez.com',
  phone: 1123456789,
  password: 'Passu0rdg',
};

const mockAdminFail = {
  lastName: 'Perez',
  dni: 1234567,
  email: 'pepi@perez.com',
  phone: 1123456789,
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
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Admins found successfully!');
    expect(response.body.error).toBeFalsy();
  });
  test('should return status 404', async () => {
    await Admin.collection.deleteMany();
    const response = await request(app).get('/api/admins').send();
    expect(response.body.data.length).toBe(0);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('There are no admins!');
    expect(response.body.error).toBeTruthy();
  });
  test('should return status 500', async () => {
    jest.spyOn(Admin, 'find').mockRejectedValue(new Error('Somenthing went wrong with the server'));
    const response = await request(app).get('/api/admins').send();
    expect(response.body.data).toBeUndefined();
    expect(response.status).toBe(500);
    expect(response.body.message).toStrictEqual({});
    expect(response.body.error).toBeTruthy();
  });
});

describe('GET BY ID /api/admins', () => {
  test('should return status 200', async () => {
    const response = await request(app).get(`/api/admins/${mockAdminId}`).send();
    expect(response.body.data.password).toBe(adminSeed[0].password);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Admin found successfully!');
    expect(response.body.error).toBeFalsy();
  });
  test('should return status 404', async () => {
    const response = await request(app).get(`/api/admins/${mockAdminIdNotFound}`).send();
    expect(response.body.data).toEqual({});
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Admin with id: 6466631c2c2d037df75e72f5 not found!');
    expect(response.body.error).toBeTruthy();
  });
  test('should return status 400', async () => {
    const response = await request(app).get('/api/admins/bolazo').send();
    expect(response.body.data).toEqual({});
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('This is not a valid object Id');
    expect(response.body.error).toBeTruthy();
  });
  test('should return status 500', async () => {
    jest.spyOn(Admin, 'findById').mockRejectedValue(new Error('Somenthing went wrong with the server'));
    const response = await request(app).get(`/api/admins/${mockAdminId}`).send();
    expect(response.body.data).toBeUndefined();
    expect(response.status).toBe(500);
    expect(response.body.message).toStrictEqual({});
    expect(response.body.error).toBeTruthy();
  });
});

describe('POST /api/admins', () => {
  test('should create a new admin and return a status 201', async () => {
    const response = await request(app).post('/api/admins').send(mockAdmin);
    expect(response.body.data.phone).toBe(mockAdmin.phone);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Admin created successfully!');
    expect(response.body.error).toBeFalsy();
  });
  test('should return status 400', async () => {
    const response = await request(app).post('/api/admins').send(mockAdminFail);
    expect(response.body.data).toBe(undefined);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('There was an error: \"firstName\" is required'); // eslint-disable-line
    expect(response.body.error).toBeTruthy();
  });
  test('should return status 500', async () => {
    jest.spyOn(Admin, 'create').mockRejectedValue(new Error('Somenthing went wrong with the server'));
    const response = await request(app).get('/api/admins').send(mockAdmin);
    expect(response.body.data).toBeUndefined();
    expect(response.status).toBe(500);
    expect(response.body.message).toStrictEqual({});
    expect(response.body.error).toBeTruthy();
  });
});
