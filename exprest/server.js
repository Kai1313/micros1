const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Routes
const route = require('./routes/route');
app.use('/users', route);

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
