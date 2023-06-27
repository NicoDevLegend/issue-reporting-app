import useAxiosGet from "../services/ServiceAxiosGet";
import { Spinner, OverlayTrigger, Tooltip } from "react-bootstrap";

export default function UserData({ userID }) {
  const [dataUser] = useAxiosGet(
    `${process.env.REACT_APP_SERVICE_API}/${userID}/user`
  );

  return dataUser ? (
    <OverlayTrigger
      placement="top"
      delay={{ show: 250, hide: 400 }}
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
      <div className="text-decoration-underline">{dataUser.username}</div>
    </OverlayTrigger>
  ) : (
    <Spinner animation="border" variant="secondary" size="sm">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}
