const express = require('express');
const { json } = require('body-parser');
const { UserService } = require('./services/user.service');

const app = express();
app.use(json());

app.post('/user/signup', async (req, res) => {
    const { email, password, name } = req.body;
    UserService.signUp(email, password, name)
    .then(user => res.send({ success: true, user }))
    .catch(error => res.status(400).send({ success: false, message: 'INVALID_USER_INFO' }));
});

app.post('/user/signin', async (req, res) => {
    const { email, password } = req.body;
    UserService.signIn(email, password)
    .then(user => res.send({ success: true, user }))
    .catch(error => res.status(400).send({ success: false, message: 'INVALID_USER_INFO' }));
});

module.exports = { app };
