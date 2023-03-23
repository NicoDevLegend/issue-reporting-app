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
      <div className="d-grid h-75 gap-3 overflow-auto">
        <img src={user.picture} alt={user.name} className="mx-auto my-5 m-md-5"/>
        <Form className="w-50  text-start mx-auto">
      <Form.Group className="mb-4" controlId="formUserName">
        <Form.Label>Username</Form.Label>
        <Form.Control placeholder={user['https://myapp.example.com/username']} disabled/>
      </Form.Group>
      <Form.Group className="mb-4" controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder={user.email} disabled/>
      </Form.Group>
      <Form.Group className="mb-4" controlId="formFirstName">
      <Form.Label>First name</Form.Label>
      <Form.Control placeholder="Jon" disabled/>
      </Form.Group>
      <Form.Group className="mb-4" controlId="formLastName">
      <Form.Label>Last name</Form.Label>
      <Form.Control placeholder="Doe" disabled/>
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-3">
        Save
      </Button>
    </Form>
      </div>
    ))
  );
}
