import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'


const AppNavbar = () => {

  return (
    <div>
      <Navbar bg="dark" expand="sm" variant="dark" className="mb-5">
        <Navbar.Brand href="/">Job Tracker</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Item>
            <Nav.Link href="https://github.com/sgosl001/job-tracker">
              Github
              </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>
    </div>
  )
}


export default AppNavbar;