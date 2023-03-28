import { useAuth0 } from "@auth0/auth0-react";
import NewIssue from "../components/NewIssue";
import IssuesTableList from "../components/IssuesTableList";

export default function Home() {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? (
    <div className="d-grid vh-100">
      <NewIssue />
      <IssuesTableList />
    </div>
  ) : (
    <div
      className="d-flex flex-column justify-content-center align-items-center gap-3"
      style={{ height: "75vh" }}
    >
      <h2>
        This is a <strong>Demo Web Application</strong> named{" "}
        <strong>"Issue Reporting"</strong>
      </h2>
      <h5>Please get log in or sign up to continue</h5>
    </div>
  );
}
