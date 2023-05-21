import request from 'supertest';
import app from '../app';
import Trainer from '../models/Trainer';
import trainerSeed from '../seeds/trainers';

// const mockTrainer = {
//   firstName: 'King',
//   lastName: 'James',
//   dni: 22222222,
//   email: 'kingjames@email.com',
//   phone: 6563233000,
//   password: 'lebron1010',
//   rate: 15,
//   assignedActivities: ['646939300b3782bf437c381b'],
// };

beforeAll(async () => {
  await Trainer.collection.insertMany(trainerSeed);
});

describe('GET /api/trainers', () => {
  test('Should return status 200', async () => {
    const response = await request(app).get('/api/trainers').send();
    expect(response.status).toBe(200);
  });

  test('Should return status 404', async () => {
    const response = await request(app).get('/api/trainer').send();
    expect(response.status).toBe(404);
  });
});
