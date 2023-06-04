export default function TableUserHeader({ role }) {
  return role === "Support" ? <th>Reported by</th> : <th>Assignee</th>;
}
