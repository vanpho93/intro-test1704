const request = require('supertest');
const { equal } = require('assert');
const { app } = require('../src/app');

describe('POST /cong', () => {
    it('Can add 2 numbers', async () => {
        const response = await request(app)
        .post('/cong')
        .send({ soA: 5, soB: 10 });
        const { success, result } = response.body;
        equal(success, true);
        equal(result, 15);
    });

    it('Can add a string with a number', async () => {
        const response = await request(app)
        .post('/cong')
        .send({ soA: 'x', soB: 10 });
        const { success, message, result } = response.body;
        equal(success, false);
        equal(message, 'Invalid input');
        equal(result, undefined);
    });
});
