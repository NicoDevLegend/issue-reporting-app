import React, { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { useAuth0 } from "@auth0/auth0-react";

const options = {
  Category: [
    { id: 1, name: "1" },
    { id: 2, name: "2" },
    { id: 3, name: "3" },
  ],
  Priority: [
    { id: 1, name: "Low" },
    { id: 2, name: "Medium" },
    { id: 3, name: "High" },
  ],
  Assignee: [
    { id: 1, name: "John" },
    { id: 2, name: "Mary" },
    { id: 3, name: "Bob" },
  ],
};

const CategoryInput = React.memo(({ control, errors }) => (
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
        {options.Category.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </Form.Control>
    )}
  />
));

const PriorityInput = React.memo(({ control, errors }) => (
  <Controller
    name="Priority"
    control={control}
    rules={{ required: true }}
    render={({ field }) => (
      <Form.Control
        as="select"
        isInvalid={errors.Priority}
        {...field}
      >
        <option value="">---</option>
        {options.Priority.map((priority) => (
          <option key={priority.id} value={priority.id}>
            {priority.name}
          </option>
        ))}
      </Form.Control>
    )}
  />
));

const AssigneeInput = React.memo(({ control, errors }) => (
  <Controller
    name="Assignee"
    control={control}
    rules={{ required: true }}
    render={({ field }) => (
      <Form.Control
        as="select"
        isInvalid={errors.Assignee}
        {...field}
      >
        <option value="">---</option>
        {options.Assignee.map((assignee) => (
          <option key={assignee.id} value={assignee.id}>
            {assignee.name}
          </option>
        ))}
      </Form.Control>
    )}
  />
));

const TaskForm = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({ defaultValues: { Category: "", Priority: "", Assignee: "" } });

  const { isAuthenticated, isLoading, error } = useAuth0();

  const onSubmit = (data) => {
    console.log(data);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      alert(JSON.stringify(errors));
    }
  }, [isSubmitSuccessful, reset, errors]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Oops... {error.message}</div>;

  return (
    isAuthenticated && (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="Description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Description"
            isInvalid={errors.Description}
            {...register("Description", {
              required: true,
              maxLength: 30,
            })}
          />
          {errors.Description && errors.Description.type === "required" && (
            <Form.Control.Feedback type="invalid">
              Please write a Description.
            </Form.Control.Feedback>
          )}
          {errors.Description && errors.Description.type === "maxLength" && (
            <Form.Control.Feedback type="invalid">
              The maximun length of the field is 30 characters.
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group controlId="Category">
          <Form.Label>Category</Form.Label>
          <CategoryInput control={control} errors={errors} />
          {errors.Category && (
            <Form.Control.Feedback type="invalid">
              Please select a Category.
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group controlId="Priority">
          <Form.Label>Priority</Form.Label>
          <PriorityInput control={control} errors={errors} />
          {errors.Priority && (
            <Form.Control.Feedback type="invalid">
              Please select a Priority.
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group controlId="Assignee">
          <Form.Label>Assignee</Form.Label>
          <AssigneeInput control={control} errors={errors} />
          {errors.Assignee && (
            <Form.Control.Feedback type="invalid">
              Please select an Assignee.
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    )
  );
};

export default TaskForm;
