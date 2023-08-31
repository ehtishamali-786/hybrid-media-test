const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());


mongoose.connect('mongodb://localhost:27017/worksheetsDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const worksheetSchema = new mongoose.Schema({
  questions: Array
});

const Worksheet = mongoose.model('Worksheet', worksheetSchema);

app.post('/api/save-worksheet', (req, res) => {
  const newWorksheet = new Worksheet({
    questions: req.body.questions
  });
  newWorksheet.save()
    .then(() => res.json({ message: "Worksheet saved successfully!" }))
    .catch(err => res.status(400).json('Error: ' + err));
});

app.get('/api/fetch-worksheet', (req, res) => {
  Worksheet.find()
    .then(worksheet => {
      res.json(worksheet)
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
