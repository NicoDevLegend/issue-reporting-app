import Nav from "react-bootstrap/Nav";
import NavItem from "react-bootstrap/NavItem";
import NavLink from "react-bootstrap/NavLink";
import Dropdown from "react-bootstrap/Dropdown";
import { useAuth0 } from "@auth0/auth0-react";

export default function Avatar() {
  const { user } = useAuth0();

  return (
    <Nav>
      <Dropdown as={NavItem}>
        <Dropdown.Toggle as={NavLink} className=" p-0">
          <img
            src={user.picture}
            alt={user.name}
            style={{ width: "35px", height: "35px" }}
            className="rounded-circle"
          />
        </Dropdown.Toggle>
        <Dropdown.Menu style={{ right: "2em", top: "17px" }}>
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
