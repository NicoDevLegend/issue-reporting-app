import Button from "react-bootstrap/Button";
import { useAuth0 } from "@auth0/auth0-react";

export default function LogInButton() {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      className="me-3"
      variant="primary"
      onClick={() => loginWithRedirect()}
    >
      Login
    </Button>
  );
}
