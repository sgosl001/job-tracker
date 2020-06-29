import React, { useState } from "react";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { addJob } from "../actions/jobActions";
import { v4 as uuid } from "uuid";

const JobModal = props => {
  const [show, setShow] = useState(false);
  const [company, setCompany] = useState(null);
  const [position, setPosition] = useState(null);
  const [link, setLink] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onChange = field => event => {
    const input = event.target.value;
    field === "company"
      ? setCompany(input)
      : field === "position"
      ? setPosition(input)
      : setLink(input);
  };

  const handleSubmit = e => {
    const newJob = {
      id: uuid(),
      company: company,
      position: position,
      link: link,
    };

    props.addJob(newJob);
    setShow(false);
  };

  const onSubmit = e => {
    e.preventDefault();
  };

  return (
    <div>
      <Button color="dark" onClick={handleShow}>
        Add Job
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>Add To Job List</Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group>
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                name="company"
                onChange={onChange("company")}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                name="position"
                onChange={onChange("position")}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Link To Posting</Form.Label>
              <Form.Control
                type="text"
                name="link"
                onChange={onChange("link")}
              />
            </Form.Group>

            <Button onClick={handleSubmit}>Add Job</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => ({
  jobs: state.jobs,
});

export default connect(mapStateToProps, { addJob })(JobModal);
