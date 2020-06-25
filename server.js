const express = require('express');
const mongoose = require('mongoose');

const jobs = require('./routes/api/jobs');

const app = express();

app.use(express.json());

// DB config
const db = require('./config/keys').mongoURI;

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

//connect to mongo
mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

//use routes
app.use('/api/jobs', jobs)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on port ${port}`));