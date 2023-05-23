/* eslint-disable no-underscore-dangle */
/* eslint-disable no-useless-escape */
import request from 'supertest';
import app from '../app';
import Class from '../models/Class';
import classesSeed from '../seeds/classes';

const mockInvalidClass = {
  hour: 14,
  day: 'tuesday',
  trainerId: '64693b1d0b3782bf437c3826',
  maxCapacity: 10,
};
const mockClass = {
  activityId: '646939300b3782bf437c381b',
  hour: 14,
  day: 'tuesday',
  trainerId: '64693b1d0b3782bf437c3826',
  maxCapacity: 10,
};
const classId = classesSeed[0]._id;

const nonExistentClassId = '64693b1d0b3782bf437c3826';

beforeEach(async () => {
  await Class.collection.insertMany(classesSeed);
});

afterEach(async () => {
  await Class.collection.deleteMany();
});

describe('GET /api/classes', () => {
  test('should return status 200 and valid JSON response', async () => {
    const response = await request(app).get('/api/classes');
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe('Classes found successfully!');
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  test('should return status 400 for invalid route', async () => {
    const response = await request(app).get('/api/classes/invalid');
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('This is not a valid object Id');
  });
  test('should return status 404 if no classes are created', async () => {
    await Class.collection.deleteMany();
    const response = await request(app).get('/api/classes');
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('There are no classes!');
    expect(response.body.data.length).toBe(0);
  });
  test('should return status 500 for internal server error', async () => {
    jest.spyOn(Class, 'find').mockImplementationOnce(() => {
      throw new Error('Internal server error');
    });

    const response = await request(app).get('/api/classes');
    expect(response.status).toBe(500);
    expect(response.body.error).toBeTruthy();
    expect(response.body).toEqual(expect.objectContaining({ error: true }));
  });
});

describe('POST /api/classes/', () => {
  test('should create a new class and return a status 201', async () => {
    const response = await request(app).post('/api/classes').send(mockClass);
    expect(response.status).toBe(201);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe('Class created successfully!');
    expect(response.body.data).toEqual(expect.any(Object));
    const createdClass = response.body.data;
    expect(createdClass.activityId).toBe(mockClass.activityId);
    expect(createdClass.hour).toBe(mockClass.hour);
    expect(createdClass.day).toBe(mockClass.day);
    expect(createdClass.trainerId).toBe(mockClass.trainerId);
    expect(createdClass.maxCapacity).toBe(mockClass.maxCapacity);
  });

  test('should return status 400 for invalid request data', async () => {
    const response = await request(app).post('/api/classes').send(mockInvalidClass);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('There was an error: \"activityId\" is required');
  });
  test('should return status 500 for internal server error', async () => {
    jest.spyOn(Class, 'create').mockImplementationOnce(() => {
      throw new Error('Internal server error');
    });

    const response = await request(app).post('/api/classes').send(mockClass);
    expect(response.status).toBe(500);
    expect(response.body.error).toBeTruthy();
    expect(response.body).toEqual(expect.objectContaining({ error: true }));
  });
});

describe('GET BY ID /api/classes/:id', () => {
  test('should return status 200', async () => {
    const response = await request(app).get(`/api/classes/${classId}`);
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
    expect(response.body.message).toBe('Class found successfully');
  });

  test('should return status 404', async () => {
    const response = await request(app).get(`/api/classes/${nonExistentClassId}`);
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe(`Class with id: ${nonExistentClassId} not found`);
  });

  test('should return status 400 for invalid class ID', async () => {
    const invalidClassId = 'invalid';
    const response = await request(app).get(`/api/classes/${invalidClassId}`);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('This is not a valid object Id');
  });
  test('should return status 500 for internal server error', async () => {
    jest.spyOn(Class, 'find').mockImplementationOnce(() => {
      throw new Error('Internal server error');
    });

    const response = await request(app).get('/api/classes');
    expect(response.status).toBe(500);
    expect(response.body.error).toBeTruthy();
    expect(response.body).toEqual(expect.objectContaining({ error: true }));
  });
});
