import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

export default function Notifications() {
  const [show, setShow] = useState(false);
  const [outside, setOutside] = useState(false);

  const handleShowNotifications = () => {
    if (show === false && outside === false) {
      setShow(true);
      setOutside(true);
    } else if (show === true && outside === true) {
      setShow(false);
      setOutside(false);
    } else if (show === false && outside === true) {
      setShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutside, true);
  }, []);

  const handleOutside = (e) => {
    if (!ref.current.contains(e.target)) {
      setShow(false);
    }
  };

  const ref = useRef(null);

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
      />
      {show && (
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
          <Link to="/notifications">
            <p>Notifications</p>
          </Link>
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
