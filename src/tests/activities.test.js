import request from 'supertest';
import app from '../app';
import Activity from '../models/Activity';
import activitySeed from '../seeds/activities';
/* eslint-disable no-underscore-dangle */
const activityId = activitySeed[0]._id;

const mockActivity = {
  activityName: 'Circuit Training',
  activityDescription: 'A high-intensity workout.',
};

beforeEach(async () => {
  await Activity.collection.insertMany(activitySeed);
});
afterEach(async () => {
  await Activity.collection.deleteMany();
  jest.restoreAllMocks();
});

describe('PUT /api/activities/:id', () => {
  test('It should update one activity', async () => {
    const response = await request(app).put(`/api/activities/${activityId}`).send(mockActivity);
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe('Activity was updated successfully!');
  });
  test('It should send error 400 because the Id does not exist', async () => {
    const response = await request(app).put(`/api/activities/${activityId}`).send({});
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toBe('There was an error in the validation: "activityName" is required');
  });
  test('It should send error 400 because the Id is invalid', async () => {
    const response = await request(app).put(`/api/activities/${activityId}`).send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toBe('There was an error in the validation: "activityName" is required');
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
    expect(response.body.message).toBe('Activity was deleted successfully!');
  });
  test('It should send error 400 because the Id does not exist', async () => {
    await Activity.deleteMany();
    const response = await request(app).delete(`/api/activities/${activityId}`).send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe('Activity could not be found and Deleted!');
  });
  test('It should send error 500', async () => {
    jest.spyOn(Activity, 'findByIdAndDelete').mockRejectedValue(new Error('Something went wrong'));
    const response = await request(app).delete(`/api/activities/${activityId}`).send();
    expect(response.status).toBe(500);
    expect(response.body.data).toBe(undefined);
  });
});
