import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import Nav from 'react-bootstrap/Nav';
import PropTypes from 'prop-types';

export const Logout = ({ logout }) => {
  return <Nav.Link onClick={logout}>Logout</Nav.Link>;
};

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(Logout);
