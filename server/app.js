const express = require("express");
const cors = require('cors');
const app = express();
const expenseRoutes = require('./routes/expenseRoutes');


// Middleware to parse JSON
app.use(express.json());
app.use(cors());




// Use the router
app.use('/api/v2/expense', expenseRoutes);

module.exports = app;