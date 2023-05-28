import { Button, Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useAuth0 } from "@auth0/auth0-react";
import axiosPost from "../services/ServiceAxiosPost";
import useAxiosGet from "../services/ServiceAxiosGet";

export default function NewTicket() {
  const { isAuthenticated, user } = useAuth0();
  const [dataUsers] = useAxiosGet(`${process.env.REACT_APP_SERVICE_API}/users`);
  const [dataRoles] = useAxiosGet(
    `${process.env.REACT_APP_SERVICE_API}/role/${process.env.REACT_APP_SUPPORT_ROLE}/users`
  );
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      userID: user.sub,
      Status: "Not Resolved",
      Description: "Need to be fixed",
      Category: "",
      Priority: "",
      AssigneeID: "",
    },
  });

  const onSubmit = async (data, e) => {
    const resData = await axiosPost(
      `${process.env.REACT_APP_SERVICE_API}/ticket`,
      data
    );
    alert(resData);
    e.target.reset();
  };

  return (
    isAuthenticated &&
    user["https://my-app/roles"][0] === "User" && (
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
          onReset={reset}
          className="p-5 w-75 text-start mx-auto mt-3 mb-5 bg-dark text-light d-flex justify-content-center flex-column rounded"
          style={{
            maxWidth: "600px",
            boxShadow: "0px 5px 10px 10px rgba(0,0,0,0.2)",
          }}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Form.Group className="mb-4">
            <Form.Label>
              <strong>
                Category <span className="text-warning">*</span>
              </strong>
            </Form.Label>
            <Controller
              name="Category"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Form.Control
                  as="select"
                  isInvalid={errors.Category}
                  {...field}
                >
                  <option value="">---</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </Form.Control>
              )}
            />
            <Form.Control.Feedback type="invalid">
              Please choose a Category.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>
              <strong>
                Description <span className="text-warning">*</span>
              </strong>
            </Form.Label>
            <Controller
              name="Description"
              control={control}
              rules={{ required: true, maxLength: 30 }}
              render={({ field }) => (
                <Form.Control
                  as="textarea"
                  isInvalid={errors.Description}
                  {...field}
                  rows={3}
                />
              )}
            />
            {errors.Description?.type === "required" && (
              <Form.Control.Feedback type="invalid">
                Please write a Description.
              </Form.Control.Feedback>
            )}
            {errors.Description?.type === "maxLength" && (
              <Form.Control.Feedback type="invalid">
                The maximun length of the field is 30 characters.
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>
              <strong>
                Priority <span className="text-warning">*</span>
              </strong>
            </Form.Label>
            <Controller
              name="Priority"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Form.Control
                  as="select"
                  isInvalid={errors.Priority}
                  {...field}
                  required
                >
                  <option value="">---</option>
                  <option value="Important">Important</option>
                  <option value="Very Important">Very Important</option>
                  <option value="Urgent">Urgent</option>
                </Form.Control>
              )}
            />
            <Form.Control.Feedback type="invalid">
              Please choose a Priority.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>
              <strong>
                Assign to <span className="text-warning">*</span>
              </strong>
            </Form.Label>
            <Controller
              name="AssigneeID"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Form.Control
                  as="select"
                  isInvalid={errors.AssigneeID}
                  {...field}
                  required
                >
                  <option value="">---</option>
                  {dataUsers &&
                    dataRoles &&
                    dataUsers
                      .filter((user) => dataRoles.includes(user.userID))
                      .map((user, index) => (
                        <option key={index} value={user.userID}>
                          {user.username}
                        </option>
                      ))}
                </Form.Control>
              )}
            />
            <Form.Control.Feedback type="invalid">
              Please choose an Assignation.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formFileMultiple" className="mb-4">
            <Form.Label>
              <strong>Attachments</strong>
            </Form.Label>
            <br></br>
            <Form.Control type="file" className="me-auto" />
          </Form.Group>
          <hr></hr>
          <Form.Group className="mx-auto mt-2 mb-3">
            <Button variant="info" type="submit" className="mx-3">
              Submit
            </Button>
            <Button
              onClick={reset}
              variant="warning"
              type="reset"
              className="mx-3"
            >
              Reset
            </Button>
          </Form.Group>
        </Form>
      </div>
    )
  );
}
