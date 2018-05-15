process.env.NODE_ENV = 'test';
const { User } = require('../src/models/user.model');

require('../src/helpers/connectDatabase');

beforeEach('Remove all data for testing', async () => {
    await User.remove({});
});
