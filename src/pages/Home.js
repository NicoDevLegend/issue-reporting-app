import { useAuth0 } from "@auth0/auth0-react";
import NewIssue from "../components/NewIssue";
import IssuesTableList from "../components/IssuesTableList";

export default function Home({ value }) {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? (
    <div className="d-grid align-content-start vh-100">
      <h1
        className="p-2 mx-auto mt-5 mb-4 bg-dark text-info border border-secondary border-opacity-25 border-3 rounded"
        style={{
          boxShadow: "0px 5px 5px 5px rgba(0,0,0,0.2)",
        }}
      >
        <strong>Issue List</strong>
      </h1>
      <NewIssue />
      <IssuesTableList />
    </div>
  ) : (
    <div
      className="bg-white d-flex flex-column justify-content-center align-items-center gap-3"
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
