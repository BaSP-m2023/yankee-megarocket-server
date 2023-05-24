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

// eslint-disable-next-line
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

describe('put /api/members', () => {
  test('should return status 200', async () => {
    const response = await request(app)
      .put(`/api/members/${mockMemberSeed}`)
      .send(mockMemberGood);
    expect(response.status).toBe(200);
    expect(response.body.data.dni).toBe(mockMemberGood.dni);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe('Member Updated successfully!');
  });
  test('should return status 400, send data empty', async () => {
    const response = await request(app)
      .put(`/api/members/${mockMemberSeed}`)
      .send(mockMemberEmpty);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBe(undefined);
    // eslint-disable-next-line
    expect(response.body.message).toBe('There was an error in the validation: \"firstName\" is required');
  });
  test('should return status 400, valid id without send data', async () => {
    const response = await request(app)
      .put(`/api/members/${mockMemberSeed}`);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBe(undefined);
    // eslint-disable-next-line
    expect(response.body.message).toBe('There was an error in the validation: \"firstName\" is required');
  });
  test('should return status 400, send data with bad inputs', async () => {
    const response = await request(app)
      .put(`/api/members/${mockMemberSeed}`)
      .send(mockMemberBadValidations);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBe(undefined);
    // eslint-disable-next-line
    expect(response.body.message).toBe('There was an error in the validation: \"firstName\" must be a string');
  });
  test('should respond with a 400 status, server error', async () => {
    jest.spyOn(Member, 'findByIdAndUpdate').mockResolvedValue(null);
    const response = await request(app).put(`/api/members/${mockMemberSeed}`).send(mockMemberGood);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('Member could not be found and updated!');
    expect(response.body.data).toEqual({});
  });
  test('should respond with a 500 status, server error', async () => {
    jest.spyOn(Member, 'findByIdAndUpdate').mockRejectedValue(new Error('Something went wrong'));
    const response = await request(app).put(`/api/members/${mockMemberSeed}`).send(mockMemberGood);
    expect(response.status).toBe(500);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toEqual({});
  });
});

describe('delete /api/members', () => {
  test('should return status 400, send valid id but doesnt exist', async () => {
    const response = await request(app)
      .delete(`/api/members/${mockIdBad}`)
      .send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('Member could not be found and deleted!');
    expect(response.body.data).toEqual({});
  });
  test('should return status 400, send invalid id', async () => {
    const response = await request(app)
      .delete('/api/members/asdas3123asd')
      .send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('Member could not be found and deleted!');
    expect(response.body.data).toEqual({});
  });
  test('should return status 200', async () => {
    const response = await request(app)
    // eslint-disable-next-line
      .delete(`/api/members/${memberSeed[1]._id}`)
      .send();
    expect(response.status).toBe(200);
    expect(response.body.data.dni).toBe(mockMemberGood.dni);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe('Member Deleted successfully!');
  });
  test('should respond with a 400 status, server error', async () => {
    jest.spyOn(Member, 'findByIdAndDelete').mockResolvedValue(null);
    const response = await request(app).delete(`/api/members/${mockMemberSeed}`).send(mockMemberGood);
    expect(response.status).toBe(400);
    expect(response.body.data).toEqual({});
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('Member could not be found and deleted!');
  });
  test('should respond with a 500 status, server error', async () => {
    jest.spyOn(Member, 'findByIdAndDelete').mockRejectedValue(new Error('Something went wrong'));
    const response = await request(app).delete(`/api/members/${mockMemberSeed}`).send(mockMemberGood);
    expect(response.status).toBe(500);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toEqual({});
  });
});
