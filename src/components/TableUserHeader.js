export default function TableUserHeader({ role }) {
  return role === "User" ? (
    <th>Assignee</th>
  ) : role === "Support" ? (
    <th>Reported by</th>
  ) : (
    <th></th>
  );
}
