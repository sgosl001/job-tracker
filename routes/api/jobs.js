const express = require('express');
const router = new express.Router();
const auth = require('../../middleware/auth');

// Job Model
const Job = require('../../models/Job');

// @route GET     api/jobs
// @description   get ALL jobs
// @access        public
router.get('/', auth, async (req, res) => {
  if (req.query.search) {
    try {
      const jobs = await Job.find({
        company: { $regex: req.query.search },
        owner: req.user.id,
      }).setOptions({
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort: {
          date: 1,
        },
      });
      res.send(jobs);
    } catch (e) {
      res.status(500).send();
    }
  }

  try {
    const jobs = await Job.find({
      owner: req.user.id,
    }).setOptions({
      limit: parseInt(req.query.limit),
      skip: parseInt(req.query.skip),
      sort: {
        date: 1,
      },
    });
    res.send(jobs);
  } catch (e) {
    res.status(500).send();
  }
});

// @route         POST api/jobs
// @description   Create a post
// @access        Privates
router.post('/', auth, (req, res) => {
  const { company, position, link } = req.body;

  if (!company) {
    return res.status(400).json({ msg: 'please enter a name at least' });
  }

  Job.findOne({ company }).then(job => {
    if (job)
      return res.status(400).json({ msg: 'Company name already exists' });

    const newJob = new Job({
      company,
      position,
      link,
      owner: req.user.id,
    });

    newJob.save().then(job => res.json(job));
  });
});

// @route         DELETE api/jobs
// @description   Delete a job
// @access        Private
router.delete('/:id', auth, (req, res) => {
  Job.findOne({ id: req.params._id, owner: req.user.id })
    .then(job => job.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
