import { Nav, NavItem, NavLink, Dropdown } from "react-bootstrap";
import LogOutButton from "./LogOutButton";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { useUserDataContext } from "./UserDataProvider";
import useAxiosGet from "../services/ServiceAxiosGet";
import UserRole from "./UserRole";

export default function Avatar() {
  const { user } = useAuth0();
  const [data] = useAxiosGet(`${process.env.REACT_APP_SERVICE_API}/${user.sub}/roles`);

  function initialState() {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : "";
  }

  const [userData, setUserData] = useState(initialState);

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  if (data) {
    setUserData(data[0])
  }

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
          {/*!data*/!userData ? (
            <div style={{ minHeight: "200px" }}></div>
          ) : (
            <>
              <Dropdown.ItemText className="text-center">
                <p>
                  Signed in as: <strong>{user.AppUsername}</strong>
                </p>
                <p>
                <UserRole role={userData} />
                </p>
                <Link to="/profile" className="text-decoration-none text-reset">
                  <p>Profile</p>
                </Link>
              </Dropdown.ItemText>
              <Dropdown.Divider />
              <Dropdown.ItemText className="d-flex justify-content-center">
                <LogOutButton />
              </Dropdown.ItemText>
            </>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </Nav>
  );
}
