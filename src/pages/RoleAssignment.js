import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import useAxiosGet from "../services/ServiceAxiosGet";
import axiosPost from "../services/ServiceAxiosPost";
import PageHeader from "../components/PageHeader";
import TargetUsersBadge from "../components/TargetUsersBadge";
import {
  Container,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import RoleButton from "../components/RoleButton";
import axiosDelete from "../services/ServiceAxiosDelete";

export default function RoleAssignment() {
  const { user, isAuthenticated } = useAuth0();
  const userUserRole = process.env.REACT_APP_USER_ROLE;
  const userSupportRole = process.env.REACT_APP_SUPPORT_ROLE;
  const [userId, setUserId] = useState();
  const [roleId, setRoleId] = useState();
  const roleUrl = userId
    ? `${process.env.REACT_APP_SERVICE_API}/${userId}/roles`
    : null;
  const [dataUsers] = useAxiosGet(`${process.env.REACT_APP_SERVICE_API}/users`);
  const [userRole] = useAxiosGet(roleUrl);
  const [role, setRole] = useState();
  const [value, setValue] = useState({ User: false, Support: false });

  useEffect(() => {
    if (userRole) {
      setRole(userRole[0]?.name);
      setRoleId(userRole[0]?.id);
      setValue({ [userRole[0]?.name]: true });
    }
  }, [userRole]);

  const patchUserRole = async () => {
    try {
      if (role) {
        await axiosDelete(
          `${process.env.REACT_APP_SERVICE_API}/role/${userId}`
        );
        await axiosPost(
          `${process.env.REACT_APP_SERVICE_API}/role/${roleId}/${userId}`
        );
      }
      alert("Role was assigned");
    } catch (err) {
      alert("Something is wrong");
    }
  };

  const handleNone = () => {
    setUserId(null);
  };

  const handleUserData = (userID) => {
    setUserId(userID);
  };

  const handleUserRole = () => {
    setRole("User");
    setRoleId(userUserRole);
  };

  const handleSupportRole = () => {
    setRole("Support");
    setRoleId(userSupportRole);
  };

  return (
    isAuthenticated &&
    user["https://my-app/roles"][0] === "Admin" && (
      <div className="d-grid">
        <PageHeader name={"Role Assignment"} />
        <TargetUsersBadge
          title={"Select an Account"}
          options={
            <>
              <option onClick={handleNone}>---</option>
              {dataUsers &&
                dataUsers
                  .filter((u) => u.userID !== user.sub)
                  .map((user, index) => (
                    <option
                      key={index}
                      value={index}
                      onClick={() => handleUserData(user.userID)}
                    >
                      {!user.firstName || !user.lastName
                        ? user.username
                        : `${user.username} (${user.firstName} ${user.lastName})`}
                    </option>
                  ))}
            </>
          }
        >
          {userId && userRole && (
            <Container>
              <Row>
                <InputGroup className="m-3">
                  <DropdownButton variant="dark" title="Role">
                    <Dropdown.Item disabled>
                      <strong>Select a Role</strong>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      onClick={handleUserRole}
                      disabled={value.User}
                    >
                      User
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={handleSupportRole}
                      disabled={value.Support}
                    >
                      Support
                    </Dropdown.Item>
                  </DropdownButton>
                  <Form.Control placeholder={role} />
                </InputGroup>
              </Row>
              <RoleButton
                title="Assign Role"
                name={role}
                handleclick={patchUserRole}
              />
            </Container>
          )}
        </TargetUsersBadge>
      </div>
    )
  );
}