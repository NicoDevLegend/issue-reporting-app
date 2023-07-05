import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faFloppyDisk,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { Form, Container, Row, Col, Button, Alert } from "react-bootstrap";
import PageHeader from "../components/PageHeader";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import axiosPost from "../services/ServiceAxiosPost";
import axiosPatch from "../services/ServiceAxiosPatch";
import useAxiosGet from "../services/ServiceAxiosGet";

export default function Categories() {
  const { user, isAuthenticated } = useAuth0();
  const [formInputState, setFormInputState] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [addNewCategory, setAddNewCategory] = useState(false);
  const [alertShow, setAlertShow] = useState(false);
  const [errorAlertShow, setErrorAlertShow] = useState(false);
  const [selectValue, setSelectValue] = useState("default");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const inputRef = useRef(null);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      Title: "",
      Description: "",
    },
  });

  const patchCategory = async () => {
    await axiosPatch(
      `${process.env.REACT_APP_SERVICE_API}/Category/${categoryID}`,
      { Description: descriptionValue }
    );
  };

  const [dataCategories] = useAxiosGet(
    `${process.env.REACT_APP_SERVICE_API}/Categories`,
    disabled
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, [formInputState]);

  const handleSelectCategory = (description, ID) => {
    setDescriptionValue(description);
    setCategoryID(ID);
  };

  const handleEdit = () => {
    if (disabled) {
      setDisabled(false);
      setFormInputState(false);
    } else {
      setDisabled(true);
      setFormInputState(true);
    }
  };

  const onSubmit = async (data) => {
    try {
      await axiosPost(`${process.env.REACT_APP_SERVICE_API}/Category`, data);
      setAlertShow(true);
      reset();
    } catch {
      setErrorAlertShow(true);
    }
  };

  const handleCancel = () => {
    setDisabled(true);
    setAddNewCategory(false);
    setSelectValue("default");
    setDescriptionValue("");
    setCategoryID("");
    reset();
  };

  return (
    isAuthenticated && (
      <div className="d-grid align-content-start">
        <PageHeader name={"Categories"} />
        <div
          className="p-4 w-75 mx-auto mt-3 mb-5 bg-dark text-light rounded d-flex justify-content-center align-items-center"
          style={{
            maxWidth: "800px",
            minHeight: "350px",
            boxShadow: "0px 5px 10px 10px rgba(0,0,0,0.2)",
          }}
        >
          <Container>
            <Row>
              <Col>
                <Form.Group
                  className="mb-5 mx-auto"
                  style={{ maxWidth: "300px" }}
                >
                  <Form.Label>
                    <h5 className="mb-3">
                      <strong>Category: </strong>{" "}
                    </h5>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    value={selectValue}
                    onChange={(e) => setSelectValue(e.target.value)}
                  >
                    <option value="default" onClick={handleCancel}>
                      ---
                    </option>
                    <option onClick={() => setAddNewCategory(true)}>
                      New Category (select to add a new category)
                    </option>
                    {dataCategories &&
                      dataCategories?.map((category, index) => (
                        <option
                          key={index}
                          value={index}
                          onClick={() =>
                            handleSelectCategory(
                              category?.Description,
                              category?._id
                            )
                          }
                        >
                          {category?.Title}
                        </option>
                      ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            {addNewCategory ? (
              <Form
                onSubmit={handleSubmit(onSubmit)}
                onReset={reset}
                noValidate
              >
                <Form.Group
                  className="mb-3 mx-auto"
                  style={{ maxWidth: "300px" }}
                >
                  <Form.Label>Title:</Form.Label>
                  <Controller
                    name="Title"
                    control={control}
                    rules={{ required: true, maxLength: 20 }}
                    render={({ field }) => (
                      <Form.Control
                        type="text"
                        isInvalid={errors.Title}
                        {...field}
                      />
                    )}
                  />
                  {errors.Title?.type === "required" && (
                    <Form.Control.Feedback type="invalid">
                      Please write a title.
                    </Form.Control.Feedback>
                  )}
                  {errors.Title?.type === "maxLength" && (
                    <Form.Control.Feedback type="invalid">
                      The maximun length of the field is 20 characters.
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description:</Form.Label>
                  <Controller
                    name="Description"
                    control={control}
                    rules={{ required: true, maxLength: 50 }}
                    render={({ field }) => (
                      <Form.Control
                        as="textarea"
                        isInvalid={errors.Description}
                        {...field}
                        style={{ resize: "none" }}
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
                      The maximun length of the field is 50 characters.
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Button variant="info" type="submit" className="m-3">
                  Submit
                </Button>
                <Button
                  variant="warning"
                  className="m-3"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                {alertShow && (
                  <Alert
                    variant="success position-fixed"
                    onClose={() => setAlertShow(false)}
                    style={{ zIndex: "10000", top: "50%" }}
                    dismissible
                  >
                    <Alert.Heading>Category submited!</Alert.Heading>
                  </Alert>
                )}
                {errorAlertShow && (
                  <Alert
                    variant="danger position-fixed"
                    onClose={() => setAlertShow(false)}
                    style={{ zIndex: "10000", top: "50%" }}
                    dismissible
                  >
                    <Alert.Heading>
                      Something is wrong!, please try again
                    </Alert.Heading>
                  </Alert>
                )}
              </Form>
            ) : (
              <Row>
                <Form.Group className="mb-5 mx-auto">
                  <Form.Label>
                    <h5 className="mb-3">
                      <strong>Description: </strong>{" "}
                    </h5>
                  </Form.Label>
                  {user["https://my-app/roles"][0] === "Admin" && (
                    <Col sm className="mb-1 text-end">
                      <FontAwesomeIcon
                        icon={disabled ? faPenToSquare : faFloppyDisk}
                        style={{ cursor: "pointer" }}
                        onClick={disabled ? handleEdit : patchCategory}
                      />
                      {!disabled && (
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          style={{ cursor: "pointer" }}
                          onClick={handleEdit}
                          className="ms-3"
                        />
                      )}
                    </Col>
                  )}
                  <Form.Control
                    ref={inputRef}
                    as="textarea"
                    value={descriptionValue}
                    style={{ resize: "none" }}
                    disabled={disabled}
                    onChange={(e) => setDescriptionValue(e.target.value)}
                  />
                </Form.Group>
              </Row>
            )}
          </Container>
        </div>
      </div>
    )
  );
}
