const request = require('supertest');
const { equal } = require('assert');
const { app } = require('../../src/app');
const { User } = require('../../src/models/user.model');

describe('POST /user/signin', () => {
    beforeEach('Sign up for test', async () => {
        const body = {
            email: 'teo1@gmail.com',
            password: '123',
            name: 'Teo Nguyen'
        };
        await request(app).post('/user/signup').send(body);
    });

    it('Can sign in', async () => {
        const body = {
            email: 'teo1@gmail.com',
            password: '123'
        };
        const response = await request(app).post('/user/signin').send(body);
        const { success, user } = response.body;
        console.log(response.body);
        equal(success, true);
        equal(user.name, 'Teo Nguyen');
    });

    it('Cannot sign in with invalid password', async () => {
        const body = {
            email: 'teo1@gmail.com',
            password: '1234'
        };
        const response = await request(app).post('/user/signin').send(body);
        const { success, user, message } = response.body;
        equal(success, false);
        equal(user, undefined);
        equal(message, 'INVALID_USER_INFO');
    });
});
