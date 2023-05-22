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

beforeAll(async () => {
  await Class.collection.insertMany(classesSeed);
});

describe('PUT /api/classes/:id', () => {
  test('Should respond with a  200 status', async () => {
    const response = await request(app).put('/api/classes/64693c420b3782bf437c382f').send(mockClass);
    expect(response.status).toBe(200);
  });

  test('Should respond with a 400 status', async () => {
    const response = await request(app).put('/api/classes/64693c420b3782bf437c382r').send(mockClass);
    expect(response.status).toBe(400);
  });
});

describe('DELETE /api/classes/:id', () => {
  test('Should respond with a  200 status', async () => {
    const response = await request(app).put('/api/classes/64693c420b3782bf437c382f').send(mockClass);
    expect(response.status).toBe(200);
  });

  test('Should respond with a 400 status', async () => {
    const response = await request(app).put('/api/classes/64693c420b3782bf437c3829').send(mockClass);
    expect(response.status).toBe(400);
  });
});
