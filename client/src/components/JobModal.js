import React, { useState, useEffect, useRef } from 'react';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { addJob } from '../actions/jobActions';
import PropTypes from 'prop-types';
import { clearErrors } from '../actions/errorActions';
import Alert from 'react-bootstrap/Alert';

const JobModal = props => {
  const [show, setShow] = useState(false);
  const [company, setCompany] = useState(null);
  const [position, setPosition] = useState(null);
  const [link, setLink] = useState(null);
  const [msg, setMsg] = useState(null);

  const handleClose = () => {
    clearErrors();
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const onChange = field => event => {
    const input = event.target.value;
    field === 'company'
      ? setCompany(input)
      : field === 'position'
      ? setPosition(input)
      : setLink(input);
  };

  const handleSubmit = e => {
    const newJob = {
      company: company,
      position: position,
      link: link,
    };

    props.addJob(newJob);
  };

  const onSubmit = e => {
    e.preventDefault();
  };

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const prevError = usePrevious(props.error);

  useEffect(() => {
    if (props.error !== prevError) {
      if (props.error.id === 'ADD_FAIL') {
        setMsg(props.error.msg.msg);
      } else {
        setMsg(null);
      }
    }

    if (show) {
      if (props.isAdded) {
        handleClose();
      }
    }
  }, [props.error, props.isAdded, props.jobs]);

  return (
    <>
      <Button
        disabled={!props.isAuthenticated}
        className='w-100 mb-3'
        color='dark'
        onClick={handleShow}
      >
        Add Job
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>Add To Job List</Modal.Header>
        <Modal.Body>
          {msg && <Alert variant='danger'>{msg}</Alert>}
          <Form onSubmit={onSubmit}>
            <Form.Group>
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type='text'
                name='company'
                onChange={onChange('company')}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Position/Description</Form.Label>
              <Form.Control
                type='text'
                name='position'
                onChange={onChange('position')}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Link To Posting</Form.Label>
              <Form.Control
                type='text'
                name='link'
                onChange={onChange('link')}
              />
            </Form.Group>

            <Button onClick={handleSubmit}>Add Job</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

JobModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
  isAdded: PropTypes.bool,
  jobs: PropTypes.object,
};

const mapStateToProps = state => ({
  jobs: state.jobs,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  isAdded: state.jobs.isAdded,
});

export default connect(mapStateToProps, { addJob, clearErrors })(JobModal);
