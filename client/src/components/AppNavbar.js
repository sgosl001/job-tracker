import React, { useState } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'


const AppNavbar = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <Navbar bg="dark" expand="sm" variant="dark" className="mb-5">
        <Navbar.Brand href="/">Job Tracker</Navbar.Brand>
        <Navbar.Toggle onClick={toggle} />
        <Navbar.Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <Nav.Item>
              <Nav.Link href="https://github.com/sgosl001/job-tracker">
                Github
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}


export default AppNavbar;