const request = require('supertest');
const { equal } = require('assert');
const { app } = require('../../src/app');
const { User } = require('../../src/models/user.model');

describe('POST /user/signup', () => {
    it('Can sign up', async () => {
        const body = {
            email: 'teo1@gmail.com',
            password: '123',
            name: 'Teo Nguyen'
        };
        const response = await request(app)
        .post('/user/signup')
        .send(body);
        const { success, user } = response.body;
        const { email, name, password, _id } = user;
        equal(response.status, 200);
        equal(success, true);
        equal(email, 'teo1@gmail.com');
        equal(name, 'Teo Nguyen');
        const userInDb = await User.findById(_id);
        equal(userInDb.email, 'teo1@gmail.com');
        equal(userInDb.name, 'Teo Nguyen');
    });

    it('Cannot sign up without email', async () => {
        const body = {
            email: '',
            password: '123',
            name: 'Teo Nguyen'
        };
        const response = await request(app)
        .post('/user/signup')
        .send(body);
        const { success, user, message } = response.body;
        equal(response.status, 400);
        equal(success, false);
        equal(user, undefined);
        equal(message, 'INVALID_USER_INFO');
        const userInDb = await User.findOne({});
        equal(userInDb, null);
    });
});
