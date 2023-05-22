import request from 'supertest';
import app from '../app';
import SuperAdmin from '../models/SuperAdmin';
import superAdminSeed from '../seeds/super-admins';

const mockSuper = {
  email: 'superadmin@super.com',
  password: 'superadmin123',
};

beforeEach(async () => {
  await SuperAdmin.collection.insertMany(superAdminSeed);
});

afterEach(async () => {
  await SuperAdmin.collection.deleteMany();
});

describe('get/api/super-admins', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/api/super-admins').send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe('Superadmin found successfully!');
  });
  test('should return status 404 when superAdmins is empty', async () => {
    await SuperAdmin.collection.deleteMany();
    const response = await request(app).get('/api/super-admins').send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data.length).toBe(0);
    expect(response.body.message).toBe('No superadmins found!');
  });
  test('should return status 500', async () => {
    jest.spyOn(SuperAdmin, 'find').mockRejectedValue(new Error('Something went wrong'));
    const response = await request(app).get('/api/super-admins').send();
    expect(response.status).toBe(500);
    expect(response.error).toBeTruthy();
  });
});

describe('get/api/super-admins/:id', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/api/super-admins/635316fe464e1ad6227622e4').send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe('Superadmin found successfully!');
  });
  test('should return status 404 when Id is not found', async () => {
    const response = await request(app).get('/api/super-admins/635316fe464e1ad6227622e5').send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data.length).toBe(undefined);
    expect(response.body.message).toBeDefined();
  });
  test('should return status 500', async () => {
    jest.spyOn(SuperAdmin, 'findById').mockRejectedValue(new Error('Something went wrong'));
    const response = await request(app).get('/api/super-admins/635316fe464e1ad6227622e4').send();
    expect(response.status).toBe(500);
    expect(response.error).toBeTruthy();
  });
});

describe('post/api/super-admins/', () => {
  test('should return status 201', async () => {
    const response = await request(app).post('/api/super-admins/').send(mockSuper);
    expect(response.status).toBe(201);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe('Superadmin was created successfully!');
  });
  test('should return status 400 if superadmin can not be created', async () => {
    jest.spyOn(SuperAdmin, 'create').mockResolvedValue(null);
    const response = await request(app).post('/api/super-admins/').send(mockSuper);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe('SuperAdmin could not be found and created!');
  });
  test('should return status 500', async () => {
    jest.spyOn(SuperAdmin, 'create').mockRejectedValue(new Error('Oops something went wrong'));
    const response = await request(app).post('/api/super-admins/').send(mockSuper);
    expect(response.status).toBe(500);
    expect(response.error).toBeTruthy();
  });
});
