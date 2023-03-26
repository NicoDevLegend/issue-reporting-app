import Button from "react-bootstrap/Button";

export default function NewIssue() {
  return (
    <div style={{ marginBottom: "-200px" }}>
      <strong>New Issue</strong>
      <Button
        className="m-1"
        variant="secondary"
        size="sm"
        style={{
          borderRadius: "inherit",
          boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
        }}
      >
        +
      </Button>
    </div>
  );
}
