/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import app from '../app';
import Class from '../models/Class';
import classesSeed from '../seeds/classes';

const mockClass = {
  activityId: '646939300b3782bf437c381b',
  hour: 14,
  day: 'tuesday',
  trainerId: '64693b1d0b3782bf437c3826',
  maxCapacity: 10,
};

const mockClassTrainerInvalid = {
  activityId: '646939300b3782bf437c381b',
  hour: 14,
  day: 'tuesday',
  maxCapacity: 10,
};

const mockClassActivityIdInvalid = {
  hour: 14,
  day: 'tuesday',
  trainerId: '64693b1d0b3782bf437c3826',
  maxCapacity: 10,
};

const ClassId = classesSeed[0]._id;

const nonExistentClassId = {
  id: '64693b1d0b3782bf437c3826',
};

beforeEach(async () => {
  await Class.collection.insertMany(classesSeed);
});
afterEach(async () => {
  await Class.collection.deleteMany();
});

describe('PUT /api/classes/:id', () => {
  test('Should respond with a  200 status, class updated', async () => {
    const response = await request(app).put(`/api/classes/${ClassId}`).send(mockClass);
    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe('Class was updated succesfully');
  });

  test('Should respond with a 400 status, class could not be found and updated', async () => {
    await Class.deleteMany();
    const response = await request(app).put(`/api/classes/${ClassId}`).send(mockClass);
    expect(response.status).toBe(400);
    expect(response.body.data).toEqual({});
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe('Class could not be found and updated!');
  });

  test('Should respond with a 400 status, Id is invalid', async () => {
    const response = await request(app).put('/api/classes/5454dgd').send(mockClass);
    expect(response.status).toBe(400);
    expect(response.body.data).toEqual({});
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('This is not a valid object Id');
  });

  test('Should respond with a 400 status, Id is not found or non-existent', async () => {
    const response = await request(app).put(`/api/classes/${nonExistentClassId}`).send(mockClass);
    expect(response.status).toBe(400);
    expect(response.body.data).toEqual({});
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('This is not a valid object Id');
  });

  test('Should respond with a 400 status, Trainers field missing', async () => {
    const response = await request(app).put(`/api/classes/${ClassId}`).send(mockClassTrainerInvalid);
    expect(response.status).toBe(400);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('There was an error: "trainerId" is required');
  });

  test('Should respond with a 400 status, activityId field missing', async () => {
    const response = await request(app).put(`/api/classes/${ClassId}`).send(mockClassActivityIdInvalid);
    expect(response.status).toBe(400);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('There was an error: "activityId" is required');
  });

  test('Should respond with a 500 status, server error', async () => {
    jest.spyOn(Class, 'findByIdAndUpdate').mockRejectedValue(new Error('Something went wrong'));
    const response = await request(app).put(`/api/classes/${ClassId}`).send(mockClass);
    expect(response.status).toBe(500);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });
});

describe('DELETE /api/classes/:id', () => {
  test('Should respond with a  200 status, class deleted', async () => {
    const response = await request(app).delete(`/api/classes/${ClassId}`).send();
    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe('Class deleted succesfully');
  });

  test('Should respond with a 400 status, invalid Id', async () => {
    const response = await request(app).delete('/api/classes/6469chs').send();
    expect(response.status).toBe(400);
    expect(response.body.data).toEqual({});
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('This is not a valid object Id');
  });

  test('Should respond with a 400 status, class could not be found and deleted', async () => {
    await Class.deleteMany();
    const response = await request(app).delete(`/api/classes/${ClassId}`).send();
    expect(response.status).toBe(400);
    expect(response.body.data).toEqual({});
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe('Class could not be found and deleted!');
  });

  test('Should respond with a 400 status, Id is not found or non-existent', async () => {
    const response = await request(app).delete(`/api/classes/${nonExistentClassId}`).send(mockClass);
    expect(response.status).toBe(400);
    expect(response.body.data).toEqual({});
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('This is not a valid object Id');
  });

  test('Should respond with a 500 status, server error', async () => {
    jest.spyOn(Class, 'findByIdAndDelete').mockRejectedValue(new Error('Something went wrong'));
    const response = await request(app).delete(`/api/classes/${ClassId}`).send();
    expect(response.status).toBe(500);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });
});
