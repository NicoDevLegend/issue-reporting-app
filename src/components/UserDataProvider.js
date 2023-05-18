import { createContext, useContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import useAxiosGet from "../services/ServiceAxiosGet";

export const UserDataContext = createContext();

export function useUserDataContext() {
  return useContext(UserDataContext);
}

export function UserDataContextProvider({ children }) {
  const { user } = useAuth0();
  console.log(user);
  const [data] = useAxiosGet(`${process.env.REACT_APP_SERVICE_API}/${user.sub}/roles`);


  function initialState() {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : "";
  }

  const [userData, setUserData] = useState(initialState);

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  if (data) {
    setUserData(data[0])
  }

  return (
    <UserDataContext.Provider value={{ userData }}>
      {children}
    </UserDataContext.Provider>
  );
}