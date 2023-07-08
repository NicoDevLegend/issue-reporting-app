export default function TableUserHeader({ role, userId }) {
  return userId || role === "Support" ? (
    <th className="text-info">Reported by</th>
  ) : (
    <th className="text-info">Assignee</th>
  );
}
