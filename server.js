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

// CREATE
app.post('/users', (req, res) => {
  User.create({
    name: req.body.newData.name,
    email: req.body.newData.email,
    password: req.body.newData.password,
  }, (err, data) => {
    if (err) {
      res.json({
        success: true,
        message: err
      });
    } else if (!data) {
      res.json({
        success: false,
        message: 'Not Found'
      })
    } else {
      res.json({
        success: true,
        data
      });
    }
  });
})

app.route('/users/:id')
// READ
.get((req, res) => {
  User.findById(req.params.id, (err, data) => {
    if (err) {
      res.json({
        success: false,
        message: err
      })
    } else if (!data) {
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
  });
})
// UPDATE
.put((req, res) => {
  User.findByIdAndUpdate(
    req.params.id, {
      name:req.body.newData.name,
      email:req.body.newData.email,
      password:req.body.newData.password
    }, {
      new: true
    }, (err,data) => {
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
  )
})
// DELETE
.delete((req,res)=>{
  // User.findByIdAndDelete()
})