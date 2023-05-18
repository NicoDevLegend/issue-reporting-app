import { createContext, useContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import useAxiosGet from "../services/ServiceAxiosGet";

export const UserDataContext = createContext();
const { user } = useAuth0();

export function useUserDataContext() {
  return useContext(UserDataContext);
}

export function UserDataContextProvider({ children }) {
  //const { user } = useAuth0();
  const [data] = useAxiosGet(`${process.env.REACT_APP_SERVICE_API}/${user.sub}/roles`);
  //const [dataUser] = useAxiosGet(`${process.env.REACT_APP_SERVICE_API}/${user.sub}/user`);
console.log(user);

  function initialState() {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : ""/*{ Role: "", User: "" }*/;
  }

  const [userData, setUserData] = useState(initialState);

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  if (data /*&& dataUser*/) {
    setUserData(/*{ Role: dataRole[0], User: dataUser }*/data[0])
  }

  return (
    <UserDataContext.Provider value={{ userData }}>
      {children}
    </UserDataContext.Provider>
  );
}