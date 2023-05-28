import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function IssueListButton() {
  return (
    <Link to="/">
      <Button variant="secondary" className="mt-5 mb-2" size="sm">
        Click here and select a Ticket in the "Issue List"
      </Button>
    </Link>
  );
}
