import request from 'supertest';
import app from '../app';
import Trainer from '../models/Trainer';
import trainerSeed from '../seeds/trainers';

beforeEach(async () => {
  await Trainer.collection.insertMany(trainerSeed);
});

afterEach(async () => {
  await Trainer.collection.deleteMany();
  jest.restoreAllMocks();
});

const mockTrainer = {
  firstName: 'King',
  lastName: 'James',
  dni: 22222222,
  email: 'kingjames@email.com',
  phone: 6563233000,
  password: 'lebron1010',
  rate: 15,
  assignedActivities: ['646939300b3782bf437c381b'],
};

const mockTrainerBadValidations = {
  firstName: 'Kinggggggggggggggggggggggggggggggggggggggggggggggggggggg',
  lastName: 'James',
  dni: 22222222,
  email: 'kingjames.com',
  phone: 6563233000,
  password: 'lebron10@@10',
  rate: 15,
  assignedActivities: ['646939300b3782bf437c381b'],
};
// eslint-disable-next-line
const mockTrainerId = trainerSeed[0]._id;

const notFoundId = '64693b1d0b3782bf437c3821';

const invalidId = '62224693b1d0bx';

describe('GET /api/trainers', () => {
  test('Should return status 200', async () => {
    const response = await request(app).get('/api/trainers').send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe('Trainers found successfully!');
  });

  test('Should return status 404', async () => {
    await Trainer.collection.deleteMany();
    const response = await request(app).get('/api/trainers').send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe('There are no trainers!');
  });

  test('Should return status 500', async () => {
    jest.spyOn(Trainer, 'populate').mockRejectedValue(new Error('Something went wrong'));
    const response = await request(app).get('/api/trainers/').send();
    expect(response.status).toBe(500);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toEqual({});
  });
});

describe('GET /api/trainers/:id', () => {
  test('Should return status 200', async () => {
    const response = await request(app).get(`/api/trainers/${mockTrainerId}`).send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    // eslint-disable-next-line
    expect(response.body.data._id).toBe(mockTrainerId.toString());
    expect(response.body.message).toBe('Trainer found successfully!');
  });

  test('Should return status 404', async () => {
    const response = await request(app).get(`/api/trainers/${notFoundId}`).send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe(`Trainer with id: ${notFoundId} not found!`);
  });

  test('Should return status 400, send invalid Id', async () => {
    const response = await request(app).get(`/api/trainers/${invalidId}`).send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe('This is not a valid object Id');
  });

  test('should return status 400, send no id', async () => {
    const response = await request(app).get('/api/trainers/:id').send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data.length).toBe(undefined);
  });

  test('Should return status 500', async () => {
    jest.spyOn(Trainer, 'populate').mockRejectedValue(new Error('Something went wrong'));
    const response = await request(app).get(`/api/trainers/${mockTrainerId}`).send();
    expect(response.status).toBe(500);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toEqual({});
  });
});

describe('POST /api/trainers/', () => {
  test('Should return status 201', async () => {
    const response = await request(app).post('/api/trainers').send(mockTrainer);
    expect(response.status).toBe(201);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe('Trainer was created successfully!');
  });

  test('Should return status 400', async () => {
    const response = await request(app).post('/api/trainers').send({ firstName: mockTrainer.firstName, lastName: mockTrainer.lastName });
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    // eslint-disable-next-line
    expect(response.body.message).toBe('There was an error: \"dni\" is required'); 
  });

  test('should return status 400, send data with bad inputs', async () => {
    const response = await request(app).post('/api/trainers').send(mockTrainerBadValidations);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBe(undefined);
  });

  test('Should return status 500', async () => {
    jest.spyOn(Trainer, 'create').mockRejectedValue(new Error('Something went wrong'));
    const response = await request(app).post('/api/trainers').send(mockTrainer);
    expect(response.status).toBe(500);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toEqual({});
  });
});

describe('PUT /api/trainers/:id', () => {
  test('Should return status 200, trainer updated', async () => {
    const response = await request(app).put(`/api/trainers/${mockTrainerId}`).send(mockTrainer);
    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe('Trainer updated successfully');
  });

  test('Should respond with a 400 status, Id is invalid', async () => {
    const response = await request(app).put('/api/trainers/5454dgd').send(mockTrainer);
    expect(response.status).toBe(400);
    expect(response.body.data).toEqual({});
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('This is not a valid object Id');
  });

  test('Should respond with a 400 status, Id is not found or non-existent', async () => {
    const response = await request(app).put(`/api/trainers/${notFoundId}`).send(mockTrainer);
    expect(response.status).toBe(400);
    expect(response.body.data).toEqual({});
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('Trainer could not be found and updated!');
  });

  test('Should respond with a 500 status, server error', async () => {
    jest.spyOn(Trainer, 'findByIdAndUpdate').mockRejectedValue(new Error('Something went wrong'));
    const response = await request(app).put(`/api/trainers/${mockTrainerId}`).send(mockTrainer);
    expect(response.status).toBe(500);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toEqual({});
  });
});

describe('DELETE /api/trainers/:id', () => {
  test('Should respond with a  200 status, trainer deleted', async () => {
    const response = await request(app).delete(`/api/trainers/${mockTrainerId}`).send();
    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe('Trainer deleted successfully!');
  });

  test('Should respond with a 400 status, invalid Id', async () => {
    const response = await request(app).delete(`/api/trainers/${invalidId}`).send();
    expect(response.status).toBe(400);
    expect(response.body.data).toEqual({});
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('This is not a valid object Id');
  });

  test('Should respond with a 400 status, trainer could not be found and deleted', async () => {
    await Trainer.deleteMany();
    const response = await request(app).delete(`/api/trainers/${mockTrainerId}`).send();
    expect(response.status).toBe(400);
    expect(response.body.data).toEqual({});
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('Trainer could not be found and deleted!');
  });

  test('Should respond with a 400 status, Id is not found or non-existent', async () => {
    const response = await request(app).delete(`/api/trainers/${notFoundId}`).send(mockTrainer);
    expect(response.status).toBe(400);
    expect(response.body.data).toEqual({});
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('Trainer could not be found and deleted!');
  });

  test('Should respond with a 500 status, server error', async () => {
    jest.spyOn(Trainer, 'findByIdAndDelete').mockRejectedValue(new Error('Something went wrong'));
    const response = await request(app).delete(`/api/trainers/${mockTrainerId}`).send();
    expect(response.status).toBe(500);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toEqual({});
  });
});
