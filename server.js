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
  useFindAndModify: false,
});
app.use(bodyParser.json());

app.listen(PORT, () => console.log(`Server is listening on port:${PORT}`))

const sendResponse = (res, err, data) => {
  if (err){
    res.json({
      success: false,
      message: err
    })
  } else if (!data){
    res.json({
      success: false,
      message: "Not Found"
    })
  } else {
    res.json({
      success: true,
      data: data
    })
  }
}

// CREATE
app.post('/users', (req, res) => {
  User.create({
    ...req.body.newData
  }, (err, data) => sendResponse(res, err, data));
})

app.route('/users/:id')
// READ
.get((req, res) => {
  User.findById(req.params.id, (err, data) => sendResponse(res, err, data));
})
// UPDATE
.put((req, res) => {
  User.findByIdAndUpdate(
    req.params.id, {
      ...req.body.newData
    }, {
      new: true
    }, (err,data) => sendResponse(res, err, data));
})
// DELETE
.delete((req, res) => {
  User.findByIdAndDelete(req.params.id, (err,data) => sendResponse(res, err, data));
})