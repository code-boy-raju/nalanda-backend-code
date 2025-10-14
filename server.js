require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded())

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/books', require('./routes/books'));
app.use('/api/borrow', require('./routes/borrow'));
app.use('/api/reports', require('./routes/reports'));

app.get('/', (req, res) => res.send({ ok: true, message: 'Nalanda API' }));

const PORT = process.env.PORT || 4040;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
