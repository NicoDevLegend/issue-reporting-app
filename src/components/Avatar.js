import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import NavItem from "react-bootstrap/NavItem";
import NavLink from "react-bootstrap/NavLink";
import { useAuth0 } from "@auth0/auth0-react";

export default function Avatar() {
  const { user } = useAuth0();

  return (
    <Nav>
      <DropdownButton as={NavItem} id="nav-dropdown" drop="start">
        <Dropdown.Toggle as={NavLink}>
          <img
            src={user.picture}
            alt={user.name}
            style={{ with: "20px", height: "20px" }}
            className="rounded-circle"
          />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>
            <p>
              Signed in as:{" "}
              <strong>{user["https://myapp.example.com/username"]}</strong>
            </p>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item></Dropdown.Item>
        </Dropdown.Menu>
      </DropdownButton>
    </Nav>
  );
}
