import React, { useState, useEffect, useRef } from 'react';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import Alert from 'react-bootstrap/Alert';
import { clearErrors } from '../../actions/errorActions';

const RegisterModal = ({ isAuthenticated, error, register, clearErrors }) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
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
    field === 'name'
      ? setName(input)
      : field === 'email'
      ? setEmail(input)
      : setPassword(input);
  };

  const handleSubmit = e => {
    const newUser = {
      name: name,
      email: email,
      password: password,
    };

    register(newUser);
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

  const prevError = usePrevious(error);

  useEffect(() => {
    if (error !== prevError) {
      if (error.id === 'REGISTER_FAIL') {
        setMsg(error.msg.msg);
      } else {
        setMsg(null);
      }
    }

    if (show) {
      if (isAuthenticated) {
        handleClose();
      }
    }
  }, [error, isAuthenticated]);

  return (
    <div>
      <Nav.Link onClick={handleShow}>Register</Nav.Link>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>Register</Modal.Header>
        <Modal.Body>
          {msg && <Alert variant='danger'>{msg}</Alert>}
          <Form onSubmit={onSubmit}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='text'
                name='name'
                onChange={onChange('name')}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='text'
                name='email'
                onChange={onChange('email')}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                name='password'
                onChange={onChange('password')}
              />
            </Form.Group>

            <Button onClick={handleSubmit}>Register</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

RegisterModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { register, clearErrors })(
  RegisterModal
);
