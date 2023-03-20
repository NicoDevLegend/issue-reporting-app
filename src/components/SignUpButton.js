import Button from "react-bootstrap/Button";
import { useAuth0 } from "@auth0/auth0-react";

export default function SignUpButton() {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = () => {
    loginWithRedirect({
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  };

  return (
    <Button variant="light" onClick={handleSignUp}>
      Signup
    </Button>
  );
}
