const express = require('express');
const serverless = require('serverless-http');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const { connectToDatabase, User } = require('./db');

const app = express();
app.use(bodyParser.json());

const SECRET_KEY = 'your-secret-key';

app.post('/register', async (req, res) => {
    await connectToDatabase();
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error registering user', error });
    }
});

app.post('/login', async (req, res) => {
    await connectToDatabase();
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid password' });
    }
    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to authenticate token' });
        }
        req.user = decoded;
        next();
    });
};

app.get('/hello', (req, res) => {
    res.json({ message: `Hello World! New Git Action Deployment` });
});

app.get('/validate', verifyToken, (req, res) => {
    res.json({ message: `Hello, ${req.user.username}` });
});

module.exports.handler = serverless(app);
