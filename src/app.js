const express = require('express');
const { json } = require('body-parser');
const { User } = require('./models/user.model');

const app = express();
app.use(json());

app.post('/user/signup', async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const user = new User({ email, password, name });
        await user.save();
        res.send({ success: true, user });
    } catch (error) {
        res.status(400).send({ success: false, message: 'INVALID_USER_INFO' });
    }
});

app.post('/user/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (!user) throw new Error('INVALID_USER_INFO');
        res.send({ success: true, user });
    } catch (error) {
        res.status(400).send({ success: false, message: 'INVALID_USER_INFO' });
    }
});

module.exports = { app };
