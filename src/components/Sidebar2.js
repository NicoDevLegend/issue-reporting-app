import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUser } from "@fortawesome/free-solid-svg-icons";

export default function SideBar() {
  return (
    <Navbar
      bg="dark"
      variant="dark"
      className="d-flex flex-column flex-shrink-0 p-3"
      style={{ width: "280px" }}
    >
      <Navbar.Brand
        href="#home"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        React-Bootstrap
      </Navbar.Brand>
      <hr></hr>
      <Nav
        variant="pills"
        className="flex-column mb-auto text-start"
        as="ul"
        style={{ width: "250px" }}
      >
        <Nav.Item as="li">
          <LinkContainer to="/">
            <Nav.Link
              className="text-decoration-none text-white"
              {...({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""}
            >
              <FontAwesomeIcon
                icon={faHouse}
                className="bi pe-none me-2"
                style={{ width: "16", height: "16" }}
              />
              Home
            </Nav.Link>
          </LinkContainer>
        </Nav.Item>
        <Nav.Item as="li">
          <LinkContainer to="/profile">
            <Nav.Link
              className="text-decoration-none text-white"
              {...({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""}
            >
              <FontAwesomeIcon
                icon={faUser}
                className="bi pe-none me-2"
                style={{ width: "16", height: "16" }}
              />
              Profile page
            </Nav.Link>
          </LinkContainer>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
}
