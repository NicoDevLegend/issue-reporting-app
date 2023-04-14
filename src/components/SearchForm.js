import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DATA from "../data.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function SearchForm() {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const data = DATA.IssueList.map((data) => data.Assignee);

  const handleShowFormControl = () => {
    if (!show) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    filterResult();
  };
 
  const filterData = data.filter((item, index) => {
    return data.indexOf(item) === index;
  });

  const filterResult = ()=> {
      const filter = !!search
        ? filterData.filter((e) => e.toLowerCase().includes(search.toLowerCase()))
        : [];
      setResults(filter);
  }
  

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
        {search !== "" && (
              <div
                className="p-2 d-none d-sm-block position-absolute bg-white text-start rounded-1"
                style={{
                  width: "230px",
                  zIndex: "30",
                  margin: "auto",
                  top: "60px",
                  minHeight: "50px",
                  maxHeight: "300px",
                  overflowX: "auto",
                  scrollbarWidth: "thin",
                }}
              >
                {results.map((item, index) => {
                  return <p key={index}>{item}</p>;
                })}
              </div>
            )}
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
                Zindex: "20",
                right: "1em",
                top: "75px",
              }}
              aria-label="Search"
              value={search}
              onChange={handleChange}
            />
            {search !== "" && (
              <div
                className="p-2 d-block d-sm-none position-absolute bg-white text-start rounded-1"
                style={{
                  width: "90%",
                  zIndex: "30",
                  right: "1em",
                  top: "115px",
                  minHeight: "50px",
                  maxHeight: "300px",
                  overflowX: "auto",
                  scrollbarWidth: "thin",
                }}
              >
                {results.map((item, index) => {
                  return <p key={index}>{item}</p>;
                })}
              </div>
            )}
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
