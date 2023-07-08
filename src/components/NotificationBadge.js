import { Container, Row, Col } from "react-bootstrap";
import UserData from "./UserData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function NotificationBadge({ notif, handleClick }) {
  return notif.map((n, index) => {
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
            <Col className="p-2">
              <FontAwesomeIcon
                className="text-info"
                icon={faTrashCan}
                style={{
                  width: "20px",
                  height: "20px",
                  cursor: "pointer",
                }}
                onClick={() => handleClick(n._id, n)}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  });
}
