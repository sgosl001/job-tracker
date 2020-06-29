import React, { useEffect } from "react";

import { connect } from "react-redux";
import { deleteJob, getJobs } from "../actions/jobActions";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import PropTypes from "prop-types";
import JobModal from "./JobModal";

const JobList = props => {
  useEffect(() => props.getJobs(), []);

  const handleDelete = id => {
    props.deleteJob(id);
  };

  const { jobs } = props.jobs;

  return (
    <Container>
      <JobModal />
      <ListGroup>
        {jobs.map(job => {
          return (
            <ListGroup.Item key={job.id}>
              {job.company}
              <Button variant="danger" onClick={() => handleDelete(job.id)}>
                Delete
              </Button>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </Container>
  );
};

JobList.propTypes = {
  jobs: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  jobs: state.jobs,
});

export default connect(mapStateToProps, { deleteJob, getJobs })(JobList);
