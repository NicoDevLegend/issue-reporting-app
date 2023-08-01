import { Nav, Navbar, Container } from "react-bootstrap";
import LogInButton from "./LogInButton";
import SignUpButton from "./SignUpButton";
import Avatar from "./Avatar";
import Notifications from "./Notifications";
import { useAuth0 } from "@auth0/auth0-react";
import icon from "../assets/issue-reporting-icon.svg";

export default function NavBar() {
  const { isAuthenticated } = useAuth0();

  return (
    <Navbar bg="dark" variant="dark" style={{ height: "75px" }}>
      <Container className="justify-content-end">
        <Nav style={{ maxHeight: "100px" }}>
          {isAuthenticated ? (
            <>
              <Notifications />
              <Avatar />
            </>
          ) : (
            <>
              <Navbar.Brand
                className="position-absolute"
                style={{ left: "1em", top: "0" }}
                href="/"
              >
                <img src={icon} alt="icon" style={{width: "70px", height: "70px" }} />
              </Navbar.Brand>
              <LogInButton />
              <SignUpButton />
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
