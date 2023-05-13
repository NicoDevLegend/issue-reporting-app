import { colors } from "../Utilities/rolesColors";

export default function UserRole({ role }) {

  return (
      <strong>
        Account: <span className={`text-${colors[role]}`}>{role}</span>
      </strong>
  );
}
