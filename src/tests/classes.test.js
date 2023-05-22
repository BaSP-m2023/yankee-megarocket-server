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

const mockClassInvalid = {
  activityId: '646939300b3782bf437c381b',
  hour: 14,
  day: 'tuesday',
};

beforeAll(async () => {
  await Class.collection.insertMany(classesSeed);
});

describe('PUT /api/classes/:id', () => {
  test('Should respond with a  200 status, class updated', async () => {
    const response = await request(app).put('/api/classes/64693c420b3782bf437c382f').send(mockClass);
    console.log(response.body.message);
    expect(response.status).toBe(200);
  });

  test('Should respond with a 400 status, Id is invalid', async () => {
    const response = await request(app).put('/api/classes/64693c420b3782bf437c382r').send(mockClass);
    console.log(response.body.message);
    expect(response.status).toBe(400);
  });

  test('Should respond with a 400 status, there is missing fields', async () => {
    const response = await request(app).put('/api/classes/64693c420b3782bf437c382f').send(mockClassInvalid);
    console.log(response.body.message);
    expect(response.status).toBe(400);
  });
});

describe('DELETE /api/classes/:id', () => {
  test('Should respond with a  200 status, class deleted', async () => {
    const response = await request(app).delete('/api/classes/64693c420b3782bf437c382f').send(mockClass);
    expect(response.status).toBe(200);
  });

  test('Should respond with a 400 status, invalid Id', async () => {
    const response = await request(app).delete('/api/classes/64693c420b3782bf437c3829').send(mockClass);
    expect(response.status).toBe(400);
  });
});
