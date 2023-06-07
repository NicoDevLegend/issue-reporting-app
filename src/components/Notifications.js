import { useState, useRef, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import NotifMessage from "./NotifMessage";
import { NotificationsContext } from "./NotificationsProvider";

export default function Notifications() {
  const { notifications, unread, getNotif } = useContext(NotificationsContext);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getNotif();
  }, [getNotif, show]);

  const ref = useRef();

  const handleOpenNotifications = () => {
    setShow(true);
  };

  const handleCloseNotifications = () => {
    setShow(false);
  };

  useEffect(() => {
    const handleOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener("click", handleOutside, true);
  }, []);

  const handleNotifClick = () => {
    handleCloseNotifications();
    navigate("/notifications");
  };

  return (
    <div className="mx-4 my-auto position-relative">
      {unread && unread.length !== 0 && (
        <span className="position-absolute top-0 start-100 translate-middle badge border border-dark rounded-circle bg-light">
          <span className="text-black">{unread.length}</span>
        </span>
      )}
      {!show && (
        <FontAwesomeIcon
          icon={faBell}
          style={{
            width: "20px",
            height: "20px",
            cursor: "pointer",
            color: "white",
          }}
          onClick={handleOpenNotifications}
        />
      )}
      {show && (
        <>
          <FontAwesomeIcon
            icon={faBell}
            style={{
              width: "20px",
              height: "20px",
              cursor: "pointer",
              color: "gray",
            }}
            onClick={handleCloseNotifications}
          />
          <div
            className="bg-light position-absolute p-3 border border-dark-subtle rounded text-start"
            style={{
              right: "-3em",
              width: "250px",
              height: "auto",
              maxHeight: "25em",
              overflowX: "auto",
              scrollbarWidth: "thin",
              zIndex: "10000",
            }}
            ref={ref}
          >
            <p>Notifications
            <span
              className="fw-bolder ms-5 text-center"
              onClick={handleNotifClick}
              style={{ cursor: "pointer" }}
            >
              View All
            </span>
            </p>
            <NotifMessage
              handleClick={handleCloseNotifications}
              data={notifications}
            />
          </div>
        </>
      )}
    </div>
  );
}
