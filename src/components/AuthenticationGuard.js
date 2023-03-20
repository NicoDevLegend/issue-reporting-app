import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "./Loading";

export default function AuthenticationGuard({ component }) {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
        <Loading />
    ),
  });

  return <Component />;
};