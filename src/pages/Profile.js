import "./Profile.css";
import { useAuth0 } from "@auth0/auth0-react";

export default function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div className="d-flex flex-column justify-content-center align-items-center h-75 gap-3">
        <img src={user.picture} alt={user.name} />
        <h2>{user.username}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
}
