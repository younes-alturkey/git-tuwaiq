import React from "react";
import { Container, Navbar, Nav, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FiPlus } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { VscRepoClone } from "react-icons/vsc";
import Logo from "../assets/img/logo.png";
import { VscSignOut } from "react-icons/vsc";

const NavBar = () => {
  const history = useHistory();

  const signout = () => {
    localStorage.setItem("User", null);
    history.push("/auth");
  };
  return (
    <Navbar
      style={{ fontFamily: "Ubuntu Mono" }}
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
    >
      <Container>
        <LinkContainer
          style={{ cursor: "pointer", textDecoration: "none" }}
          to="/"
        >
          <Navbar.Brand>
            <img
              alt="logo"
              style={{ marginRight: 10 }}
              src={Logo}
              width={32}
              height={32}
            />
            GitTuwaiq
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer style={{ cursor: "pointer" }} to="/issues">
              <Nav.Link>Issues</Nav.Link>
            </LinkContainer>
            <LinkContainer style={{ cursor: "pointer" }} to="/explore">
              <Nav.Link>Explore</Nav.Link>
            </LinkContainer>
            <LinkContainer style={{ cursor: "pointer" }} to="/create">
              <Nav.Link>New</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            <LinkContainer style={{ cursor: "pointer" }} to="/fork">
              <Nav.Link>
                <VscRepoClone
                  style={{
                    color: "white",
                    fontSize: "25px",
                    marginTop: "10px",
                  }}
                />
              </Nav.Link>
            </LinkContainer>
            <LinkContainer style={{ cursor: "pointer" }} to="/create">
              <Nav.Link>
                <FiPlus
                  style={{
                    color: "white",
                    fontSize: "25px",
                    marginTop: "10px",
                  }}
                />
              </Nav.Link>
            </LinkContainer>
            <Nav.Link>
              <VscSignOut
                onClick={() => signout()}
                style={{
                  color: "red",
                  fontSize: "25px",
                  marginTop: "10px",
                  marginRight: "10px",
                }}
              />
            </Nav.Link>
            <LinkContainer style={{ cursor: "pointer" }} to="/profile">
              <Image
                width="50"
                src="https://i.pinimg.com/originals/26/36/7b/26367b882196bab0348c173ec61d9268.gif"
                roundedCircle
              />
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
