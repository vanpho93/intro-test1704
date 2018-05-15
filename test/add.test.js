const request = require('supertest');
const { app } = require('../src/app');

describe('POST /cong', () => {
    it('Can add 2 numbers', async () => {
        const response = await request(app)
        .post('/cong')
        .send({ soA: 5, soB: 10 });
        const { success, result } = response.body;
        if (!success) throw new Error('abcd');
        if (result !== 15) throw new Error('abcd');
    });
});
