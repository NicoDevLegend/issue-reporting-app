import { useAuth0 } from "@auth0/auth0-react";

export default function TableUserHeader() {
  const { user } = useAuth0();

  return user["https://my-app/roles"][0] === "User" ? (
    <th>Assignee</th>
  ) : user["https://my-app/roles"][0] === "Support" ? (
    <th>Reported by</th>
  ) : (
    <th></th>
  );
}
