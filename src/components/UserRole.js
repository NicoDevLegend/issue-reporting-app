import { colors } from "../Utilities/rolesColors";
import { useEffect, useState } from "react";
import useAxiosGet from "../services/ServiceAxiosGet";
import { useAuth0 } from "@auth0/auth0-react";

function initialState() {
  const userData = localStorage.getItem("userData");
  return userData ? JSON.parse(userData) : "";
}

export default function UserRole() {
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
      <strong>
        Account: <span className={`text-${colors[userRole]}`}>{userRole}</span>
      </strong>
  );
}
