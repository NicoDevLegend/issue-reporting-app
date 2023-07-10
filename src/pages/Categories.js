import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faFloppyDisk,
  faTrashCan,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  Form,
  Container,
  Row,
  Col,
  Button,
  Alert,
  Spinner,
  Dropdown,
} from "react-bootstrap";
import PageHeader from "../components/PageHeader";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import axiosPost from "../services/ServiceAxiosPost";
import axiosPatch from "../services/ServiceAxiosPatch";
import useAxiosGet from "../services/ServiceAxiosGet";
import axiosDelete from "../services/ServiceAxiosDelete";
import { useNavigate } from "react-router-dom";

export default function Categories() {
  const { user, isAuthenticated } = useAuth0();
  const [formInputState, setFormInputState] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [addNewCategory, setAddNewCategory] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alertShow, setAlertShow] = useState(false);
  const [errorAlertShow, setErrorAlertShow] = useState(false);
  const [selectValue, setSelectValue] = useState("default");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [resData, setResData] = useState({});
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
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("recize", handleResize);
    };
  }, []);

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

  if (!dataCategories) {
    navigate("/notfound");
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, [formInputState]);

  const handleSelectCategory = (description, ID) => {
    setDescriptionValue(description);
    setCategoryID(ID);
    setAddNewCategory(false);
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
    setIsLoading(true);
    try {
      const res = await axiosPost(
        `${process.env.REACT_APP_SERVICE_API}/Category`,
        data
      );
      setResData(res);
      handleEdit();
      setDescriptionValue("");
      setAlertShow(true);
      setIsLoading(false);
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

  const handleDeleteCategory = async () => {
    setIsLoading(true);
    try {
      const res = await axiosDelete(
        `${process.env.REACT_APP_SERVICE_API}/Category/${categoryID}`
      );
      setResData(res);
      handleEdit();
      setDescriptionValue("");
      setAlertShow(true);
      setIsLoading(false);
    } catch {
      setErrorAlertShow(true);
    }
  };

  const handleSelect = (value) => {
    setSelectValue(value);
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
                  {isMobile ? (
                    <Dropdown onSelect={handleSelect}>
                      <Dropdown.Toggle variant="secondary">
                        {dataCategories &&
                        selectValue !== "default" &&
                        selectValue !== "--Add a new Category--"
                          ? dataCategories[selectValue]?.Title
                          : selectValue === "default"
                          ? "---"
                          : "--Add a new Category--"}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          eventKey="default"
                          onClick={handleCancel}
                        >
                          ---
                        </Dropdown.Item>
                        {user["https://my-app/roles"][0] === "Admin" && (
                          <Dropdown.Item
                            eventKey="--Add a new Category--"
                            onClick={() => setAddNewCategory(true)}
                          >
                            --Add a new Category--
                          </Dropdown.Item>
                        )}
                        {dataCategories ? (
                          dataCategories?.map((category, index) => (
                            <Dropdown.Item
                              key={index}
                              eventKey={index}
                              onClick={() =>
                                handleSelectCategory(
                                  category?.Description,
                                  category?._id
                                )
                              }
                            >
                              {category?.Title}
                            </Dropdown.Item>
                          ))
                        ) : (
                          <Dropdown.Item>...waiting data</Dropdown.Item>
                        )}
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    <Form.Control
                      className="text-center"
                      as="select"
                      value={selectValue}
                      onChange={(e) => setSelectValue(e.target.value)}
                    >
                      <option value="default" onClick={handleCancel}>
                        ---
                      </option>
                      {user["https://my-app/roles"][0] === "Admin" && (
                        <option
                          value="add"
                          onClick={() => setAddNewCategory(true)}
                        >
                          --Add a new Category--
                        </option>
                      )}
                      {dataCategories ? (
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
                        ))
                      ) : (
                        <option>...waiting data</option>
                      )}
                    </Form.Control>
                  )}
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
                <Button
                  variant="info"
                  type="submit"
                  className="m-3"
                  disabled={isLoading ? true : false}
                >
                  {isLoading ? (
                    <Spinner animation="border" size="sm" variant="secondary">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  ) : (
                    "Submit"
                  )}
                </Button>
                <Button
                  variant="warning"
                  className="m-3"
                  onClick={handleCancel}
                  disabled={isLoading ? true : false}
                >
                  Cancel
                </Button>
              </Form>
            ) : (
              <Row>
                <Form.Group className="mb-5 mx-auto">
                  <Form.Label>
                    <h5 className="mb-3">
                      <strong>Description: </strong>{" "}
                    </h5>
                  </Form.Label>
                  {user["https://my-app/roles"][0] === "Admin" &&
                    selectValue !== "default" && (
                      <Col sm className="mb-1 text-end">
                        <FontAwesomeIcon
                          icon={disabled ? faPenToSquare : faFloppyDisk}
                          style={{ cursor: "pointer" }}
                          onClick={disabled ? handleEdit : patchCategory}
                        />
                        {!disabled && (
                          <FontAwesomeIcon
                            icon={faXmark}
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
            {user["https://my-app/roles"][0] === "Admin" &&
              selectValue !== "default" &&
              !addNewCategory && (
                <Button
                  variant="danger"
                  className="mb-3"
                  onClick={handleDeleteCategory}
                  disabled={isLoading ? true : false}
                >
                  {isLoading ? (
                    <Spinner animation="border" size="sm" variant="secondary">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  ) : (
                    <>
                      Delete category
                      <FontAwesomeIcon icon={faTrashCan} className="ms-2" />
                    </>
                  )}
                </Button>
              )}
            {alertShow && (
              <Alert
                variant={`${resData?.color} position-fixed`}
                onClose={() => setAlertShow(false)}
                style={{ zIndex: "10000", top: "50%" }}
                dismissible
              >
                <Alert.Heading>{resData?.text}</Alert.Heading>
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
                  Something is wrong!, please try later
                </Alert.Heading>
              </Alert>
            )}
          </Container>
        </div>
      </div>
    )
  );
}
