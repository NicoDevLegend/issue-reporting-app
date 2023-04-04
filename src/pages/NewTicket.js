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
      <div className="d-grid mb-5">
        <h1
          className="p-2 bg-dark text-info d-flex flex-column mx-auto mt-5 mb-2 border border-secondary border-opacity-25 border-3 rounded"
          style={{
            boxShadow: "0px 5px 5px 5px rgba(0,0,0,0.2)",
          }}
        >
          <strong>New Ticket</strong>
        </h1>
        <Form
          className="p-5 w-75 text-start mx-auto mt-3 mb-5 bg-dark text-light d-flex justify-content-center flex-column rounded"
          style={{
            maxWidth: "600px",
            boxShadow: "0px 5px 10px 10px rgba(0,0,0,0.2)",
          }}
          onSubmit={handleSubmit}
        >
          <Form.Group className="mb-4">
            <Form.Label>
              <strong>Category</strong>
            </Form.Label>
            <Form.Control as="select">
              <option>---</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>
              <strong>Description</strong>
            </Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>
              <strong>Priority</strong>
            </Form.Label>
            <Form.Control as="select">
              <option>---</option>
              <option value="Important">Important</option>
              <option value="Very Important">Very Important</option>
              <option value="Urgent">Urgent</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>
              <strong>Assign to</strong>
            </Form.Label>
            <Form.Control as="select">
              <option>---</option>
              <option value="Diana T">Diana T</option>
              <option value="Adam J">Adam J</option>
              <option value="Jason R">Jason R</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formFileMultiple" className="mb-4">
            <Form.Label>
              <strong>Attachments</strong>
            </Form.Label>
            <br></br>
            <Form.Control type="file" multiple />
          </Form.Group>
          <hr></hr>
          <Button variant="info" type="submit" className="mx-auto mt-2 mb-3">
            Submit
          </Button>
        </Form>
      </div>
    )
  );
}
