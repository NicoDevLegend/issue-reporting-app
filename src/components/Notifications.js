import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

export default function Notifications() {
  const [show, setShow] = useState(false);

  const handleShowNotifications = () => {
    if (show === false) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  return (
    <div className="mx-3 my-auto">
      <Link to="/notifications">
      <FontAwesomeIcon
        icon={faBell}
        style={{
          width: "20px",
          height: "20px",
          cursor: "pointer",
          color: "white"
        }}
        onClick={handleShowNotifications}
      />
      </Link>
      {show && (
        <div
          className="bg-light position-absolute p-3 rounded"
          style={{ right: "5em", width: "150px", height: "auto" }}
        >
          <p>Notifications</p>
          <p>Message</p>
          <p>Message</p>
          <p>Message</p>
          <p>Message</p>
          <p>Message</p>
        </div>
      )}
    </div>
  );
}
