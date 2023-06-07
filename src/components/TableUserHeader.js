export default function TableUserHeader({ role }) {
  return role === "Support" ? <th className="text-info">Reported by</th> : <th className="text-info">Assignee</th>;
}
