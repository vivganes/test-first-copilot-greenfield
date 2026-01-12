const express = require('express');
const cors = require('cors');
const app = express();

const PORT = 8080;

app.use(cors());
app.use(express.json());

app.get('/hello', (req, res) => {
  res.json({
    message: 'Hello, world!'
  });
});

app.post('/api/v1/users/register', (req, res) => {
  const { name, email, password, phoneNumber, address } = req.body;

  // Simple validation
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields'
    });
  }

  // Simulate successful registration
  res.json({
    success: true,
    message: 'Registration successful',
    userId: 'user_' + Date.now()
  });
});

// add more routes as needed

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});