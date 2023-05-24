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
const mockActivityEmpty = {
};
const mockActivityBadValidations = {
  activityName: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  activityDescription: 123123,
};
const mockIdBad = {
  id: '64691519333281ea60b8069a',
};
beforeEach(async () => {
  await Activity.collection.insertMany(activitySeed);
});
afterEach(async () => {
  await Activity.collection.deleteMany();
  jest.restoreAllMocks();
});
describe('GET /api/activities', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/api/activities').send();
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBeGreaterThanOrEqual(1);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe('Activities found successfully!');
  });
  test('should return status 404', async () => {
    await Activity.collection.deleteMany();
    const response = await request(app).get('/api/activities').send();
    expect(response.body.error).toBeTruthy();
    expect(response.status).toBe(404);
    expect(response.body.data.length).toBe(0);
    expect(response.body.message).toBe('There are no activities!');
  });
  test('should respond with a 500 status, server error', async () => {
    jest.spyOn(Activity, 'find').mockRejectedValue(new Error('Something went wrong'));
    const response = await request(app).get('/api/activities').send();
    expect(response.status).toBe(500);
    expect(response.body.error).toBeTruthy();
  });
});
describe('GETById /api/activities/:id', () => {
  test('should return status 400, send no id', async () => {
    const response = await request(app).get('/api/activities/:id').send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data.length).toBeUndefined();
    expect(response.body.message).toBe('This is not a valid object Id');
  });
  test('should return status 400, send invalid id', async () => {
    const response = await request(app).get(`/api/activities/${mockActivityBadValidations.phone}`).send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data.length).toBeUndefined();
    expect(response.body.message).toBe('This is not a valid object Id');
  });
  test('should return status 404, send valid id but without member', async () => {
    const response = await request(app).get(`/api/activities/${mockIdBad.id}`).send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data.length).toBeUndefined();
    expect(response.body.message).toBe('Activity with id: 64691519333281ea60b8069a not found!');
  });
  test('should return status 200', async () => {
    const response = await request(app).get(`/api/activities/${activityId}`).send();
    expect(response.status).toBe(200);
    /* eslint no-underscore-dangle: 0 */
    expect(response.body.data._id).toBe(activityId.toString());
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe('Activity found successfully!');
  });
  test('should return status 404', async () => {
    await Activity.collection.deleteMany();
    const response = await request(app).get('/api/activities').send();
    expect(response.body.error).toBeTruthy();
    expect(response.status).toBe(404);
    expect(response.body.data.length).toBe(0);
    expect(response.body.message).toBe('There are no activities!');
  });
  test('should respond with a 500 status, server error', async () => {
    jest.spyOn(Activity, 'find').mockRejectedValue(new Error('Something went wrong'));
    const response = await request(app).get('/api/activities').send();
    expect(response.status).toBe(500);
    expect(response.body.error).toBeTruthy();
  });
});
describe('GETById /api/activities/:id', () => {
  test('should return status 400, send no id', async () => {
    const response = await request(app).get('/api/activities/:id').send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data.length).toBeUndefined();
    expect(response.body.message).toBe('This is not a valid object Id');
  });
  test('should return status 400, send invalid id', async () => {
    const response = await request(app).get(`/api/activities/${mockActivityBadValidations.phone}`).send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data.length).toBeUndefined();
    expect(response.body.message).toBe('This is not a valid object Id');
  });
  test('should return status 404, send valid id but without member', async () => {
    const response = await request(app).get(`/api/activities/${mockIdBad.id}`).send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data.length).toBeUndefined();
    expect(response.body.message).toBe('Activity with id: 64691519333281ea60b8069a not found!');
  });
  test('should return status 200', async () => {
    const response = await request(app).get(`/api/activities/${activityId}`).send();
    expect(response.status).toBe(200);
    /* eslint no-underscore-dangle: 0 */
    expect(response.body.data._id).toBe(activityId.toString());
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe('Activity found successfully!');
  });
  test('should return status 404', async () => {
    await Activity.collection.deleteMany();
    const response = await request(app).get('/api/activities').send();
    expect(response.body.error).toBeTruthy();
    expect(response.status).toBe(404);
    expect(response.body.data.length).toBe(0);
    expect(response.body.message).toBe('There are no activities!');
  });
  test('should respond with a 500 status, server error', async () => {
    jest.spyOn(Activity, 'find').mockRejectedValue(new Error('Something went wrong'));
    const response = await request(app).get('/api/activities').send();
    expect(response.status).toBe(500);
    expect(response.body.error).toBeTruthy();
  });
});
describe('GETById /api/activities/:id', () => {
  test('should return status 400, send no id', async () => {
    const response = await request(app).get('/api/activities/:id').send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data.length).toBeUndefined();
    expect(response.body.message).toBe('This is not a valid object Id');
  });
  test('should return status 400, send invalid id', async () => {
    const response = await request(app).get(`/api/activities/${mockActivityBadValidations.phone}`).send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data.length).toBeUndefined();
    expect(response.body.message).toBe('This is not a valid object Id');
  });
  test('should return status 404, send valid id but without member', async () => {
    const response = await request(app).get(`/api/activities/${mockIdBad.id}`).send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data.length).toBeUndefined();
    expect(response.body.message).toBe('Activity with id: 64691519333281ea60b8069a not found!');
  });
  test('should return status 200', async () => {
    const response = await request(app).get(`/api/activities/${activityId}`).send();
    expect(response.status).toBe(200);
    /* eslint no-underscore-dangle: 0 */
    expect(response.body.data._id).toBe(activityId.toString());
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe('Activity found successfully!');
  });
  test('should respond with a 500 status, server error', async () => {
    jest.spyOn(Activity, 'findById').mockRejectedValue(new Error('Something went wrong'));
    const response = await request(app).get(`/api/activities/${activityId}`).send();
    expect(response.status).toBe(500);
    expect(response.body.error).toBeTruthy();
  });
});
describe('POST /api/activities/', () => {
  test('should create a new activity and return a status 201', async () => {
    const response = await request(app).post('/api/activities').send(mockActivity);
    expect(response.status).toBe(201);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe('Activity created successfully!');
  });

  test('should return status 400, send data empty', async () => {
    const response = await request(app).post('/api/activities').send(mockActivityEmpty);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    // eslint-disable-next-line
    expect(response.body.message).toBe('There was an error in the validation: \"activityName\" is required');
  });
  test('should return status 400, send data without a data', async () => {
    const response = await request(app)
      .post('/api/activities');
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    // eslint-disable-next-line
    expect(response.body.message).toBe('There was an error in the validation: \"activityName\" is required');
  });
  test('should return status 400, send data with bad inputs', async () => {
    const response = await request(app)
      .post('/api/activities')
      .send(mockActivityBadValidations);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    // eslint-disable-next-line
    expect(response.body.message).toBe('There was an error in the validation: \"activityName\" length must be less than or equal to 30 characters long');
  });
  test('should respond with a 400 status, server error', async () => {
    jest.spyOn(Activity, 'create').mockResolvedValue(null);
    const response = await request(app).post('/api/activities').send(mockActivity);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('Activity could not be created!');
    expect(response.body.data).toEqual({});
  });
  test('should respond with a 500 status, server error', async () => {
    jest.spyOn(Activity, 'create').mockRejectedValue(new Error('Something went wrong'));
    const response = await request(app).post('/api/activities').send(mockActivity);
    expect(response.status).toBe(500);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  });
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
    expect(response.body.data).toBeUndefined();
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
  });
});
describe('POST /api/activities/', () => {
  test('should create a new activity and return a status 201', async () => {
    const response = await request(app).post('/api/activities').send(mockActivity);
    expect(response.status).toBe(201);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe('Activity created successfully!');
  });

  test('should return status 400, send data empty', async () => {
    const response = await request(app).post('/api/activities').send(mockActivityEmpty);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    // eslint-disable-next-line
    expect(response.body.message).toBe('There was an error in the validation: \"activityName\" is required');
  });
  test('should return status 400, send data without a data', async () => {
    const response = await request(app)
      .post('/api/activities');
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    // eslint-disable-next-line
    expect(response.body.message).toBe('There was an error in the validation: \"activityName\" is required');
  });
  test('should return status 400, send data with bad inputs', async () => {
    const response = await request(app)
      .post('/api/activities')
      .send(mockActivityBadValidations);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    // eslint-disable-next-line
    expect(response.body.message).toBe('There was an error in the validation: \"activityName\" length must be less than or equal to 30 characters long');
  });
  test('should respond with a 400 status, server error', async () => {
    jest.spyOn(Activity, 'create').mockResolvedValue(null);
    const response = await request(app).post('/api/activities').send(mockActivity);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('Activity could not be created!');
    expect(response.body.data).toEqual({});
  });
  test('should respond with a 500 status, server error', async () => {
    jest.spyOn(Activity, 'create').mockRejectedValue(new Error('Something went wrong'));
    const response = await request(app).post('/api/activities').send(mockActivity);
    expect(response.status).toBe(500);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  });
});
