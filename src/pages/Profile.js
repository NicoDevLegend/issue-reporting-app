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
      <div className="d-grid gap-3">
        <img
          src=""
          alt="banner"
          className="m-0 w-auto position-relative bg-primary z-0"
          style={{ height: "400px", left: "0", right: "0" }}
        />
        <img
          src={user.picture}
          alt={user.name}
          className="mx-auto position-relative border border-secondary border-opacity-25 border-3 rounded-circle"
          style={{
            width: "20em",
            maxWidth: "300px",
            marginTop: "-350px",
            marginBottom: "-75px",
            zIndex: "4",
          }}
        />
        <Form
          className="p-5 w-75 bg-dark text-light position-relative bg-light text-start mb-5 mx-auto d-flex justify-content-center flex-column rounded z-1"
          style={{
            maxWidth: "500px",
            boxShadow: "0px 10px 5px 5px rgba(0,0,0,0.2)",
            marginTop: "-150px",
          }}
          onSubmit={handleSubmit}
        >
          <p className="p-3 w-auto mx-auto mt-4 mb-5 text-decoration-underline" style={{ textUnderlineOffset: "3px"}}>
            <strong>Account: User</strong>
          </p>
          <Form.Group className="mb-4" controlId="formUserName">
            <Form.Label><strong>Username</strong></Form.Label>
            <Form.Control
              type="text"
              defaultValue={user["https://myapp.example.com/username"]}
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formEmail">
            <Form.Label><strong>Email address</strong></Form.Label>
            <Form.Control type="email" defaultValue={user.email} />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formFirstName">
            <Form.Label><strong>First name</strong></Form.Label>
            <Form.Control defaultValue="Jon" />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formLastName">
            <Form.Label><strong>Last name</strong></Form.Label>
            <Form.Control defaultValue="Doe" />
          </Form.Group>
          <hr></hr>
          <Button
            variant="info"
            type="submit"
            className="mx-auto"
          >
            Save
          </Button>
        </Form>
      </div>
    ))
  );
}
