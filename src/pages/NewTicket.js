import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useAuth0 } from "@auth0/auth0-react";

export default function NewTicket() {
  const { isAuthenticated } = useAuth0();

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    isAuthenticated && (
      <div className="d-grid vh-100">
        <h1 className="d-flex flex-column m-auto">
          <strong>New Ticket</strong>
        </h1>
        <Form
          className="p-2 w-50 mx-auto my-3"
          onSubmit={handleSubmit}
        >
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control as="select">
              <option>select</option>
              <option>select</option>
              <option>select</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Priority</Form.Label>
            <Form.Control as="select">
              <option>select</option>
              <option>select</option>
              <option>select</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Assign to</Form.Label>
            <Form.Control as="select">
              <option>select</option>
              <option>select</option>
              <option>select</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    )
  );
}
