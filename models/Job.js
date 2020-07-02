const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const JobSchema = new Schema({
  company: {
    type: String,
    required: true,
    unique: true,
  },
  position: {
    type: String,
  },
  link: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
});

module.exports = Job = mongoose.model('job', JobSchema);
