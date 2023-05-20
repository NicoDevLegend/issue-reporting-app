import { colors } from "../Utilities/rolesColors";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function initialState() {
  const userRole = localStorage.getItem("userRole");
  return userRole ? JSON.parse(userRole) : "Default";
}

export default function UserBanner() {
  const { user } = useAuth0();

  const [userRole, setUserRole] = useState(initialState);

  useEffect(() => {
    localStorage.setItem("userRole", JSON.stringify(userRole));
      setUserRole(user["https://my-app/roles"][0])
  }, [userRole, user]);

  return (
    <div
      className={`m-0 w-auto position-relative bg-${colors[userRole]} z-0`}
      style={{ height: "400px", left: "0", right: "0" }}
    ></div>
  );
}
