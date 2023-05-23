import { Container, Row, Col, Spinner, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosGet from "../services/ServiceAxiosGet";
import axiosPatch from "../services/ServiceAxiosPatch";

export default function CheckTicket() {
  const location = useLocation();
  const navigate = useNavigate();
  const Issue = location.state || {};
  const [dataUser] = useAxiosGet(
    `${process.env.REACT_APP_SERVICE_API}/${Issue.ReportedBy}/user`
  );

  const patchTicket = async (data) => {
    await axiosPatch(
      `${process.env.REACT_APP_SERVICE_API}/ticket/${Issue._id}/checkticket`,
      data
    );
    navigate("/");
  };

  const handleInProgressClick = () => {
    patchTicket({
      Status: "In Progress",
    });
  };

  const handleReOpenTicketClick = () => {
    patchTicket({
      Status: "Not Resolved",
      Closed: "",
    });
  };

  const handleCloseClick = () => {
    const date = new Date();
    patchTicket({
      Status: "Resolved",
      Closed: date.toLocaleDateString(),
    });
  };

  return (
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
        {!dataUser ? (
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
                    Reported by: <span>{dataUser?.username || ""}</span>
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
              {Issue.Status === "Not Resolved" && (
                <Col>
                  {" "}
                  <Button
                    variant="warning"
                    className="mt-5"
                    onClick={handleInProgressClick}
                  >
                    Mark as "In Progress"
                  </Button>
                </Col>
              )}
              {Issue.Status === "Resolved" && (
                <>
                  <Col>
                    {" "}
                    <Button
                      variant="warning"
                      className="mt-5"
                      onClick={handleInProgressClick}
                    >
                      Re-Open as "In Progress"
                    </Button>
                  </Col>
                  <Col>
                    {" "}
                    <Button
                      variant="danger"
                      className="mt-5"
                      onClick={handleReOpenTicketClick}
                    >
                      Re-Open Ticket
                    </Button>
                  </Col>
                </>
              )}
              {(Issue.Status === "In Progress" ||
                Issue.Status === "Not Resolved") && (
                <Col>
                  {" "}
                  <Button
                    variant="success"
                    className="mt-5"
                    onClick={handleCloseClick}
                  >
                    Close ticket
                  </Button>
                </Col>
              )}
            </Row>
          </Container>
        )}
      </div>
    </div>
  );
}
