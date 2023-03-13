import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
//import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <Navbar bg="dark" variant="dark" style={{ height: "75px" }}>
      <Container className="justify-content-end">
        <Nav className="" style={{ maxHeight: "100px" }}>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Button>
          </Form>
          <NavDropdown
            className="mr-0"
            title="Link"
            id="navbarScrollingDropdown"
          >
            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action5">
              Something else here
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}
