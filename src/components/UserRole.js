import { colors } from "../Utilities/rolesColors";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function initialState() {
  const userRole = localStorage.getItem("userRole");
  return userRole ? JSON.parse(userRole) : "";
}

export default function UserRole() {
  const { user } = useAuth0();

  const [userRole, setUserRole] = useState(initialState);

  useEffect(() => {
    localStorage.setItem("userRole", JSON.stringify(userRole));
    setUserRole(user["https://my-app/roles"][0]);
  }, [userRole, user]);

  return (
    <strong>
      Account: <span className={`text-${colors[userRole]}`}>{userRole}</span>
    </strong>
  );
}
