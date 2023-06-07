import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import useAxiosGet from "../services/ServiceAxiosGet";
import PageHeader from "../components/PageHeader";
import TargetUsersBadge from "../components/TargetUsersBadge";

export default function RoleAssignment() {
  const { user, isAuthenticated } = useAuth0();
  const [userId, setUserId] = useState();
  //const [roleId, setRoleId] = useState();
  const [dataUsers] = useAxiosGet(`${process.env.REACT_APP_SERVICE_API}/users`);
console.log(dataUsers)
  const handleNone = () => {
    setUserId(null);
  };

  const handleUserData = (userID) => {
    setUserId(userID);
  };

  return (
    isAuthenticated &&
    user["https://my-app/roles"][0] === "Admin" && (
      <div className="d-grid">
        <PageHeader name={"Role Assignment"} />
        <TargetUsersBadge
          title={"Select an Account"}
          options={
            <>
              <option onClick={handleNone}>---</option>
              {dataUsers &&
                dataUsers
                  .filter((u) => u.userID !== user.sub)
                  .map((user, index) => (
                    <option
                      key={index}
                      value={index}
                      onClick={() => handleUserData(user.userID)}
                    >
                      {!user.firstName || !user.lastName ? user.username : `${user.username} (${user.firstName} ${user.lastName})`}
                    </option>
                  ))}
            </>
          }
        />
        {userId && (
          <div
            className="p-4 w-75 mx-auto mt-1 mb-4 bg-dark text-light rounded d-flex justify-content-center align-items-center"
            style={{
              maxWidth: "800px",
              minHeight: "100px",
              boxShadow: "0px 5px 10px 10px rgba(0,0,0,0.2)",
            }}
          ></div>
        )}
      </div>
    )
  );
}
