import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";

export default function Notifications() {
  return (
    <OverlayTrigger
      trigger="click"
      placement="auto-start"
      overlay={
        <Popover id="notifications">
          <Popover.Header as="h3">"Notifications"</Popover.Header>
          <Popover.Body>
            <strong>An issue was solved</strong>
            <strong>An issue was solved</strong>
          </Popover.Body>
        </Popover>
      }
    >
      <FontAwesomeIcon
        icon={faBell}
        style={{
          width: "20px",
          height: "20px",
          color: "white",
          cursor: "pointer",
        }}
        className="me-3 my-auto"
      />
    </OverlayTrigger>
  );
}
