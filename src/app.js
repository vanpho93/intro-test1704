const express = require('express');
const { json } = require('body-parser');
const { UserService } = require('./services/user.service');
const { StoryService } = require('./services/story.service');
const { verify } = require('./helpers/jwt');

const app = express();
app.use(json());

app.post('/user/signup', (req, res) => {
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

app.post('/user/signin', (req, res) => {
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

app.post('/user/check', (req, res) => {
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

app.get('/story', (req, res) => {
    StoryService.getAllStories()
    .then(stories => res.send({ success: true, stories }))
    .catch(error => {
        res
            .status(error.statusCode || 500)
            .send({ success: false, message: error.message });
        if (!error.statusCode) console.log(error);
    });
});

async function mustBeUser(req, res, next) {
    try {
        const { token } = req.headers;
        const { _id } = await verify(token);
        req.idUser = _id;
        next();
    } catch (error) {
        res.status(400).send({ success: false, message: 'INVALID_TOKEN' });
    }
}

app.use(mustBeUser);

app.put('/story/:idStory', (req, res) => {
    const { params, body } = req;
    StoryService.updateStory(req.idUser, params.idStory, body.content)
    .then(story => res.send({ success: true, story }))
    .catch(error => {
        res
            .status(error.statusCode || 500)
            .send({ success: false, message: error.message });
        if (!error.statusCode) console.log(error);
    });
});

app.post('/story', (req, res) => {
    StoryService.createStory(req.idUser, req.body.content)
    .then(story => res.send({ success: true, story }))
    .catch(error => {
        res
            .status(error.statusCode || 500)
            .send({ success: false, message: error.message });
        if (!error.statusCode) console.log(error);
    });
});

app.delete('/story/:idStory', (req, res) => {
    StoryService.removeStory(req.idUser, req.params.idStory)
    .then(story => res.send({ success: true, story }))
    .catch(error => {
        res
            .status(error.statusCode || 500)
            .send({ success: false, message: error.message });
        if (!error.statusCode) console.log(error);
    });
});

module.exports = { app };
