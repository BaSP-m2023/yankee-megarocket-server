/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import app from '../app';
import Activity from '../models/Activity';
import activitySeed from '../seeds/activities';

const activityId = activitySeed[0]._id;
const mockActivity = {
  activity: 'Crossfit',
  description: 'Made from the best of the best',
};

beforeEach(async () => {
  await Activity.collection.insertMany(activitySeed);
});
afterEach(async () => {
  await Activity.collection.deleteMany();
});

describe('PUT /api/activities/:id', () => {
  test('It should update one activity', async () => {
    const response = await request(app).put(`/api/activities/${activityId}`).send(mockActivity);
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe('Activity has been updated successfully');
  });
  test('It should send error 400 because the Id does not exist', async () => {
    const response = await request(app).put(`/api/activities/${activityId}`).send({});
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe('Activity could not been found');
  });
  test('It should send error 400 because the Id is invalid', async () => {
    const response = await request(app).put(`/api/activities/${activityId}`).send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe('Activity could not been found');
  });
  test('It should send error 500', async () => {
    jest.spyOn(Activity, 'findByIdAndUpdate').mockRejectedValue(new Error('Something went wrong'));
    const response = await request(app).put(`/api/activities/${activityId}`).send(mockActivity);
    expect(response.status).toBe(500);
    expect(response.body.data).toBe(undefined);
  });
});

describe('DELETE /api/activities/:id', () => {
  test('It should delete one activity', async () => {
    const response = await request(app).delete(`/api/activities/${activityId}`).send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe('Activity has been deleted successfully');
  });
  test('It should send error 400 because the Id does not exist', async () => {
    const response = await request(app).delete(`/api/activities/${activityId}`).send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe('Activity could not been found');
  });
  test('It should send error 500', async () => {
    jest.spyOn(Activity, 'findByIdAndDelete').mockRejectedValue(new Error('Something went wrong'));
    const response = await request(app).delete(`/api/activities/${activityId}`).send();
    expect(response.status).toBe(500);
    expect(response.body.data).toBe(undefined);
  });
});
