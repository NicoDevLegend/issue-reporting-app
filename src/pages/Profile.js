import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../components/Loading";

export default function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    isAuthenticated &&
    (isLoading ? (
      <Loading />
    ) : (
      <div className="d-grid h-75 gap-3">
        <img src={user.picture} alt={user.name} className="m-auto m-md-5"/>
        <Form>
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder={user.email} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formUserName">
        <Form.Label>Username</Form.Label>
        <Form.Control placeholder={user['https://myapp.example.com/username']} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formFirstName">
      <Form.Label>First name</Form.Label>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formLastName">
      <Form.Label>Last name</Form.Label>
      </Form.Group>
      <Button variant="primary" type="submit">
        Save
      </Button>
    </Form>
      </div>
    ))
  );
}
