import { colors } from "../Utilities/rolesColors";
import { useEffect, useState } from "react";
import useAxiosGet from "../services/ServiceAxiosGet";
import { useAuth0 } from "@auth0/auth0-react";

function initialState() {
  const userRole = localStorage.getItem("userRole");
  return userRole ? JSON.parse(userRole) : "";
}

export default function UserRole() {
  const { user } = useAuth0();
  const [data] = useAxiosGet(`${process.env.REACT_APP_SERVICE_API}/${user.sub}/roles`);

  const [userRole, setUserRole] = useState(initialState);

  useEffect(() => {
    localStorage.setItem("userRole", JSON.stringify(userRole));
    if (data) {
      setUserRole(data[0].name)
    }
  }, [userRole, data]);


  return (
      <strong>
        Account: <span className={`text-${colors[userRole]}`}>{userRole}</span>
      </strong>
  );
}
