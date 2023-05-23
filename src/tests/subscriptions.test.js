/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import app from '../app';
import Subscription from '../models/Subscription';
import subSeed from '../seeds/subscriptions';

const validRoute = '/api/subscriptions';
const mockSubscriptionId = subSeed[0]._id;
const invalidId = '1234p';
const notFoundId = '65694cb404b48dafdecfa44a';

const mockSubscription = {
  classId: '64623a627aebbd9653af45e1',
  members: ['64623a627aebbd9653bf45e4', '64623a627bebbd9653af45e5'],
  date: '2023-10-05T03:00:00.000+00:00',

};

beforeEach(async () => {
  await Subscription.collection.insertMany(subSeed);
});

afterEach(async () => {
  await Subscription.collection.deleteMany();
  jest.restoreAllMocks();
});

describe('GET /api/subscriptions', () => {
  test('should return status 200', async () => {
    const response = await request(app).get(validRoute).send();
    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe('Subscriptions found successfully!');
    expect(response.body.error).toBe(false);
  });
  test('Should return status 404 and no subscriptions message', async () => {
    await Subscription.collection.deleteMany();
    const response = await request(app).get(validRoute).send();
    expect(response.status).toBe(404);
    expect(response.body.data).toBeDefined();
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('There are no subscriptions!');
  });
  test('should return status 500', async () => {
    jest.spyOn(Subscription, 'populate').mockRejectedValue(new Error('oh no Something went wrong'));
    const response = await request(app).get(validRoute).send();
    expect(response.status).toBe(500);
  });
});

describe('GET /api/subscriptions/:id', () => {
  test('should return status 200', async () => {
    const response = await request(app).get(`/api/subscriptions/${mockSubscriptionId}`).send();
    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe('Subscription found successfully!');
    expect(response.body.error).toBeFalsy();
  });
  test('should return status 400 and invalid ID message', async () => {
    const response = await request(app).get(`/api/subscriptions/${invalidId}`).send();
    expect(response.status).toBe(400);
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe('This is not a valid object Id');
    expect(response.body.error).toBeTruthy();
  });
  test('should return status 404', async () => {
    const response = await request(app).get(`/api/subscriptions/${notFoundId}`).send();
    expect(response.status).toBe(404);
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe(`Subscription with id: ${notFoundId} not found!`);
    expect(response.body.error).toBeTruthy();
  });
  test('should return status 500', async () => {
    jest.spyOn(Subscription, 'populate').mockRejectedValue(new Error('Something went wrong'));
    const response = await request(app).get(`/api/subscriptions/${mockSubscriptionId}`).send();
    expect(response.status).toBe(500);
  });
});

describe('POST /api/subscriptions/', () => {
  test('should return status 201', async () => {
    const response = await request(app).post(validRoute).send(mockSubscription);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Subscription created successfully!');

    expect(response.body.data).toBeDefined();
    expect(response.body.error).toBeFalsy();
  });
  test('should return status 400 and missing date message', async () => {
    const response = await request(app).post(validRoute).send({
      classId: mockSubscription.classId,
      members: mockSubscription.members,
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('An error has occurred: "date" is required');
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });
  test('should return status 400 and missing members message', async () => {
    const response = await request(app).post(validRoute).send({
      classId: mockSubscription.classId,
      date: mockSubscription.date,
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('An error has occurred: "members" is required');
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });
  test('should return status 400 and missing class Id message', async () => {
    const response = await request(app).post(validRoute).send({
      members: mockSubscription.members,
      date: mockSubscription.date,
    });
    expect(response.status).toBe(400);
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toBe('An error has occurred: "classId" is required');
    expect(response.body.error).toBeTruthy();
  });
  test('should return status 500', async () => {
    jest.spyOn(Subscription, 'create').mockRejectedValue(new Error('Oh no! Something went wrong!'));
    const response = await request(app).post(validRoute).send(mockSubscription);
    expect(response.status).toBe(500);
  });
});
