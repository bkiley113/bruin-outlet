const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/message', (req, res) => {
    res.json({ message: "test123:"});
});

app.listen(8000, () => {
    console.log('Running on 8000');
});