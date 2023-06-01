import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import NotifMessage from "./NotifMessage";
import axios from "axios";

export default function Notifications({ userId }) {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [unreads, setUnreads] = useState(null);

  useEffect(() => {
    const getNotif = async () => {
      await axios
        .get(`${process.env.REACT_APP_SERVICE_API}/${userId}/Notifications`)
        .then((res) => {
          setUnreads(res.data.filter((m) => m.Read === false));
          setData(res.data);
        });
    };
    getNotif();
  }, [userId, show]);

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
    <div className="mx-4 my-auto position-relative">
      {unreads && unreads.length !== 0 && (
        <span className="position-absolute top-0 start-100 translate-middle badge border border-dark rounded-circle bg-light">
          <span className="text-black">{unreads.length}</span>
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
            className="bg-light position-absolute p-3 border border-dark-subtle border-2 rounded text-start"
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
            <p className="fw-bolder text-center">Notifications</p>
            <NotifMessage handleClick={handleCloseNotifications} data={data} />
          </div>
        </>
      )}
    </div>
  );
}
