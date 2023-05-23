import request from 'supertest';
import app from '../app';
import Class from '../models/Class';
import classeSeed from '../seeds/classes';

// const mockClass = {
//   activityId: '646939540b3782bf437c381v',
//   hour: 16,
//   day: 'Monday',
//   trainerId: '64693b580b3782bf437c3829',
//   maxCapacity: 11,
// };
// let mockClassId;

beforeEach(async () => {
  await Class.collection.insertMany(classeSeed);
});

afterEach(async () => {
  await Class.collection.deleteMany();
});

describe('GET /api/classes', () => {
  test('should return status 200 and valid JSON response', async () => {
    const response = await request(app).get('/api/classes').send();
    console.log(response);
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe('Classes found successfully!');
  });

  // test('should return status 404 for invalid route', async () => {
  //   const response = await request(app).get('/api/classes/invalid').send();
  //   expect(response.status).toBe(404);
  // });
});

// describe('POST /api/classes/', () => {
//   test('should create a new class and return a status 201', async () => {
//     const response = await request(app).post('/api/classes/').send(mockClass);
//     expect(response.status).toBe(201);
//     mockClassId = response.body.data_id;
//   });
// });

// describe('GET BY ID /api/classes/:id', () => {
//   test('should return status 200', async () => {
//     const response = await request(app).get(`/api/classes/${mockClassId}`).send();
//     expect(response.status).toBe(200);
//     expect(response.error).toBeFalsy();
//   });
//   test('should return status 404', async () => {
//     const response = await request(app).get('/api/classes/invalid').send();
//     expect(response.status).toBe(404);
//   });
// });
