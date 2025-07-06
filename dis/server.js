const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Create app
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection (Replace with your own Mongo URI)
mongoose.connect('mongodb://localhost:27017/distributorsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Mongoose schema & model
const distributorSchema = new mongoose.Schema({
  name: String,
  contactNumber: String,
  email: String,
  address: String,
});

const Distributor = mongoose.model('Distributor', distributorSchema);

// Routes
app.get('/api/distributors', async (req, res) => {
  const distributors = await Distributor.find();
  res.json(distributors);
});

app.get('/api/distributors/:id', async (req, res) => {
  const distributor = await Distributor.findById(req.params.id);
  res.json(distributor);
});

app.post('/api/distributors', async (req, res) => {
  const newDistributor = new Distributor(req.body);
  await newDistributor.save();
  res.status(201).json(newDistributor);
});

app.put('/api/distributors/:id', async (req, res) => {
  const updated = await Distributor.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

app.delete('/api/distributors/:id', async (req, res) => {
  await Distributor.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
