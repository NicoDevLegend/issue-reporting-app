import Button from "react-bootstrap/Button";

export default function NewIssue() {
  return (
    <div className="d-flex flex-column m-auto">
      <Button
        variant="secondary"
        style={{
          borderRadius: "inherit",
          boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
        }}
      >
        <strong>New Issue</strong>
      </Button>
    </div>
  );
}
