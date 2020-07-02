import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import RegisterModal from './auth/RegisterModal';
import Logout from './auth/Logout';
import LoginModal from './auth/LoginModal';

const AppNavbar = ({ isAuthenticated, user }) => {
  const authLinks = (
    <>
      <Nav.Item>
        <span className='navbar-text mr-3'>
          <strong>{user ? `Welcome ${user.name}` : ''}</strong>
        </span>
      </Nav.Item>
      <Nav.Item>
        <Logout />
      </Nav.Item>
    </>
  );

  const guestLinks = (
    <>
      <Nav.Item>
        <RegisterModal />
      </Nav.Item>
      <Nav.Item>
        <LoginModal />
      </Nav.Item>
    </>
  );

  return (
    <>
      <Navbar bg='dark' expand='sm' variant='dark' className='mb-5'>
        <Navbar.Brand href='/'>Job Tracker</Navbar.Brand>
        <Nav className='ml-auto'>
          {isAuthenticated ? authLinks : guestLinks}
        </Nav>
      </Navbar>
    </>
  );
};

AppNavbar.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, null)(AppNavbar);
