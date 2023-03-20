import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";

export default function Notifications() {
  return (
    <FontAwesomeIcon
      icon={faBell}
      style={{ width: "20px", height: "20px", color: "white" }}
      className="btn me-3"
    />
  );
}
