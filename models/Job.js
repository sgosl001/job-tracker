const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const JobSchema = new Schema({
  company: {
    type: String,
    required: true
  },
  position: {
    type: String,
  },
  link: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Item = mongoose.model('job', JobSchema);