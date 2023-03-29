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
    <div>
      <FontAwesomeIcon
        icon={faBell}
        style={{
          width: "20px",
          height: "20px",
          cursor: "pointer",
        }}
        onClick={handleShowNotifications}
      />
      {show && (
        <div className="bg-light position-absolute top-0 end-0">
          Notifications
        </div>
      )}
    </div>
  );
}
