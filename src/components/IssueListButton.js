import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function IssueListButton({ target }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/supportmanagement", { state: "1" });
  };

  return target ? (
    <Button
      variant="secondary"
      className="mt-5 mb-2"
      size="sm"
      onClick={handleClick}
    >
      "Back to the SupportManagement Issue List"
    </Button>
  ) : (
    <Link to="/">
      <Button variant="secondary" className="mt-5 mb-2" size="sm">
        Click here and select a Ticket in the "Issue List"
      </Button>
    </Link>
  );
}
