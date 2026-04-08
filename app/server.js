require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const todoRoutes = require('./routes/todoRoutes');
const errorHandler = require('./middlewares/errorHandler');

// Connect to Database
connectDB();

const app = express();

// Body Parser
app.use(express.json());

// Routes
app.use('/api/todos', todoRoutes);

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});