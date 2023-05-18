import { createContext, useContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import useAxiosGet from "../services/ServiceAxiosGet";

export const UserDataContext = createContext();

export function useUserDataContext() {
  return useContext(UserDataContext);
}

function initialState() {
  const { user } = useAuth0();
  const [dataRole] = useAxiosGet(`${process.env.REACT_APP_SERVICE_API}/${user.sub}/roles`);
  const [dataUser] = useAxiosGet(`${process.env.REACT_APP_SERVICE_API}/${userID}/user`);

  const userData = localStorage.getItem("userData");
  return userData ? JSON.parse(userData) : { Role: dataRole[0], User: dataUser };
}

export function UserDataProvider({ children }) {
  const [userData, setUserData] = useState(initialState);

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  return (
    <UserData.Provider value={{ userData }}>
      {children}
    </UserData.Provider>
  );
}