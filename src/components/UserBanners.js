import { colors } from "../Utilities/rolesColors";

export default function UserBanner({ role }) {
  return (
    <div
      className={`m-0 w-auto position-relative bg-${colors[role]} z-0`}
      style={{ height: "400px", left: "0", right: "0" }}
    ></div>
  );
}
