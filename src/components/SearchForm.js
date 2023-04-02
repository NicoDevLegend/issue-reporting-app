import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function SearchForm() {
  const [show, setShow] = useState(false);

  const handleShowFormControl = () => {
    if (!show) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  return (
    <>
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search"
          className="d-none d-sm-block me-2"
          aria-label="Search"
        />
        <Button className="d-none d-sm-block me-5" variant="light">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Button>
        {show && (
          <Form.Control
            type="search"
            placeholder="Search"
            className="d-block d-sm-none position-absolute"
            style={{
              width: "90%",
              Zindex: "20",
              right: "1em",
              top: "75px",
            }}
            aria-label="Search"
          />
        )}
      </Form>
      <Button
        className="d-block d-sm-none me-5"
        variant="light"
        onClick={handleShowFormControl}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </Button>
    </>
  );
}
