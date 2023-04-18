import { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DATA from "../data.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import SearchResult from "./SearchResult";

export default function SearchForm() {
  const [state, setState] = useState({ show: false, search: "" });
  const { show, search } = state;
  const filteredDataRef = useRef([]);

  const handleChange = (e) => {
    const searchValue = e.target.value;
    setState((prevState) => ({ ...prevState, search: searchValue }));
    filterData(searchValue);
  };

  const filterData = (searchValue) => {
    if (!filteredDataRef.current.length) {
      filteredDataRef.current = DATA.IssueList.map((data) => data.Assignee).filter(
        (item, index) => DATA.IssueList.indexOf(item) === index
      );
    }

    const filtered = filteredDataRef.current.filter((e) =>
      e.toLowerCase().includes(searchValue.toLowerCase())
    );
    setState((prevState) => ({ ...prevState, results: filtered }));
  };

  const handleShowFormControl = () => {
    setState((prevState) => ({ ...prevState, show: !show }));
  };

  return (
    <>
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search"
          className="d-none d-sm-block me-2"
          aria-label="Search"
          value={search}
          onChange={handleChange}
        />
        {search !== "" && <SearchResult results={state.results} />}
        <Button className="d-none d-sm-block me-5" variant="light">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Button>
        {show && (
          <>
            <Form.Control
              type="search"
              placeholder="Search"
              className="d-block d-sm-none position-absolute"
              style={{
                width: "90%",
                zIndex: 20,
                right: "1em",
                top: "75px",
              }}
              aria-label="Search"
              value={search}
              onChange={handleChange}
            />
            {search !== "" && <SearchResult results={state.results} mobile />}
          </>
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
