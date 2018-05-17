const request = require('supertest');
const { equal } = require('assert');
const { app } = require('../../src/app');
const { User } = require('../../src/models/user.model');
const { UserService } = require('../../src/services/user.service');

describe('POST /user/check', () => {
    let token;

    beforeEach('Sign up for test', async () => {
        const user = await UserService.signUp('teo1@gmail.com', '123', 'Teo Nguyen');
        token = user.token;
    });

    it('Can check token', async () => {
        const response = await request(app).
        post('/user/check', {})
        .set({ token });
        const { success, user } = response.body;
        const { name, password, email } = user;
        equal(name, 'Teo Nguyen');
        equal(email, 'teo1@gmail.com');
        equal(password, undefined);
    });

    it('Cannot check with invalid token', async () => {

    });

    it('Cannot check without token', async () => {

    });

    it('Cannot check with removed user\'s token', async () => {

    });
});
