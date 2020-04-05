const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = 5000;
const app = express();
const User = require('./models/User');

mongoose.connect('mongodb://localhost/user_data', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
app.use(bodyParser.json());

app.listen(PORT, () => console.log(`Server is listening on port:${PORT}`))

// CREATE
app.post('/users', (req,res) => {
  // User.create()
})

app.route('/users/:id')
// READ
.get((req,res)=>{
  // User.findById()
})
// UPDATE
.put((req,res)=>{
  // User.findByIdAndUpdate()
})
// DELETE
.delete((req,res)=>{
  // User.findByIdAndDelete()
})