const express = require('express');
const { json } = require('body-parser');

const app = express();
app.use(json());

app.post('/cong', (req, res) => {
    const { soA, soB } = req.body;
    if (isNaN(soA) || isNaN(soB)) {
        return res.status(400).send({ success: false, message: 'Invalid input' });
    }
    res.send({ success: true, result: +soA + +soB });
});

module.exports = { app };
