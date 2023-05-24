/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import app from '../app';
import superAdmin from '../models/SuperAdmin';
import adminSeed from '../seeds/super-admins';

beforeEach(async () => {
  await superAdmin.collection.insertMany(adminSeed);
});

afterEach(async () => {
  await superAdmin.collection.deleteMany();
  jest.restoreAllMocks();
});

const superAdminId = adminSeed[0]._id;

const notFoundId = '6466b3620ebbac7a2a1b7f8f';

const missingEmailFieldSuperAdmin = {
  _id: '6466b3610ebbac7a2a1b9f8f',
  password: 'horadeaventura2',
};

const putTestSuperAdmin = {
  email: 'picklerick@morty.com',
  password: 'rickandmorty2',
};

const missingPasswordFieldSuperAdmin = {
  _id: '6466b3610ebbac7a2a1b9f8f',
  email: 'picklerick@morty.com',
};

const mockSuper = {
  email: 'SuperAdmin@super.com',
  password: 'SuperAdmin123',
};

const mockWrongId = '635316fe464e1ad6227622e5';

// eslint-disable-next-line no-underscore-dangle
const mockCoolId = adminSeed[0]._id;

const mocksuperAdmin = adminSeed[0];

describe('get/api/super-admins', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/api/super-admins').send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.message).toBe('Superadmin found successfully!');
  });
  test('should return status 404 when SuperAdmins is empty', async () => {
    await superAdmin.collection.deleteMany();
    const response = await request(app).get('/api/super-admins').send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data.length).toBe(0);
    expect(response.body.message).toBe('No superadmins found!');
  });
  test('should return status 500', async () => {
    jest.spyOn(superAdmin, 'find').mockRejectedValue(new Error('Something went wrong'));
    const response = await request(app).get('/api/super-admins').send();
    expect(response.status).toBe(500);
    expect(response.error).toBeTruthy();
    expect(response.body.message).toBeDefined();
  });
});

describe('get/api/super-admins/:id', () => {
  test('should return status 200', async () => {
    const response = await request(app).get(`/api/super-admins/${mockCoolId}`).send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toEqual({
      ...mocksuperAdmin,
      // eslint-disable-next-line no-underscore-dangle
      _id: mocksuperAdmin._id.toString(),
    });
    expect(response.body.message).toBe('Superadmin found successfully!');
  });
  test('should return status 404 when Id is not found', async () => {
    const response = await request(app).get(`/api/super-admins/${mockWrongId}`).send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data.length).toBe(undefined);
    expect(response.body.message).toBeDefined();
  });
  test('should return status 500', async () => {
    jest.spyOn(superAdmin, 'findById').mockRejectedValue(new Error('Something went wrong'));
    const response = await request(app).get(`/api/super-admins/${mockCoolId}`).send();
    expect(response.status).toBe(500);
    expect(response.error).toBeTruthy();
    expect(response.body.message).toBeDefined();
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
  test('should return status 400 if SuperAdmin can not be created', async () => {
    jest.spyOn(superAdmin, 'create').mockResolvedValue(null);
    const response = await request(app).post('/api/super-admins/').send(mockSuper);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe('SuperAdmin could not be found and created!');
  });
  test('should return status 500', async () => {
    jest.spyOn(superAdmin, 'create').mockRejectedValue(new Error('Oops something went wrong'));
    const response = await request(app).post('/api/super-admins/').send(mockSuper);
    expect(response.status).toBe(500);
    expect(response.error).toBeTruthy();
    expect(response.body.message).toBeDefined();
  });
});

describe('PUT /api/super-admins', () => {
  test('should modify one super admin, return status 200', async () => {
    const response = await request(app).put(`/api/super-admins/${superAdminId}`).send(putTestSuperAdmin);
    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe('Super Admin Updated Successfully!');
    expect(response.body.error).toBeFalsy();
  });
  test('should not found id, return error 400', async () => {
    const response = await request(app).put(`/api/super-admins/${notFoundId}`).send(putTestSuperAdmin);
    expect(response.status).toBe(400);
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe('Super Admin could not be Found and updated');
    expect(response.body.error).toBeTruthy();
  });
  test('missing email, return error 400', async () => {
    const response = await request(app).put(`/api/super-admins/${superAdminId}`).send(missingEmailFieldSuperAdmin);
    expect(response.status).toBe(400);
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toBe('There was an error: "email" is required');
    expect(response.body.error).toBeTruthy();
  });
  test('Should respond server error, return status 500', async () => {
    jest.spyOn(superAdmin, 'findByIdAndUpdate').mockRejectedValue(new Error('Something went wrong'));
    const response = await request(app).put(`/api/super-admins/${superAdminId}`).send(putTestSuperAdmin);
    expect(response.status).toBe(500);
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toEqual({});
    expect(response.body.error).toBeTruthy();
  });
  test('Invalid ID, return error 400', async () => {
    const response = await request(app).put('/api/super-admins/1234asdawaadw').send();
    expect(response.status).toBe(400);
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe('This is not a valid object Id');
    expect(response.body.error).toBeTruthy();
  });
  test('Should not be found and modify a super admin, return error 400', async () => {
    await superAdmin.deleteMany();
    const response = await request(app).put(`/api/super-admins/${superAdminId}`).send(putTestSuperAdmin);
    expect(response.status).toBe(400);
    expect(response.body.data).toEqual({});
    expect(response.body.message).toBe('Super Admin could not be Found and updated');
    expect(response.body.error).toBeTruthy();
  });
  test('missing password, return error 400', async () => {
    const response = await request(app).put(`/api/super-admins/${superAdminId}`).send(missingPasswordFieldSuperAdmin);
    expect(response.status).toBe(400);
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toBe('There was an error: "password" is required');
    expect(response.body.error).toBeTruthy();
  });
});

describe('DELETE /api/super-admins', () => {
  test('Should delete one super admins, return status 200', async () => {
    const response = await request(app).delete(`/api/super-admins/${superAdminId}`).send();
    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe('Super Admin Deleted Successfully!');
    expect(response.body.error).toBeFalsy();
  });
  test('Should not be found and delete a super admin, return error 400', async () => {
    await superAdmin.deleteMany();
    const response = await request(app).delete(`/api/super-admins/${superAdminId}`).send();
    expect(response.status).toBe(400);
    expect(response.body.data).toEqual({});
    expect(response.body.message).toBe('Super Admin could not be found and deleted!');
    expect(response.body.error).toBeTruthy();
  });
  test('Should respond server error, return status 500', async () => {
    jest.spyOn(superAdmin, 'findByIdAndDelete').mockRejectedValue(new Error('Something went wrong'));
    const response = await request(app).delete(`/api/super-admins/${superAdminId}`).send();
    expect(response.status).toBe(500);
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toEqual({});
    expect(response.body.error).toBeTruthy();
  });
  test('Invalid ID, return error 400', async () => {
    const response = await request(app).delete('/api/super-admins/1234asdawaadw').send();
    expect(response.status).toBe(400);
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe('This is not a valid object Id');
    expect(response.body.error).toBeTruthy();
  });
  test('Should not found id, return error 404', async () => {
    const response = await request(app).delete(`/api/super-admins/${notFoundId}`).send(putTestSuperAdmin);
    expect(response.status).toBe(400);
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe('Super Admin could not be found and deleted!');
    expect(response.body.error).toBeTruthy();
  });
});
