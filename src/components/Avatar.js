import { Nav, NavItem, NavLink, Dropdown } from "react-bootstrap";
import LogOutButton from "./LogOutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import UserRole from "./UserRole";

export default function Avatar() {
  const { user } = useAuth0();

  return (
    <Nav className="m-auto">
      <Dropdown as={NavItem} drop="down">
        <Dropdown.Toggle as={NavLink} className=" p-0">
          <img
            src={user.picture}
            alt={user.name}
            style={{ width: "35px", height: "35px" }}
            className="rounded-circle"
          />
        </Dropdown.Toggle>
        <Dropdown.Menu style={{ left: "-105px", top: "35px" }}>
          <Dropdown.ItemText className="text-center">
            <p>
              Signed in as: <strong>{user.AppUsername}</strong>
            </p>
            <p>
              <UserRole />
            </p>
            <Link to="/profile" className="text-decoration-none text-reset">
              <p>Profile</p>
            </Link>
          </Dropdown.ItemText>
          <Dropdown.Divider />
          <Dropdown.ItemText className="d-flex justify-content-center">
            <LogOutButton />
          </Dropdown.ItemText>
        </Dropdown.Menu>
      </Dropdown>
    </Nav>
  );
}
