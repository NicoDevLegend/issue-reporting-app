import PageHeader from "../components/PageHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBellSlash, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { Container, Row, Col } from "react-bootstrap";
import UserData from "../components/UserData";
import { useContext } from "react";
import { NotificationsContext } from "../components/NotificationsProvider";
import axiosDelete from "../services/ServiceAxiosDelete";

export default function NotificationsPage() {
  const { notifications, setNotifications } = useContext(NotificationsContext);

  const handleDeleteNotification = async (notifId, notif) => {
    await axiosDelete(
      `${process.env.REACT_APP_SERVICE_API}/Notification/${notifId}`
    );
    const newNotifications = notifications.filter((n) => n !== notif);
    setNotifications(newNotifications);
  };

  return (
    <div className="d-grid">
      <PageHeader name={"Notifications"} />
      {!notifications ? (
        <div className="text-center mt-5">
          <FontAwesomeIcon
            icon={faBellSlash}
            style={{
              width: "10em",
              height: "10em",
              color: "white",
            }}
          />
          <h1 className="text-light mt-5">
            <strong>No Notifications Yet</strong>
          </h1>
        </div>
      ) : (
        <div
          style={{
            height: "auto",
            maxHeight: "75vh",
            overflowX: "auto",
            scrollbarWidth: "thin",
          }}
        >
          <div className="position-absolute" style={{ height: "50px" }}></div>
          {notifications.map((n, index) => {
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
                      {n.Read === false && (
                        <span className="badge border border-dark bg-info rounded-circle">
                          <span className="text-black">!</span>
                        </span>
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
                      className="p-2 mx-auto mb-3 border border-light"
                    >
                      <strong>{n.Body}</strong>
                    </Col>
                    <Col className="p-2">
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        style={{
                          width: "20px",
                          height: "20px",
                          cursor: "pointer",
                          color: "#0dcaf0",
                        }}
                        onClick={() => handleDeleteNotification(n._id, n)}
                      />
                    </Col>
                  </Row>
                </Container>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
