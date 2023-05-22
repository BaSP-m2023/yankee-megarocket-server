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

describe('PUT /api/super-admins', () => {
  test('should modify one super admin, return status 200', async () => {
    const response = await request(app).put(`/api/super-admins/${superAdminId}`).send(putTestSuperAdmin);
    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe('Super Admin Updated Successfully!');
    expect(response.body.error).toBeFalsy();
  });
  test('should not found id, return error 404', async () => {
    const response = await request(app).put(`/api/super-admins/${notFoundId}`).send(putTestSuperAdmin);
    expect(response.status).toBe(404);
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
  });
  test('Invalid ID, return error 400', async () => {
    const response = await request(app).put('/api/super-admins/1234asdawaadw').send();
    expect(response.status).toBe(400);
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe('This is not a valid object Id');
    expect(response.body.error).toBeTruthy();
  });
  test('Should not be found and modify a super admin, return error 404', async () => {
    await superAdmin.deleteMany();
    const response = await request(app).put(`/api/super-admins/${superAdminId}`).send(putTestSuperAdmin);
    expect(response.status).toBe(404);
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
