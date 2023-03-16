import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

export default function NavBar() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const { show, setShow } = useState(false);

  const handleShowFormControl = () => {
    setShow(true);
  };

  const handleSignUp = () => {
    loginWithRedirect({
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  };

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
            <Button
              className="d-none d-sm-block me-5"
              variant="outline-success"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Button>
            {show === true && (
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
            )}
            <Button
              className=".d-none .d-sm-block .d-md-none me-5"
              variant="outline-success"
              onClick={handleShowFormControl}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Button>
          </Form>
          {!isAuthenticated && (
            <>
              <Button
                className="me-3"
                variant="primary"
                onClick={() => loginWithRedirect()}
              >
                Login
              </Button>
              <Button variant="light" onClick={handleSignUp}>
                Signup
              </Button>
            </>
          )}
          {isAuthenticated && (
            <>
              <FontAwesomeIcon
                icon={faBell}
                style={{ width: "20px", height: "20px", color: "white" }}
                className="btn me-3"
              />
              <Button
                variant="primary"
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                Logout
              </Button>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
