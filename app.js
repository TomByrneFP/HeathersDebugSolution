const express = require('express');
const cors = require('cors')
const teacherRoutes = require('./routes/teachers');
const studentRoutes = require('./routes/students');
const app = express();

// Middleware
app.use(cors())
app.use(express.json());

// Routes
app.use('/teachers', teacherRoutes);
app.use('/students', studentRoutes);
app.get('/', (req, res) => {
    res.send('Welcome to my Candy Store')
})
module.exports = app;

