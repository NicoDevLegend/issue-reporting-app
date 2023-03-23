import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import NavItem from "react-bootstrap/NavItem";
import NavLink from "react-bootstrap/NavLink";
import { useAuth0 } from "@auth0/auth0-react";

export default function Avatar() {
  const { user } = useAuth0();

  return (
    <Nav>
      <Dropdown as={NavItem} id="nav-dropdown" drop="start">
        <Dropdown.Toggle as={NavLink}>
          <img
            src={user.picture}
            alt={user.name}
            style={{ width: "30px", height: "30px" }}
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
      </Dropdown>
    </Nav>
  );
}

/* position: absolute;
right: 2em;
top: 17px; */