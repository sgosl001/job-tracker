const express = require('express');
const router = express.Router();

// Job Model
const Job = require('../../models/Job');

// @route GET     api/jobs
// @description   get ALL jobs
// @access        public
router.get('/', (req, res) => {
  Job.find()
    .sort({ date: -1 })
    .then(jobs => res.json(jobs));
});

// @route         POST api/jobs
// @description   Create a post
// @access        public
router.post('/', (req, res) => {
  const newJob = new Job({
    company: req.body.company,
    position: req.body.position,
    link: req.body.link,
  });

  newJob.save().then(job => res.json(job));
});

// @route         DELETE api/jobs
// @description   Delete a job
// @access        public
router.delete('/:id', (req, res) => {
  Item.findById(req.params.id).then(item =>
    item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});


module.exports = router;