import { useAuth0 } from "@auth0/auth0-react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import IssueListButton from "../components/IssueListButton";
import TicketButton from "../components/TicketButton";
import useAxiosGet from "../services/ServiceAxiosGet";
import axiosPatch from "../services/ServiceAxiosPatch";
import axiosPost from "../services/ServiceAxiosPost";

export default function CheckTicket() {
  const { isAuthenticated, user } = useAuth0();
  const role = user["https://my-app/roles"][0];
  const location = useLocation();
  const navigate = useNavigate();
  const Issue = location.state || {};
  const notifBody = `The Ticket No.${Issue.IssueNo} is `;
  const getUrlParam = role === "User" ? Issue.AssigneeID : Issue.ReportedBy;

  const [dataUser] = useAxiosGet(
    `${process.env.REACT_APP_SERVICE_API}/${getUrlParam}/user`
  );

  const patchTicket = async (data) => {
    await axiosPatch(
      `${process.env.REACT_APP_SERVICE_API}/ticket/${Issue._id}/checkticket`,
      data
    );
    navigate("/");
  };

  const newNotifMessage = async (bodyData) => {
    await axiosPost(`${process.env.REACT_APP_SERVICE_API}/Notification`, {
      From: user.sub,
      To: getUrlParam,
      Type: "Notification Message",
      Section: "Ticket Status",
      Body: bodyData,
    });
  };

  const handleInProgressClick = () => {
    patchTicket({
      Status: "In Progress",
      Closed: "",
    });
    newNotifMessage(notifBody + "In Progress");
  };

  const handleReOpenTicketClick = () => {
    patchTicket({
      Status: "Not Resolved",
      Closed: "",
    });
    newNotifMessage(notifBody + "re-open");
  };

  const handleCloseClick = () => {
    const date = new Date();
    patchTicket({
      Status: "Resolved",
      Closed: date.toLocaleDateString(),
    });
    newNotifMessage(notifBody + "closed");
  };

  return (
    isAuthenticated && (
      <div className="d-grid">
        <h1
          className="p-2 mx-auto mt-5 mb-4 bg-dark text-info border border-secondary border-opacity-25 border-3 rounded"
          style={{
            boxShadow: "0px 5px 5px 5px rgba(0,0,0,0.2)",
          }}
        >
          <strong>Check Ticket</strong>
        </h1>
        <div
          className="p-4 w-75 mx-auto mt-3 mb-5 bg-dark text-light rounded d-flex justify-content-center align-items-center"
          style={{
            maxWidth: "800px",
            minHeight: "350px",
            boxShadow: "0px 5px 10px 10px rgba(0,0,0,0.2)",
          }}
        >
          {!dataUser && Object.keys(Issue).length !== 0 ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <Container>
              <Row>
                <h4 className="mb-5">
                  <strong>
                    Issue No:{" "}
                    <span className="text-info">{Issue.IssueNo || ""}</span>
                  </strong>
                </h4>
              </Row>
              <Row>
                <Col>
                  <h5 className="mb-4">
                    <strong>
                      Status:{" "}
                      <span
                        className={
                          Issue.Status === "Not Resolved"
                            ? "text-danger"
                            : Issue.Status === "In Progress"
                            ? "text-warning"
                            : "text-success"
                        }
                      >
                        {Issue.Status || ""}
                      </span>
                    </strong>
                  </h5>
                  <h5 className="mb-4">
                    <strong>
                      Priority:{" "}
                      <span
                        className={
                          Issue.Priority === "Important"
                            ? "text-success"
                            : Issue.Priority === "Very Important"
                            ? "text-warning"
                            : "danger"
                        }
                      >
                        {Issue.Priority || ""}
                      </span>
                    </strong>
                  </h5>
                  <h5 className="mb-4">
                    <strong>
                      Category: <span>{Issue.Category || ""}</span>
                    </strong>
                  </h5>
                  <h5 className="mb-3">
                    <strong>
                      {role === "User" ? "Assignee: " : "Reported by: "}
                      <span>{dataUser?.username || ""}</span>
                    </strong>
                  </h5>
                </Col>
                <Col>
                  <h5 className="mb-3">
                    <strong>Description: </strong>{" "}
                  </h5>
                  <textarea
                    rows="6"
                    cols="10"
                    className="mb-4 bg-dark text-white"
                    value={Issue.Description || ""}
                    disabled
                    style={{ resize: "none" }}
                  />
                </Col>
                <Col>
                  <h5 className="mb-3">
                    <strong>Open:</strong>
                  </h5>
                  <p className="mb-4">{Issue.Open || ""}</p>
                  <h5 className="mb-3">
                    <strong>Closed:</strong>
                  </h5>
                  <p className="mb-4">{Issue.Closed || "-"}</p>
                </Col>
              </Row>
              <Row>
                {Issue.Status === "Not Resolved" && role === "Support" && (
                  <Col>
                    <TicketButton
                      handleClick={handleInProgressClick}
                      variant="warning"
                      name='Mark as "In Progress"'
                    />
                  </Col>
                )}
                {Issue.Status === "Resolved" && (
                  <>
                    {role === "Support" && (
                      <Col>
                        <TicketButton
                          handleClick={handleInProgressClick}
                          variant="warning"
                          name='Re-Open as "In Progress"'
                        />
                      </Col>
                    )}
                    <Col>
                      <TicketButton
                        handleClick={handleReOpenTicketClick}
                        variant="danger"
                        name="Re-Open Ticket"
                      />
                    </Col>
                  </>
                )}
                {(Issue.Status === "In Progress" ||
                  Issue.Status === "Not Resolved") && (
                  <Col>
                    <TicketButton
                      handleClick={handleCloseClick}
                      variant="success"
                      name="Close Ticket"
                    />
                  </Col>
                )}
              </Row>
              <Row>
                <Col>
                  <IssueListButton />
                </Col>
              </Row>
            </Container>
          )}
        </div>
      </div>
    )
  );
}
