import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

export default function Notifications() {
  const [show, setShow] = useState(false);

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

  return (
    <div className="mx-3 my-auto">
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
            className="bg-light position-absolute p-3 border border-dark-subtle border-2 rounded text-start"
            style={{
              right: "5em",
              width: "200px",
              height: "auto",
              maxHeight: "25em",
              overflowX: "auto",
              scrollbarWidth: "thin",
              zIndex: "5",
            }}
            ref={ref}
          >
            <Link
              to="/notifications"
              className="text-decoration-none text-reset"
            >
              <p>Notifications</p>
            </Link>
            <p>Message</p>
            <p>Message</p>
            <p>Message</p>
            <p>Message</p>
            <p>Message</p>
          </div>
        </>
      )}
    </div>
  );
}
