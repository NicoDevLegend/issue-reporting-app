import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";

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
    <div className="mx-auto my-1">
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
      {show && (
        <div
          className="bg-light position-absolute p-3 border border-dark-subtle rounded"
          style={{ right: "5em", width: "150px", height: "auto" }}
        >
          Notifications
        </div>
      )}
    </div>
  );
}
