import { useState } from "react";
import { useOutsideClick } from "./useOutsideClick";
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

  const ref = useOutsideClick(handleShowNotifications);

  const handleNotificationsClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="mx-3 my-auto">
        <FontAwesomeIcon
          icon={faBell}
          style={{
            width: "20px",
            height: "20px",
            cursor: "pointer",
            color: "white",
          }}
          onClick={handleShowNotifications}
          ref={ref}
        />
      {show && (
        <div
          className="bg-light position-absolute p-3 border border-dark-subtle border-2 rounded"
          style={{ right: "5em", width: "150px", height: "auto" }}
          onClick={handleNotificationsClick}
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
