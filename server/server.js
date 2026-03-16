// const app = require('./app');
// require('dotenv').config();
// const connectDB = require("./config/db");

// connectDB();

// const port = process.env.PORT || 8001;
// app.listen(port, () => {
//     console.log("Server is running on port", port)
// })

// process.on("SIGINT", async () => {
//     await mongoose.connection.close();
//     server.close(() => {
//         console.log("Server Stopped");
//         process.exit(1);
//     });
// });







/// server.js
require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));