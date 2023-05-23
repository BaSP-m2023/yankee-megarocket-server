import request from 'supertest';
import app from '../app';
import Member from '../models/Member';
import memberSeed from '../seeds/members';

beforeEach(async () => {
  await Member.collection.insertMany(memberSeed);
});

afterEach(async () => {
  await Member.collection.deleteMany();
});

const mockMemberSeed = memberSeed[0]._id;
const mockMemberGood = {
  firstName: 'Juan',
  lastName: 'Perez',
  dni: 41317666,
  email: 'testeando@Radium.com',
  phone: 1763060997,
  password: 'd9vUeOyuKs',
};
const mockMemberEmpty = {
};
const mockMemberBadValidations = {
  firstName: 23,
  lastName: 'Perezaaaaaaaaaaaaaaaaaasssssssssssssssssssassadsasdaaaaaa',
  dni: '41317666',
  email: 'testeandoRadium.com',
  phone: 176306099700000000,
  password: 'd9vUeOyuKsasdasd@',
};
const mockIdBad = '64691519333281ea60b8069a';

describe('GET /api/members', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/api/members').send();
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBeGreaterThanOrEqual(1);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe('Members found successfully!:');
  });
  test('should return status 404', async () => {
    await Member.collection.deleteMany();
    const response = await request(app).get('/api/members').send();
    expect(response.body.error).toBeTruthy();
    expect(response.status).toBe(404);
    expect(response.body.data.length).toBe(0);
    expect(response.body.message).toBe('There are no members!');
  });
  test('should respond with a 500 status, server error', async () => {
    jest.spyOn(Member, 'find').mockRejectedValue(new Error('Something went wrong'));
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
    expect(response.body.data).toEqual({});
    expect(response.body.message).toBe('This is not a valid object Id');
  });
  test('should return status 400, send invalid id', async () => {
    const response = await request(app).get(`/api/members/${mockMemberBadValidations.phone}`).send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toEqual({});
    expect(response.body.message).toBe('This is not a valid object Id');
  });
  test('should return status 404, send valid id but without member', async () => {
    const response = await request(app).get(`/api/members/${mockIdBad}`).send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toEqual({});
    expect(response.body.message).toBe('Member with id: 64691519333281ea60b8069a not found!');
  });
  test('should return status 200', async () => {
    const response = await request(app).get(`/api/members/${mockMemberSeed}`).send();
    expect(response.status).toBe(200);
    /* eslint no-underscore-dangle: 0 */
    expect(response.body.data._id).toBe(mockMemberSeed.toString());
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe('Member found successfully!');
  });
  test('should respond with a 500 status, server error', async () => {
    jest.spyOn(Member, 'findById').mockRejectedValue(new Error('Something went wrong'));
    const response = await request(app).get(`/api/members/${mockMemberSeed}`).send();
    expect(response.status).toBe(500);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toEqual({});
  });
});

describe('post /api/members', () => {
  test('should return status 201', async () => {
    const response = await request(app)
      .post('/api/members/')
      .send(mockMemberGood);
    expect(response.status).toBe(201);
    expect(response.body.data.dni).toBe(mockMemberGood.dni);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe('Member created successfully!');
  });
  test('should return status 400, send data empty', async () => {
    const response = await request(app)
      .post('/api/members')
      .send(mockMemberEmpty);
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
      .send(mockMemberBadValidations);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBe(undefined);
    // eslint-disable-next-line
    expect(response.body.message).toBe('There was an error in the validation: \"firstName\" must be a string');
  });
  test('should respond with a 400 status, server error', async () => {
    jest.spyOn(Member, 'create').mockResolvedValue(null);
    const response = await request(app).post('/api/members/').send(mockMemberGood);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('Member could not be created!');
    expect(response.body.data).toEqual({});
  });
  test('should respond with a 500 status, server error', async () => {
    jest.spyOn(Member, 'create').mockRejectedValue(new Error('Something went wrong'));
    const response = await request(app).post('/api/members/').send(mockMemberGood);
    expect(response.status).toBe(500);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toEqual({});
  });
});
