import React from 'react';
import { Container, Navbar, Nav, Image } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'
import { FiPlus } from 'react-icons/fi';
const NavBar = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Navbar.Brand href="#home">GitTuwaiq</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/issues">
              <Nav.Link>Issues</Nav.Link>
              </LinkContainer>
      {/* <Nav.Link href="#pricing">Pricing</Nav.Link>
      <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown> */}
    </Nav>
    <Nav>
      {/* <Nav.Link href="#deets">More deets</Nav.Link>
      <Nav.Link eventKey={2} href="#memes">
        Dank memes
      </Nav.Link> */}
      <FiPlus style={{color: "white",marginTop:"20px", marginRight: "10px"}}/>
      <Image width="50" src="https://i.pinimg.com/originals/26/36/7b/26367b882196bab0348c173ec61d9268.gif" roundedCircle />
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
    );
}

export default NavBar;