import Nav from "react-bootstrap/Nav";
import NavItem from "react-bootstrap/NavItem";
import NavLink from "react-bootstrap/NavLink";
import Dropdown from "react-bootstrap/Dropdown";
import LogOutButton from "./LogOutButton";
import { useAuth0 } from "@auth0/auth0-react";

export default function Avatar() {
  const { user } = useAuth0();

  return (
    <Nav className="m-auto">
      <Dropdown as={NavItem}>
        <Dropdown.Toggle as={NavLink} className=" p-0">
          <img
            src={user.picture}
            alt={user.name}
            style={{ width: "35px", height: "35px" }}
            className="rounded-circle"
          />
        </Dropdown.Toggle>
        <Dropdown.Menu style={{ right: "5px", top: "35px" }}>
          <Dropdown.ItemText>
            <p>
              Signed in as:{" "}
              <strong>{user["https://myapp.example.com/username"]}</strong>
            </p>
          </Dropdown.ItemText>
          <Dropdown.Divider />
          <Dropdown.ItemText>
            <LogOutButton />
          </Dropdown.ItemText>
        </Dropdown.Menu>
      </Dropdown>
    </Nav>
  );
}
