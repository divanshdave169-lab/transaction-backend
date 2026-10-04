const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

let entries = [];

app.get('/api/entries', (req, res) => {
  res.json(entries);
});

app.post('/api/entries', (req, res) => {
  const newEntry = {
    id: req.body.id || Date.now().toString(),
    category: req.body.category,
    amount: req.body.amount,
    timestamp: req.body.timestamp || new Date().toISOString(),
  };
  entries.push(newEntry);
  res.status(201).json({ success: true, entry: newEntry });
});

app.post('/api/webhook/payment', (req, res) => {
  const { amount, category, status } = req.body;

  if (status === 'SUCCESS') {
    const paymentEntry = {
      id: Date.now().toString(),
      category: category || 'Rahul Side',
      amount: parseFloat(amount),
      timestamp: new Date().toISOString(),
    };
    entries.push(paymentEntry);
  }

  res.status(200).json({ received: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
