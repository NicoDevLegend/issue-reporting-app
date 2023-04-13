import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DATA from "../data.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function SearchForm() {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  //const [data, setData] = useState(DATA);
  const [searchResult, setSearchResult] = useState([]);

  const handleShowFormControl = () => {
    if (!show) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value);

    if (!!search) {
      const filter = DATA.IssueList.filter((data) => {
        return data.Description.toLowerCase().includes(
          search.toLocaleLowerCase()
        );
      });
      setSearchResult(filter);
    } else {
      setSearchResult([]);
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
          value={search}
          onChange={handleChange}
        />
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
                className="p-2 position-absolute bg-white text-start rounded-1"
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
                {searchResult.map((data, index) => (
                  <p key={index}>{data.Description}</p>
                ))}
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
