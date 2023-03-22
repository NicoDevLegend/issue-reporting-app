import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import NavItem from "react-bootstrap/NavItem";
import NavLink from "react-bootstrap/NavLink";
import { useAuth0 } from "@auth0/auth0-react";

export default function Avatar() {
  const { user } = useAuth0();

  return (
    <Nav className="m-auto rounded-circle">
      <Dropdown as={NavItem} id="nav-dropdown">
        <Dropdown.Toggle as={NavLink}>
          <img src={user.picture} alt={user.name} className="m-auto" />
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
      </Dropdown>
    </Nav>
  );
}
