import { Button, Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../components/Loading";

export default function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const {
    control,
    register,
    handleSubmit,
    resetField,
    formState: { isDirty, dirtyFields },
    //formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      Username: user["https://myapp.example.com/username"],
      email: user.email,
      firstName: "Jon",
      lastName: "Doe",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

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
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <p
            className="p-3 w-auto mx-auto mt-4 mb-5 text-decoration-underline"
            style={{ textUnderlineOffset: "3px" }}
          >
            <strong>Account: User</strong>
          </p>
          <Form.Group className="mb-4" controlId="formUserName">
            <Form.Label>
              <strong>Username</strong>
            </Form.Label>
            <Controller
              name="Username"
              control={control}
              render={({ field }) => (
                <Form.Control
                  type="text"
                  {...field}
                  {...register("Username")}
                />
              )}
            />
            {isDirty && dirtyFields.Username && (
              <Button
                className="my-1"
                variant="warning"
                size="sm"
                onClick={() => resetField("Username")}
              >
                Reset
              </Button>
            )}
          </Form.Group>
          <Form.Group className="mb-4" controlId="formEmail">
            <Form.Label>
              <strong>Email address</strong>
            </Form.Label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Form.Control type="email" {...field} {...register("email")} />
              )}
            />
            {isDirty && dirtyFields.email && (
              <Button
                className="my-1"
                variant="warning"
                size="sm"
                onClick={() => resetField("email")}
              >
                Reset
              </Button>
            )}
          </Form.Group>
          <Form.Group className="mb-4" controlId="formFirstName">
            <Form.Label>
              <strong>First name</strong>
            </Form.Label>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <Form.Control
                  type="text"
                  {...field}
                  {...register("firstName")}
                />
              )}
            />
            {isDirty && dirtyFields.firstName && (
              <Button
                className="my-1"
                variant="warning"
                size="sm"
                onClick={() => resetField("firstName")}
              >
                Reset
              </Button>
            )}
          </Form.Group>
          <Form.Group className="mb-4" controlId="formLastName">
            <Form.Label>
              <strong>Last name</strong>
            </Form.Label>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <Form.Control
                  type="text"
                  {...field}
                  {...register("lastName")}
                />
              )}
            />
            {isDirty && dirtyFields.lastName && (
              <Button
                className="my-1"
                variant="warning"
                size="sm"
                onClick={() => resetField("lastName")}
              >
                Reset
              </Button>
            )}
          </Form.Group>
          <hr></hr>
          <Button variant="info" type="submit" className="mx-auto">
            Save
          </Button>
        </Form>
      </div>
    ))
  );
}
