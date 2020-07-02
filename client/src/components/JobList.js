import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { deleteJob, getJobs } from '../actions/jobActions';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import Jumbotron from 'react-bootstrap/Jumbotron';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';

const JobList = props => {
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState('');

  const nextPage = () => {
    setSkip(skip + limit);
  };

  const previousPage = () => {
    setSkip(skip - limit);
  };

  useEffect(() => {
    props.getJobs(limit, skip, search);
  }, [props.getJobs, props.isAuthenticated, skip, limit, search]);

  const handleDelete = id => {
    props.deleteJob(id);
  };

  const handleChange = e => {
    console.log(e.target.value);
    setSearch(e.target.value);
    console.log(props.jobs);
  };

  const { jobs } = props.jobs;

  return (
    <>
      {!props.isAuthenticated && (
        <Jumbotron>
          <h4 className='mx-auto text-center'>
            Please Login or Register to Get Started!
          </h4>
        </Jumbotron>
      )}
      {props.isAuthenticated && (
        <>
          <Form onChange={handleChange}>
            <Form.Control placeholder='Find by Company' />
          </Form>
          <ListGroup>
            {jobs.map(job => {
              return (
                <Accordion className='w-100 m-0' defaultActiveKey='0'>
                  <Card>
                    <ListGroup.Item key={jobs._id}>
                      <Accordion.Toggle as={Card.Header} eventKey='1'>
                        Job at {job.company} applied on{' '}
                        {job.date.substring(0, 10)}
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey='1'>
                        <Card.Body>
                          <p>Position/Description: {job.position}</p>
                          <a
                            href={job.link}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            Link to Posting
                          </a>
                          <Button
                            className='float-right'
                            variant='danger'
                            onClick={() => handleDelete(job._id)}
                          >
                            Delete
                          </Button>
                        </Card.Body>
                      </Accordion.Collapse>
                    </ListGroup.Item>
                  </Card>
                </Accordion>
              );
            })}
          </ListGroup>
        </>
      )}
      <ButtonGroup size='sm' className='mt-2'>
        <Button disabled={skip === 0} onClick={previousPage}>
          Previous
        </Button>
        <Button disabled={jobs.length < 10} onClick={nextPage}>
          Next
        </Button>
      </ButtonGroup>
    </>
  );
};

JobList.propTypes = {
  jobs: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  jobs: state.jobs,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { deleteJob, getJobs })(JobList);
