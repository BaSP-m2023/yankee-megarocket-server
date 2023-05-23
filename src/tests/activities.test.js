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
const mockActivityEmpty = {
};
const mockActivityBadValidations = {
  activity: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  description: 123123,
};
const mockIdBad = {
  id: '64691519333281ea60b8069a',
};

beforeEach(async () => {
  await Activity.collection.insertMany(activitySeed);
});
afterEach(async () => {
  await Activity.collection.deleteMany();
});

describe('GET /api/members', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/api/members').send();
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBeGreaterThanOrEqual(1);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe('Members found successfully!:');
  });
  test('should return status 404', async () => {
    await Activity.collection.deleteMany();
    const response = await request(app).get('/api/members').send();
    expect(response.body.error).toBeTruthy();
    expect(response.status).toBe(404);
    expect(response.body.data.length).toBe(0);
    expect(response.body.message).toBe('There are no members!');
  });
  test('should respond with a 500 status, server error', async () => {
    jest.spyOn(Activity, 'find').mockRejectedValue(new Error('Something went wrong'));
    const response = await request(app).get('/api/members/').send();
    expect(response.status).toBe(500);
    expect(response.body.error).toBeTruthy();
  });
});

describe('GETById /api/members/:id', () => {
  test('should return status 400, send no id', async () => {
    const response = await request(app).get('/api/members/:id').send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data.length).toBe(undefined);
    expect(response.body.message).toBe('This is not a valid object Id');
  });
  test('should return status 400, send invalid id', async () => {
    const response = await request(app).get(`/api/members/${mockActivityBadValidations.phone}`).send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data.length).toBe(undefined);
    expect(response.body.message).toBe('This is not a valid object Id');
  });
  test('should return status 404, send valid id but without member', async () => {
    const response = await request(app).get(`/api/members/${mockIdBad.id}`).send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data.length).toBe(undefined);
    expect(response.body.message).toBe('Member with id: 64691519333281ea60b8069a not found!');
  });
  test('should return status 200', async () => {
    const response = await request(app).get(`/api/members/${activityId}`).send();
    expect(response.status).toBe(200);
    /* eslint no-underscore-dangle: 0 */
    expect(response.body.data._id).toBe(activityId.toString());
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe('Member found successfully!');
  });
  test('should respond with a 500 status, server error', async () => {
    jest.spyOn(Activity, 'findById').mockRejectedValue(new Error('Something went wrong'));
    const response = await request(app).get(`/api/members/${activityId}`).send();
    expect(response.status).toBe(500);
    expect(response.body.error).toBeTruthy();
  });
});

describe('post /api/members', () => {
  test('should return status 201', async () => {
    const response = await request(app)
      .post('/api/members/')
      .send(mockActivity);
    expect(response.status).toBe(201);
    expect(response.body.data.dni).toBe(mockActivity.dni);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe('Member created successfully!');
  });
  test('should return status 400, send data empty', async () => {
    const response = await request(app)
      .post('/api/members')
      .send(mockActivityEmpty);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBe(undefined);
    // eslint-disable-next-line
    expect(response.body.message).toBe('There was an error in the validation: \"firstName\" is required');
  });
  test('should return status 400, send data without a data', async () => {
    const response = await request(app)
      .post('/api/members');
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBe(undefined);
    // eslint-disable-next-line
    expect(response.body.message).toBe('There was an error in the validation: \"firstName\" is required');
  });
  test('should return status 400, send data with bad inputs', async () => {
    const response = await request(app)
      .post('/api/members')
      .send(mockActivityBadValidations);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBe(undefined);
    // eslint-disable-next-line
    expect(response.body.message).toBe('There was an error in the validation: \"firstName\" must be a string');
  });
  test('should respond with a 400 status, server error', async () => {
    jest.spyOn(Activity, 'create').mockResolvedValue(null);
    const response = await request(app).post('/api/members/').send(mockActivity);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('Member could not be created!');
  });
  test('should respond with a 500 status, server error', async () => {
    jest.spyOn(Activity, 'create').mockRejectedValue(new Error('Something went wrong'));
    const response = await request(app).post('/api/members/').send(mockActivity);
    expect(response.status).toBe(500);
    expect(response.body.error).toBeTruthy();
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
