const express = require('express');
const cors = require('cors');
const app = express();

const PORT = 8082;

app.use(cors());
app.use(express.json());

app.get('/hello', (req, res) => {
  res.json({
    message: 'Hello, world!'
  });
});

// add more routes as needed


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});