import axiosPatch from "../services/ServiceAxiosPatch";
import { Link } from "react-router-dom";

export default function NotifMessage({ data, handleClick }) {
  const patchNotifMessage = async (data, notifId) => {
    await axiosPatch(
      `${process.env.REACT_APP_SERVICE_API}/Notification/${notifId}`,
      data
    )
    handleClick();
  };

  const handleNotifMessageClick = (notifId) => {
    patchNotifMessage(
      {
        Read: true,
      },
      notifId
    )
  };

  return (
    data &&
    data.length !== 0 &&
    data.map((m, index) => {
      const read = m.Read ? "fw-light" : "fw-bold";

      return (
        <Link
          key={index}
          to="/notifications"
          className="text-decoration-none text-reset"
          onClick={() => handleNotifMessageClick(m._id)}
        >
          <p
            className={read + " bg-secondary bg-opacity-25 p-2"}
            style={{ fontSize: ".8rem" }}
          >{`${m.Body}.`}</p>
        </Link>
      );
    })
  );
}
