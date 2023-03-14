import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { useAuth0 } from "@auth0/auth0-react";
//import { NavLink } from "react-router-dom";

export default function NavBar() {
  const { loginWithRedirect, logout, user, isLoading } = useAuth0();
  return (
    <Navbar bg="dark" variant="dark" style={{ height: "75px" }}>
      <Container className="justify-content-end">
        <Nav className="" style={{ maxHeight: "100px" }}>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="d-none d-sm-block me-2"
              aria-label="Search"
            />
            <Button className="me-5" variant="outline-success">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Button>
            <FontAwesomeIcon
              icon={faBell}
              style={{ width: "20px", height: "20px", color: "white" }}
              className="btn me-3"
            />
          </Form>
          {!isLoading && !user && (
            <Button variant="primary" onClick={() => loginWithRedirect()}>
              Log In
            </Button>
          )}
          {!isLoading && user && (
            <Button variant="primary" onClick={() => logout()}>
            Log Out
          </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
