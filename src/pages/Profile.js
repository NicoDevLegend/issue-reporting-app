import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../components/Loading";

export default function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    isAuthenticated &&
    (isLoading ? (
      <Loading />
    ) : (
      <div className="d-flex flex-column justify-content-center align-items-center h-75 gap-3">
        <img src={user.picture} alt={user.name} />
        <h2>{user.username}</h2>
        <p>{user.email}</p>
      </div>
    ))
  );
}
