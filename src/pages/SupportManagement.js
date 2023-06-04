import { useAuth0 } from "@auth0/auth0-react";
import PageHeader from "../components/PageHeader";
import { Dropdown } from "react-bootstrap";
import IssuesTableList from "../components/IssuesTableList";
import { useState } from "react";
import useAxiosGet from "../services/ServiceAxiosGet";

export default function SupportManagement() {
  const { user, isAuthenticated } = useAuth0();
  const [userId, setUserId] = useState();
  const [userRole, setUserRole] = useState();
  const [dataUsers] = useAxiosGet(`${process.env.REACT_APP_SERVICE_API}/users`);
  const [dataRoles] = useAxiosGet(
    `${process.env.REACT_APP_SERVICE_API}/role/${process.env.REACT_APP_SUPPORT_ROLE}/users`
  );

  const handleNone = () => {
    setUserId(null);
    setUserRole(null);
  };

  const handleUserData = (userID) => {
    setUserId(userID);
    setUserRole("support");
  };

  return (
    isAuthenticated &&
    user["https://my-app/roles"][0] === "Admin" && (
      <div className="d-grid">
        <PageHeader name={"Support Management"} />
        <Dropdown className="mb-2">
          <Dropdown.Toggle variant="info">Support</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleNone}>none</Dropdown.Item>
            <Dropdown.Divider />
            {dataUsers &&
              dataRoles &&
              dataUsers
                .filter((user) => dataRoles.includes(user.userID))
                .map((user, index) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() => handleUserData(user.userID)}
                  >
                    {user.username}
                  </Dropdown.Item>
                ))}
          </Dropdown.Menu>
        </Dropdown>
        {userId && <IssuesTableList userId={userId} userRole={userRole} />}
      </div>
    )
  );
}
