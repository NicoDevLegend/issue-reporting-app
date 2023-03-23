import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../components/Loading";

export default function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    isAuthenticated &&
    (isLoading ? (
      <Loading />
    ) : (
      <div className="d-grid h-75 gap-3 overflow-auto">
        <img
          src={user.picture}
          alt={user.name}
          className="mx-auto my-5 m-md-5 border border-secondary border-opacity-25 border-3"
        />
        <p className="mx-auto my-5 m-md-5 text-decoration-underline">
          <strong>Role: User</strong>
        </p>
        <Form
          className="w-auto  text-start mx-auto d-flex justify-content-center flex-column"
          onSubmit={handleSubmit}
        >
          <Form.Group className="mb-4" controlId="formUserName">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              defaultValue={user["https://myapp.example.com/username"]}
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" defaultValue={user.email} />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formFirstName">
            <Form.Label>First name</Form.Label>
            <Form.Control defaultValue="Jon" />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formLastName">
            <Form.Label>Last name</Form.Label>
            <Form.Control defaultValue="Doe" />
          </Form.Group>
          <hr></hr>
          <Button
            variant="primary"
            type="submit"
            className="mt-5 mx-auto"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Form>
      </div>
    ))
  );
}
