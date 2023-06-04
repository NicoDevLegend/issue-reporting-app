import useAxiosGet from "../services/ServiceAxiosGet";
import Spinner from "react-bootstrap/Spinner";

export default function UserData({ userID }) {
  const [dataUser] = useAxiosGet(
    `${process.env.REACT_APP_SERVICE_API}/${userID}/user`
  );
  return dataUser ? (
    <>{dataUser.username}</>
  ) : (
    <Spinner animation="border" variant="secondary" size="sm">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}