// Basic test to avoid conflicts
import request from 'supertest';
import app from '../app';
import superAdmin from '../models/SuperAdmin';
import adminSeed from '../seeds/super-admins';
import SuperAdmin from '../models/SuperAdmin';

beforeEach(async () => {
  await superAdmin.collection.insertMany(adminSeed);
});

afterEach(async () => {
  await superAdmin.collection.deleteMany();
  jest.restoreAllMocks();
});

const superAdminId = adminSeed[0]._id;

const invalidSuperAdmin = '6561-361#0ebcc@7a2a1b9f'

const notFoundId = '6466b3620ebbac7a2a1b7f8f'

const missingEmailFieldSuperAdmin = {
  _id: '6466b3610ebbac7a2a1b9f8f',
  password: 'horadeaventura2',
};

const putTestSuperAdmin = {
  email: 'picklerick@morty.com',
  password: 'rickandmorty2',
};

describe('PUT /api/super-admin', () => {
  test('should modify one super admin, return status 200', async () => {
    const response = await request(app).put(`/api/super-admins/${superAdminId}`).send(putTestSuperAdmin);
    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe('Super Admin Updated Successfully!')
    expect(response.body.error).toBe(false);
  });
  test('should not found id, return error 404', async () => {
    const response = await request(app).put(`/api/super-admins/${notFoundId}`).send(putTestSuperAdmin);
    expect(response.status).toBe(404);
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe('Super Admin could not be Found and updated')
    expect(response.body.error).toBe(true);
  });
  test('missing email, return 400', async () => {
    const response = await request(app).put(`/api/super-admins/${superAdminId}`).send(missingEmailFieldSuperAdmin);
    expect(response.status).toBe(400);
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toBe('There was an error: \"email\" is required');
    expect(response.body.error).toBe(true);
  });
  test('Should respond server error, return 500', async () => {
    jest.spyOn(SuperAdmin, 'findByIdAndUpdate').mockRejectedValue(new Error('Something went wrong'));
    const response = await request(app).put(`/api/super-admins/${superAdminId}`).send(putTestSuperAdmin);
    expect(response.status).toBe(500);
  });
});

// describe('DELETE /api/super-admin', () => {
//   test('Should delete one super admin', async () => {

//   });
// });