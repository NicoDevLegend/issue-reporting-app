import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../components/Loading";

export default function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    isAuthenticated &&
    (isLoading ? (
      <Loading />
    ) : (
      <div className="d-grid h-75 gap-3">
        <img src={user.picture} alt={user.name} className="m-auto m-md-5"/>
        <h2>Username: {user['https://myapp.example.com/username']}</h2>
        <p>E-mail: {user.email}</p>
      </div>
    ))
  );
}
