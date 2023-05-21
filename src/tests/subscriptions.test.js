import request from 'supertest';
import app from '../app';
import Subscription from '../models/Subscription';
import subSeed from '../seeds/subscriptions';

beforeAll(async () => {
  await Subscription.collection.insertMany(subSeed);
});

describe('PUT /api/subscriptions', () => {
  test('should update one subscription', async () => {
    const response = await request(app).put('/api/subscriptions/64694cb404b48dafdecfa44a').send({
      classId: '64694cb404b48dafdecfa12e',
      members: [
        '64655cf22c2d037df75e72dd', '64691789d00ee55da969d212',
      ],
      date: '2023-10-05T03:00:00.000Z',
    });
    expect(response.status).toBe(200);
  });

  test('should send error 400 becasue this ID is invalid', async () => {
    const response = await request(app).put('/api/subscriptions/64694cb404b48dafdecfa123').send({
      classId: '64694cb404b48dafdecfa12e',
      members: [
        '64655cf22c2d037df75e72dd', '64691789d00ee55da969d212',
      ],
      date: '2023-10-05T03:00:00.000Z',
    });
    expect(response.status).toBe(400);
  });
});

describe('DELETE /api/subscriptions', () => {
  test('should delete one subscription', async () => {
    const response = await request(app).delete('/api/subscriptions/64694cb404b48dafdecfa44a').send();
    expect(response.status).toBe(200);
  });

  test('should send 400 error because his ID is invalid', async () => {
    const response = await request(app).delete('/api/subscriptions/64694cb404b48dafdecfa33e').send();
    expect(response.status).toBe(400);
  });
});
