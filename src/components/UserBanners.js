import { colors } from "../Utilities/rolesColors";
import { useEffect, useState } from "react";
import useAxiosGet from "../services/ServiceAxiosGet";
import { useAuth0 } from "@auth0/auth0-react";

function initialState() {
  const userData = localStorage.getItem("userData");
  return userData ? JSON.parse(userData) : "Default";
}

export default function UserBanner() {
  const { user } = useAuth0();
  const [data] = useAxiosGet(`${process.env.REACT_APP_SERVICE_API}/${user.sub}/roles`);

  const [userRole, setUserRole] = useState(initialState);

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
    if (data) {
      setUserData(data[0].name)
    }
  }, [userRole, data]);

  return (
    <div
      className={`m-0 w-auto position-relative bg-${colors[userRole]} z-0`}
      style={{ height: "400px", left: "0", right: "0" }}
    ></div>
  );
}
