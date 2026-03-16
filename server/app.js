// const express = require("express");
// const cors = require('cors');
// const app = express();
// const expenseRoutes = require('./routes/expenseRoutes');


// // Middleware to parse JSON
// app.use(express.json());
// app.use(cors());




// // Use the router
// app.use('/api/v2/expense', expenseRoutes);

// module.exports = app;






// app.js
// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Expense Schema
// const expenseSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   amount: { type: Number, required: true },
//   category: { type: String, required: true },
//   date: { type: Date, default: Date.now }
// });

// const Expense = mongoose.model('Expense', expenseSchema);

// // Routes

// // Get all expenses
// app.get('/api/v2/expense', async (req, res) => {
//   try {
//     const expenses = await Expense.find().sort({ date: -1 });
//     res.json(expenses);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Add new expense
// app.post('/api/v2/expense', async (req, res) => {
//   const { title, amount, category } = req.body;
//   const expense = new Expense({ title, amount, category });
//   try {
//     const savedExpense = await expense.save();
//     res.status(201).json(savedExpense);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Delete expense
// app.delete('/api/v2/expense/:id', async (req, res) => {
//   try {
//     const deleted = await Expense.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ message: 'Expense not found' });
//     res.json({ message: 'Expense deleted' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Update expense
// app.put('/api/v2/expense/:id', async (req, res) => {
//   try {
//     const updated = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
//     if (!updated) return res.status(404).json({ message: 'Expense not found' });
//     res.json(updated);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Test route
// app.get('/', (req, res) => {
//   res.send('Expenses Tracker API is running!');
// });

// module.exports = app;















// app.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // This is important for POST body parsing

// Expense Schema
const expenseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const Expense = mongoose.model('Expense', expenseSchema);

// ===== ROUTES ===== //

// Test route
app.get('/', (req, res) => {
  res.send('Expenses Tracker API is running!');
});

// GET all expenses
app.get('/api/v2/expense', async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new expense
app.post('/api/expenses', async (req, res) => {
  const { title, amount, category } = req.body;
  const expense = new Expense({ title, amount, category });
  try {
    const savedExpense = await expense.save();
    res.status(201).json(savedExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE expense
app.delete('/api/v2/expense/:id', async (req, res) => {
  try {
    const deleted = await Expense.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Expense not found' });
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE expense
app.put('/api/v2/expense/:id', async (req, res) => {
  const { title, amount, category } = req.body;
  if (!title || !amount || !category) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const updated = await Expense.findByIdAndUpdate(
      req.params.id,
      { title, amount, category },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: 'Expense not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = app;