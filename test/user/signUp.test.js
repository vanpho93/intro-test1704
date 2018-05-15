const request = require('supertest');
const { equal } = require('assert');
const { app } = require('../../src/app');

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
        console.log(response.body);
    });
});
