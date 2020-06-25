import React, { useState } from 'react';

import { v4 as uuid } from 'uuid';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup'


const JobList = () => {
  const [jobs, updateJobs] = useState([
    {
      id: uuid(),
      company: "sumsing",
      position: "sumppos",
      link: "peepee.com",
    },

    {
      id: uuid(),
      company: "wee",
      position: "twolow",
      link: "peepoo.com",
    }
  ]);

  const handleAdd = () => {
    const company = prompt('enter company name')
    if (company) {
      updateJobs([...jobs, { id: uuid(), company: company }])
    }
  }

  const handleDelete = (id) => {
    updateJobs(jobs.filter(job => job.id !== id))
  }

  return (
    <Container>
      <Button
        color="dark"
        onClick={handleAdd}
      >
        Add Job
      </Button>

      <ListGroup>
        {jobs.map(job => {
          return (
            <ListGroup.Item key={job.id}>
              {job.company}
              <Button variant="danger" onClick={() => handleDelete(job.id)}>Delete</Button>
            </ListGroup.Item>
          )
        })}
      </ListGroup>
    </Container>
  )
}

export default JobList;