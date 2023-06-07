import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import useAxiosGet from "../services/ServiceAxiosGet";
import PageHeader from "../components/PageHeader";
import UserData from "../components/UserData";
import IssuesTableList from "../components/IssuesTableList";
import TargetUsersBadge from "../components/TargetUsersBadge";

export default function SupportManagement() {
  const { user, isAuthenticated } = useAuth0();
  const [userId, setUserId] = useState();
  const [userRole, setUserRole] = useState();
  const [dataUsers] = useAxiosGet(`${process.env.REACT_APP_SERVICE_API}/users`);
  const [dataRoles] = useAxiosGet(
    `${process.env.REACT_APP_SERVICE_API}/role/${process.env.REACT_APP_SUPPORT_ROLE}/users`
  );
  const [supportNotifications] = useAxiosGet(
    `${process.env.REACT_APP_SERVICE_API}/${userId}/Notifications`
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
        <TargetUsersBadge
          title={"Select a support"}
          options={
            <>
              <option onClick={handleNone}>---</option>
              {dataUsers &&
                dataRoles &&
                dataUsers
                  .filter((user) => dataRoles.includes(user.userID))
                  .map((user, index) => (
                    <option
                      key={index}
                      value={index}
                      onClick={() => handleUserData(user.userID)}
                    >
                      {!user.firstName || !user.lastName ? user.username : `${user.username} (${user.firstName} ${user.lastName})`}
                    </option>
                  ))}
            </>
          }
        />
        {userId && (
          <div className="w-75 mx-auto mb-3">
            <Accordion defaultActiveKey="0" >
              <Accordion.Item eventKey="0">
                <Accordion.Header>Account Info</Accordion.Header>
                <Accordion.Body>info.</Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Issue List</Accordion.Header>
                <Accordion.Body>
                  <IssuesTableList userId={userId} userRole={userRole} />
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
                    {supportNotifications &&
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
                      })}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        )}
      </div>
    )
  );
}
