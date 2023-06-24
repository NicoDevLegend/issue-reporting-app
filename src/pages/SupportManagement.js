import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import useAxiosGet from "../services/ServiceAxiosGet";
import PageHeader from "../components/PageHeader";
import UserData from "../components/UserData";
import IssuesTableList from "../components/IssuesTableList";
import TargetUsersBadge from "../components/TargetUsersBadge";
import { useLocation } from "react-router-dom";
import PieChartPerformance from "../components/PieChartPerformance";

export default function SupportManagement() {
  const { user, isAuthenticated } = useAuth0();
  const [userId, setUserId] = useState();
  const [userSuppRole, setUserSuppRole] = useState();
  const [selectValue, setSelectValue] = useState();
  const location = useLocation();
  const accordionEvent = location.state ? location.state : "0";
  const notifUrl = userId
    ? `${process.env.REACT_APP_SERVICE_API}/${userId}/Notifications`
    : null;
  const [dataUsers] = useAxiosGet(`${process.env.REACT_APP_SERVICE_API}/users`);
  const [dataRoles] = useAxiosGet(
    `${process.env.REACT_APP_SERVICE_API}/role/${process.env.REACT_APP_SUPPORT_ROLE}/users`
  );
  const filteredDataUsers = dataUsers?.filter((user) =>
    dataRoles?.includes(user.userID)
  );
  const date = filteredDataUsers
    ? new Date(filteredDataUsers[selectValue]?.lastLogin)
    : "";
  const [supportNotifications] = useAxiosGet(notifUrl);

  useEffect(() => {
    const storedUserId = sessionStorage.getItem("userId");
    const storedUserSuppRole = sessionStorage.getItem("userSuppRole");
    if (storedUserId && storedUserSuppRole) {
      setUserId(storedUserId);
      setUserSuppRole(storedUserSuppRole);
      const storedValue = sessionStorage.getItem("selectValue");
      if (storedValue) {
        setSelectValue(storedValue);
      }
    }
  }, []);

  const handleSelectChange = (e) => {
    const value = e.target?.value ? e.target.value : e;
    setSelectValue(value);
    sessionStorage.setItem("selectValue", value);
  };

  const handleNone = () => {
    setUserId(null);
    setUserSuppRole(null);
    sessionStorage.clear();
  };

  const handleUserData = (userID) => {
    setUserId(userID);
    setUserSuppRole("support");
    sessionStorage.setItem("userId", userID);
    sessionStorage.setItem("userSuppRole", "support");
  };

  return (
    isAuthenticated &&
    user["https://my-app/roles"][0] === "Admin" && (
      <div className="d-grid">
        <PageHeader name={"Support Management"} />
        <TargetUsersBadge
          data={filteredDataUsers}
          value={selectValue}
          onChange={handleSelectChange}
          searchSelect={handleUserData}
          title={"Select a support"}
          options={
            <>
              <option onClick={handleNone}>---</option>
              {dataUsers &&
                dataRoles &&
                filteredDataUsers.map((user, index) => (
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
        />
        {userId && (
          <div className="w-75 mx-auto mb-3">
            <Accordion defaultActiveKey={accordionEvent}>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Account Info</Accordion.Header>
                {dataUsers && (
                  <Accordion.Body>
                    <div className="p-4 text-start">
                      <div className="text-center">
                        <img
                          src={
                            filteredDataUsers[selectValue]?.picture1
                              ? filteredDataUsers[selectValue]?.picture1
                              : filteredDataUsers[selectValue]?.picture2
                          }
                          alt={filteredDataUsers[selectValue]?.username}
                          className="mx-auto border border-secondary border-opacity-25 border-3 rounded-circle"
                        />
                      </div>
                      <p className="mb-3 text-center">
                        Username: {filteredDataUsers[selectValue]?.username}
                      </p>
                      <p>Email: {filteredDataUsers[selectValue]?.email}</p>
                      <p>
                        Firstname: {filteredDataUsers[selectValue]?.firstName}
                      </p>
                      <p>
                        Lastname: {filteredDataUsers[selectValue]?.lastName}
                      </p>
                      <p>Last login: {date.toLocaleString()}</p>
                    </div>
                  </Accordion.Body>
                )}
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Issue List</Accordion.Header>
                <Accordion.Body>
                  <IssuesTableList userId={userId} userRole={userSuppRole} />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Notifications</Accordion.Header>
                <Accordion.Body>
                  <div
                    style={{
                      height: "auto",
                      maxHeight: "75vh",
                      overflowX: "auto",
                      scrollbarWidth: "thin",
                    }}
                  >
                    {supportNotifications && supportNotifications.length !== 0 ? (
                      supportNotifications.map((n, index) => {
                        return (
                          <div
                            key={index}
                            className="p-4 w-75 mx-auto mt-1 mb-1 bg-dark text-light rounded d-flex justify-content-center align-items-center"
                            style={{
                              maxWidth: "800px",
                              minHeight: "100px",
                              boxShadow: "0px 5px 10px 10px rgba(0,0,0,0.2)",
                            }}
                          >
                            <Container>
                              <Row>
                                <Col className="mb-3">
                                  {!n.Read && (
                                    <FontAwesomeIcon
                                      className="text-info"
                                      icon={faCircleExclamation}
                                    />
                                  )}
                                </Col>
                              </Row>
                              <Row className="mb-4">
                                <Col className="mb-2">
                                  Received: <strong>{n.Date}</strong>
                                </Col>
                                <Col className="mb-2">
                                  Tag: <strong>{n.Section}</strong>
                                </Col>
                                <Col className="mb-2">
                                  From:{" "}
                                  <strong>
                                    <UserData userID={n.From} />
                                  </strong>
                                </Col>
                              </Row>
                              <Row className="mt-3">
                                <Col
                                  xs={10}
                                  className="p-2 mx-auto mb-3 border border-light rounded"
                                >
                                  <strong>{n.Body}</strong>
                                </Col>
                                <Col className="p-2"></Col>
                              </Row>
                            </Container>
                          </div>
                        );
                      })
                    ) : (
                      <div>Not notifications yet.</div>
                    )}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>Performance</Accordion.Header>
                <Accordion.Body className="p-0">
                  <PieChartPerformance
                    userId={userId}
                    userRole={userSuppRole}
                  />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        )}
      </div>
    )
  );
}
