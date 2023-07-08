import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import useAxiosGet from "../services/ServiceAxiosGet";
import axiosDelete from "../services/ServiceAxiosDelete";
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
  Alert,
  Spinner,
} from "react-bootstrap";
import RoleButton from "../components/RoleButton";

export default function RoleAssignment() {
  const { user, isAuthenticated } = useAuth0();
  const userUserRole = process.env.REACT_APP_USER_ROLE;
  const userSupportRole = process.env.REACT_APP_SUPPORT_ROLE;
  const [userId, setUserId] = useState();
  const [roleId, setRoleId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [alertShow, setAlertShow] = useState(false);
  const [errorAlertShow, setErrorAlertShow] = useState(false);
  const [resData, setResData] = useState({});
  const roleUrl = userId
    ? `${process.env.REACT_APP_SERVICE_API}/${userId}/roles`
    : null;
  const [dataUsers] = useAxiosGet(`${process.env.REACT_APP_SERVICE_API}/users`);
  const [userRole] = useAxiosGet(roleUrl);
  const [role, setRole] = useState();
  const [selectValue, setSelectValue] = useState();
  const [disabledButton, setDisabledButton] = useState(true);
  const [value, setValue] = useState({ User: false, Support: false });
  const filteredDataUsers = dataUsers?.filter((u) => u.userID !== user.sub);

  useEffect(() => {
    if (userRole) {
      setRole(userRole[0]?.name);
      setRoleId(userRole[0]?.id);
      setValue({ [userRole[0]?.name]: true });
    }
  }, [userRole]);

  const deleteAndPostUserRole = async () => {
    setIsLoading(true);
    setDisabledButton(true);
    try {
      await axiosDelete(`${process.env.REACT_APP_SERVICE_API}/role/${userId}`);
      const res = await axiosPost(
        `${process.env.REACT_APP_SERVICE_API}/role/${roleId}/${userId}`
      );
      setResData(res);
      setAlertShow(true);
      setIsLoading(false);
      setDisabledButton(false);
      handleNone();
    } catch {
      setErrorAlertShow(true);
    }
  };

  const handleNone = () => {
    setUserId(null);
    setDisabledButton(true);
  };

  const handleUserData = (userID) => {
    setUserId(userID);
    setDisabledButton(true);
  };

  const handleUserRole = () => {
    setRole("User");
    setRoleId(userUserRole);
    setDisabledButton(false);
  };

  const handleSupportRole = () => {
    setRole("Support");
    setRoleId(userSupportRole);
    setDisabledButton(false);
  };

  const handleSelectChange = (e) => {
    const value = e.target?.value ? e.target.value : e;
    setSelectValue(value);
  };

  return (
    isAuthenticated &&
    user["https://my-app/roles"][0] === "Admin" && (
      <div className="d-grid">
        <PageHeader name={"Role Assignment"} />
        <TargetUsersBadge
          data={filteredDataUsers}
          title={"Select an Account"}
          value={selectValue}
          onChange={handleSelectChange}
          searchSelect={handleUserData}
          options={
            <>
              <option onClick={handleNone}>---</option>
              {dataUsers &&
                filteredDataUsers?.map((user, index) => (
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
              <Row className="mt-3">
                <strong>Select a Role</strong>
              </Row>
              <Row>
                <InputGroup
                  className="mx-auto my-3"
                  style={{ maxWidth: "250px" }}
                >
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
                  <Form.Control placeholder={role} disabled />
                </InputGroup>
              </Row>
              <RoleButton
                handleclick={deleteAndPostUserRole}
                name={role}
                title={
                  isLoading ? (
                    <Spinner animation="border" size="sm" variant="secondary">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  ) : (
                    "Assign Role"
                  )
                }
                disabled={disabledButton}
              />
            </Container>
          )}
          {alertShow && (
            <Alert
              variant={`${resData?.color} position-fixed`}
              onClose={() => setAlertShow(false)}
              style={{ zIndex: "10000", top: "50%" }}
              dismissible
            >
              <Alert.Heading>{resData?.text}</Alert.Heading>
            </Alert>
          )}
          {errorAlertShow && (
            <Alert
              variant="danger position-fixed"
              onClose={() => setAlertShow(false)}
              style={{ zIndex: "10000", top: "50%" }}
              dismissible
            >
              <Alert.Heading>
                Something is wrong!, please try again
              </Alert.Heading>
            </Alert>
          )}
        </TargetUsersBadge>
      </div>
    )
  );
}
