import Button from "react-bootstrap/Button";
import { useAuth0 } from "@auth0/auth0-react";

export default function LogOutButton() {
  const { logout } = useAuth0();

  return (
    <Button
      variant="primary"
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Logout
    </Button>
  );
}
