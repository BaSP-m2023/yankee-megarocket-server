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
    expect(response.body.data).toEqual([]);
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
    expect(response.body.data).toEqual({});
    expect(response.body.message).toBe('This is not a valid object Id');
    expect(response.body.error).toBeTruthy();
  });
  test('should return status 404', async () => {
    const response = await request(app).get(`/api/subscriptions/${notFoundId}`).send();
    expect(response.status).toBe(404);
    expect(response.body.data).toEqual([]);
    expect(response.body.message).toBe(`Subscription with id: ${notFoundId} not found!`);
    expect(response.body.error).toBeTruthy();
  });
  test('should return status 500', async () => {
    jest.spyOn(Subscription, 'populate').mockRejectedValue(new Error('Something went wrong'));
    const response = await request(app).get(`/api/subscriptions/${mockSubscriptionId}`).send();
    expect(response.status).toBe(500);
    expect(response.body.message).toEqual({});
    expect(response.body.error).toBeTruthy();
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
  test('should return status 400 and controller error', async () => {
    jest.spyOn(Subscription, 'create').mockResolvedValue();
    const response = await request(app).post(validRoute).send(mockSubscription);
    expect(response.status).toBe(400);
    expect(response.body.data).toEqual({});
    expect(response.body.message).toBe('Subscription could not be found and created!');
    expect(response.body.error).toBeTruthy();
  });
  test('should return status 500', async () => {
    jest.spyOn(Subscription, 'create').mockRejectedValue(new Error('Oh no! Something went wrong!'));
    const response = await request(app).post(validRoute).send(mockSubscription);
    expect(response.status).toBe(500);
    expect(response.body.message).toEqual({});
    expect(response.body.error).toBeTruthy();
  });

  describe('PUT /api/subscriptions', () => {
    test('should update one subscription', async () => {
      const response = await request(app).put(`/api/subscriptions/${mockSubscriptionId}`).send(modifiedSubscription);
      expect(response.status).toBe(200);
      expect(response.body.error).toBeFalsy();
      expect(response.body.data).toBeDefined();
      expect(response.body.message).toBe('Subscription Updated Successfully!');
    });

    test('should send error 400 because this ID doesnt exist', async () => {
      const response = await request(app).put(`/api/subscriptions/${notFoundId}`).send(modifiedSubscription);
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toEqual({});
      expect(response.body.message).toBe('Subscription could not be found and updated!');
    });

    test('should send error 400 because the date field is missing', async () => {
      const response = await request(app).put(`/api/subscriptions/${mockSubscriptionId}`).send(missingFieldSub);
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('An error has occurred: "date" is required');
    });

    test('should send 400 error because this ID is an invalid ID', async () => {
      const response = await request(app).put('/api/subscriptions/1234wewe}').send();
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeDefined();
      expect(response.body.message).toBe('This is not a valid object Id');
    });

    test('Should respond with a 400 status, subscriptions could not be found and updated', async () => {
      await Subscription.deleteMany();
      const response = await request(app).put(`/api/subscriptions/${mockSubscriptionId}`).send(modifiedSubscription);
      expect(response.status).toBe(400);
      expect(response.body.data).toEqual({});
      expect(response.body.error).toBeTruthy();
      expect(response.body.message).toBe('Subscription could not be found and updated!');
    });

    test('should send 500 error', async () => {
      jest.spyOn(Subscription, 'findByIdAndUpdate').mockRejectedValue(new Error('Something went wrong'));
      const response = await request(app).put(`/api/subscriptions/${mockSubscriptionId}`).send(modifiedSubscription);
      expect(response.status).toBe(500);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toEqual({});
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
      const response = await request(app).delete(`/api/subscriptions/${notFoundId}`).send();
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toEqual({});
      expect(response.body.message).toBe('Subscription could not be found and deleted!');
    });

    test('should send 400 error because this ID is an invalid ID', async () => {
      const response = await request(app).delete('/api/subscriptions/1234wewe}').send();
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toEqual({});
      expect(response.body.message).toBe('This is not a valid object Id');
    });

    test('Should respond with a 400 status, subscriptions could not be found and updated', async () => {
      await Subscription.deleteMany();
      const response = await request(app).delete(`/api/subscriptions/${mockSubscriptionId}`).send(modifiedSubscription);
      expect(response.status).toBe(400);
      expect(response.body.data).toEqual({});
      expect(response.body.error).toBeTruthy();
      expect(response.body.message).toBe('Subscription could not be found and deleted!');
    });

    test('should send 500 error', async () => {
      jest.spyOn(Subscription, 'findByIdAndDelete').mockRejectedValue(new Error('Something went wrong'));
      const response = await request(app).delete(`/api/subscriptions/${mockSubscriptionId}`).send(modifiedSubscription);
      expect(response.status).toBe(500);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toEqual({});
    });
  });
});
