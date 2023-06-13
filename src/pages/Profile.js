import { Alert, Button, Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../components/Loading";
import { useEffect, useRef, useState } from "react";
import UserRole from "../components/UserRole";
import UserBanner from "../components/UserBanners";
import axiosPatch from "../services/ServiceAxiosPatch";
import axiosPostMultipart from "../services/ServiceAxiosPostMultipart";
import ChangePictureModal from "../components/ChangePictureModal";

export default function Profile() {
  const [formInputState, setFormInputState] = useState(true);
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [modalShow, setModalShow] = useState(false);
  const [alertShow, setAlertShow] = useState(false);
  const [file, setFile] = useState(null);

  const {
    control,
    register,
    handleSubmit,
    resetField,
    setValue,
    setError,
    formState: { errors, isDirty, dirtyFields },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: user.AppUsername,
      email: user.email,
      firstName: user.given_name,
      lastName: user.family_name,
    },
  });

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [formInputState]);

  useEffect(() => {
    register("username", { required: true });
  }, [register]);

  const onSubmit = async (data) => {
    await axiosPatch(
      `${process.env.REACT_APP_SERVICE_API}/${user.sub}/users`,
      data
    );
    window.location.reload();
  };

  const handleSelectPicture = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleCancelChangePicture = () => {
    setFile(null);
    setModalShow(false);
  };

  const handleRestorePicture = async () => {
    await axiosPostMultipart(
      `${process.env.REACT_APP_SERVICE_API}/${user.sub}/users/clearMetadata`,
      {}
    );
    window.location.reload();
  };

  const handleSubmitPicture = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("file", file);

    if (file) {
      await axiosPostMultipart(
        `${process.env.REACT_APP_SERVICE_API}/${user.sub}/users/picture`,
        formData
      );
      setModalShow(false);
      window.location.reload();
    } else {
      setAlertShow(true);
    }
  };

  return (
    isAuthenticated &&
    (isLoading ? (
      <Loading />
    ) : (
      <div className="d-grid gap-3">
        <UserBanner />
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
            cursor: "pointer",
          }}
          onClick={() => setModalShow(true)}
        />
        <ChangePictureModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          handleselect={handleSelectPicture}
          handleconfirm={handleSubmitPicture}
          handlerestore={handleRestorePicture}
          handlecancel={handleCancelChangePicture}
        />
        {alertShow && (
          <Alert
            variant="danger position-absolute"
            onClose={() => setAlertShow(false)}
            style={{ zIndex: "10000" }}
            dismissible
          >
            <Alert.Heading>You didn't select an image!</Alert.Heading>
          </Alert>
        )}
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
            className="p-3 w-auto mx-auto mt-5 mb-4 text-decoration-underline"
            style={{ textUnderlineOffset: "3px" }}
          >
            <UserRole />
          </p>
          <Form.Group className="mb-4" controlId="formUserName">
            <Form.Label>
              <strong>Username</strong>
            </Form.Label>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <Form.Control
                  type="text"
                  {...field}
                  isInvalid={errors.username}
                  disabled={formInputState}
                  ref={inputRef}
                  onChange={(e) => {
                    const value = e.target.value;
                    setValue("username", value, { shouldDirty: true });
                    if (value === "") {
                      setError("username", "notMatch");
                    }
                  }}
                />
              )}
            />
            <Form.Control.Feedback type="invalid">
              The name must not be empty.
            </Form.Control.Feedback>
            {isDirty && dirtyFields.username && (
              <Button
                className="my-1"
                variant="warning"
                size="sm"
                onClick={() => resetField("username")}
              >
                Reset
              </Button>
            )}
          </Form.Group>
          <Form.Group className="mb-4" controlId="formEmail">
            <Form.Label>
              <strong>
                Email address
                {!formInputState && (
                  <span className="text-warning">
                    (The email can't be changed).
                  </span>
                )}
              </strong>
            </Form.Label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Form.Control
                  type="email"
                  {...field}
                  disabled
                  className="text-secondary"
                />
              )}
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formFirstName">
            <Form.Label>
              <strong>First name</strong>
            </Form.Label>
            <Controller
              name="firstName"
              control={control}
              rules={{ maxLength: 15 }}
              render={({ field }) => (
                <Form.Control
                  type="text"
                  {...field}
                  isInvalid={errors.firstName}
                  disabled={formInputState}
                />
              )}
            />
            <Form.Control.Feedback type="invalid">
              The maximun length of the first name is 10 characters.
            </Form.Control.Feedback>
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
              rules={{ maxLength: 15 }}
              render={({ field }) => (
                <Form.Control
                  type="text"
                  {...field}
                  isInvalid={errors.lastName}
                  disabled={formInputState}
                />
              )}
            />
            <Form.Control.Feedback type="invalid">
              The maximun length of the last name is 10 characters.
            </Form.Control.Feedback>
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
          {isDirty && Object.keys(dirtyFields).length > 0 ? (
            <Button variant="success" type="submit" className="mx-auto">
              Save Changes
            </Button>
          ) : !formInputState ? (
            <Button
              variant="danger"
              type="button"
              className="mx-auto"
              onClick={() => {
                setFormInputState(true);
              }}
            >
              Cancel
            </Button>
          ) : (
            <Button
              variant="info"
              type="button"
              className="mx-auto"
              onClick={() => {
                setFormInputState(false);
              }}
            >
              Edit
            </Button>
          )}
        </Form>
      </div>
    ))
  );
}
