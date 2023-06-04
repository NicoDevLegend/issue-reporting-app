import { useAuth0 } from "@auth0/auth0-react";
import PageHeader from "../components/PageHeader";

export default function SupportManagement() {
  const { user, isAuthenticated } = useAuth0();
  
  return (
    isAuthenticated &&
    user["https://my-app/roles"][0] === "Admin" && (
      <div className="d-grid">
        <PageHeader name={"Support Management"}/>
      </div>
    )
  );
}
