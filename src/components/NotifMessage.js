import axiosPatch from "../services/ServiceAxiosPatch";
import { useNavigate } from "react-router-dom";

export default function NotifMessage({ data, handleClick }) {
  const navigate = useNavigate();

  const patchNotifMessage = async (patchData, notifId) => {
    await axiosPatch(
      `${process.env.REACT_APP_SERVICE_API}/Notification/${notifId}`,
      patchData
    );
    handleClick();
    navigate("/notifications");
  };

  const handleNotifMessageClick = (notifId) => {
    patchNotifMessage(
      {
        Read: true,
      },
      notifId
    );
  };

  return (
    data &&
    data.length !== 0 &&
    data.map((m, index) => {
      const read = m.Read ? "fw-light" : "fw-bold";

      return (
        <p
          key={index}
          className={read + " bg-secondary bg-opacity-25 p-2"}
          style={{ fontSize: ".8rem", cursor: "pointer" }}
          onClick={() => handleNotifMessageClick(m._id)}
        >{`${m.Body}.`}</p>
      );
    })
  );
}
