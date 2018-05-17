const express = require('express');
const { json } = require('body-parser');
const { UserService } = require('./services/user.service');

const app = express();
app.use(json());

app.post('/user/signup', async (req, res) => {
    const { email, password, name } = req.body;
    UserService.signUp(email, password, name)
    .then(user => res.send({ success: true, user }))
    .catch(error => {
        res
            .status(error.statusCode || 500)
            .send({ success: false, message: error.message });
        if (!error.statusCode) console.log(error);
    });
});

app.post('/user/signin', async (req, res) => {
    const { email, password } = req.body;
    UserService.signIn(email, password)
    .then(user => res.send({ success: true, user }))
    .catch(error => {
        res
            .status(error.statusCode || 500)
            .send({ success: false, message: error.message });
        if (!error.statusCode) console.log(error);
    });
});

app.post('/user/check', async (req, res) => {
    const { token } = req.headers;
    UserService.check(token)
    .then(user => res.send({ success: true, user }))
    .catch(error => {
        res
            .status(error.statusCode || 500)
            .send({ success: false, message: error.message });
        if (!error.statusCode) console.log(error);
    });
});

module.exports = { app };
