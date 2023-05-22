import request from 'supertest';
import app from '../app';
import Activity from '../models/Activity';
import activitySeed from '../seeds/activities';

const mockActivity = {
  activity: 'Crossfit',
  description: 'Made from the best of the best',
};
// eslint-disable-next-line no-underscore-dangle
const activityId = activitySeed[0]._id;

beforeEach(async () => {
  await Activity.collection.insertMany(activitySeed);
});
afterEach(async () => {
  await Activity.collection.deleteMany();
});

describe('GET /api/activities', () => {
  test('It should respond with an array of activities', async () => {
    const response = await request(app).get(`/api/activities/${activityId}`).send();
    expect(response.body).toEqual(expect.arrayContaining(activitySeed));
    expect(response.statusCode).toBe(200);
  });
  test('It should respond with a 404', async () => {
    const response = await request(app).get('/api/activities/');
    expect(response.statusCode).toBe(404);
  });
});

describe('POST /api/activities', () => {
  test('It should respond with a new activity', async () => {
    const response = await request(app).post(`/api/activities/${activityId}`).send(mockActivity);
    expect(response.body).toMatchObject(mockActivity);
    expect(response.statusCode).toBe(200);
  });
  test('It should respond with a 400', async () => {
    const response = await request(app).get(`/api/activities/${activityId}`).send();
    expect(response.statusCode).toBe(404);
  });
});

describe('GET /api/activities/:id', () => {
  test('It should respond with a single activity', async () => {
    const response = await request(app).get('/api/activities/1');
    expect(response.body).toMatchObject(activitySeed[0]);
    expect(response.statusCode).toBe(200);
  });
  test('It should respond with a 404', async () => {
    const response = await request(app).post(`/api/activities/${activityId}`).send({});
    expect(response.statusCode).toBe(404);
  });
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
  test('It should send error 400 because the IId is invalid', async () => {
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
  });
});
