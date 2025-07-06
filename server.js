const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // for parsing application/json

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/soilDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Soil Schema
const soilSchema = new mongoose.Schema({
  location: { type: String, required: true },
  phLevel: { type: Number, required: true },
  moisture: { type: Number, required: true },
  nutrients: { type: String, required: true },
}, { timestamps: true });

const Soil = mongoose.model('Soil', soilSchema);

// Routes

// Create soil detail
app.post('/api/soil', async (req, res) => {
  try {
    const soil = new Soil(req.body);
    await soil.save();
    res.status(201).json(soil);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all soil details
app.get('/api/soil', async (req, res) => {
  try {
    const soils = await Soil.find();
    res.json(soils);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get soil detail by ID
app.get('/api/soil/:id', async (req, res) => {
  try {
    const soil = await Soil.findById(req.params.id);
    if (!soil) return res.status(404).json({ message: 'Soil not found' });
    res.json(soil);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update soil detail
app.put('/api/soil/:id', async (req, res) => {
  try {
    const updatedSoil = await Soil.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedSoil) return res.status(404).json({ message: 'Soil not found' });
    res.json(updatedSoil);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete soil detail
app.delete('/api/soil/:id', async (req, res) => {
  try {
    const deletedSoil = await Soil.findByIdAndDelete(req.params.id);
    if (!deletedSoil) return res.status(404).json({ message: 'Soil not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
