import { useEffect, useState } from "react";
import useAxiosGet from "../services/ServiceAxiosGet";
import { Spinner, OverlayTrigger, Tooltip } from "react-bootstrap";

export default function UserData({ userID }) {
  const [dataUser] = useAxiosGet(
    `${process.env.REACT_APP_SERVICE_API}/${userID}/user`
  );
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("recize", handleResize);
    };
  }, []);

  return dataUser ? (
    <OverlayTrigger
      placement="top"
      delay={{ show: 250, hide: 400 }}
      trigger={isMobile ? "focus" : "hover"}
      overlay={
        <Tooltip>
          <div className="p-2 text-center">
            <img
              src={dataUser.picture1 ? dataUser.picture1 : dataUser.picture2}
              alt={dataUser.username}
              style={{ width: "50px", height: "50px" }}
              className="mx-auto rounded-circle"
            />
            <p>Name: {`${dataUser.firstName} ${dataUser.lastName}`}</p>
            <p>email: {dataUser.email}</p>
          </div>
        </Tooltip>
      }
    >
      <td>
        <div className="text-decoration-underline">{dataUser.username}</div>
      </td>
    </OverlayTrigger>
  ) : (
    <td>
      <Spinner animation="border" variant="secondary" size="sm">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </td>
  );
}
