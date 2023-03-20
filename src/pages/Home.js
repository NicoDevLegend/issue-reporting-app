import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./Loading";

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return isAuthenticated ? (
    <div className="d-flex flex-column justify-content-center align-items-center h-75 gap-3">
      <h5>Content</h5>
    </div>
  ) : (
    <div className="d-flex flex-column justify-content-center align-items-center h-75 gap-3">
      <h2>
        This is a <strong>Demo Web Application</strong> named{" "}
        <strong>"Issue Report"</strong>
      </h2>
      <h5>Please get log in or sign up to continue</h5>
    </div>
  );
}
