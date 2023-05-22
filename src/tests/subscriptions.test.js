/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import app from '../app';
import Subscription from '../models/Subscription';
import subSeed from '../seeds/subscriptions';

beforeEach(async () => {
  await Subscription.collection.insertMany(subSeed);
});

afterEach(async () => {
  await Subscription.collection.deleteMany();
});

const mockSubscriptionId = subSeed[0]._id;

const invalidSubMockup = {
  id: '64694cb404b48dafdecfa12e',
};

const modifiedSubscription = {
  classId: '64693c420b3782bf437c123a',
  members: [
    '64655cf22c2d037df75e72dd', '64691789d00ee55da969d212',
  ],
  date: '2023-10-05T03:00:00.000Z',
};

const missingFieldSub = {
  classId: '64693c420b3782bf437c123a',
  members: [
    '64655cf22c2d037df75e72dd', '64691789d00ee55da969d212',
  ],
};

describe('PUT /api/subscriptions', () => {
  test('should update one subscription', async () => {
    const response = await request(app).put(`/api/subscriptions/${mockSubscriptionId}`).send(modifiedSubscription);
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe('Subscription Updated Successfully!');
  });

  test('should send error 400 because this ID is invalid', async () => {
    const response = await request(app).put(`/api/subscriptions/${invalidSubMockup.id}`).send(modifiedSubscription);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe('Subscription could not be found and updated!');
  });

  test('should send error 400 because the date field is missing', async () => {
    const response = await request(app).put(`/api/subscriptions/${mockSubscriptionId}`).send(missingFieldSub);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toBe('An error has occurred: "date" is required');
  });
});

describe('DELETE /api/subscriptions', () => {
  test('should delete one subscription', async () => {
    const response = await request(app).delete(`/api/subscriptions/${mockSubscriptionId}`).send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe('Subscription Deleted Successfully!');
  });

  test('should send 400 error because his ID is invalid', async () => {
    const response = await request(app).delete(`/api/subscriptions/${invalidSubMockup.id}`).send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe('Subscription could not be found and deleted!');
  });
});
