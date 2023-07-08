import { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import SearchBar from "./SearchBar";
import { selectStyle } from "../Utilities/customSelectStyle";

export default function TargetUsersBadge({
  data,
  options,
  title,
  value,
  onChange,
  searchSelect,
  children,
}) {
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (searchTerm) => {
    const filteredResults = data?.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredResults);
  };

  return (
    <div
      className="p-4 w-75 mx-auto mt-1 mb-4 bg-dark text-light rounded d-flex justify-content-center align-items-center"
      style={{
        maxWidth: "800px",
        minHeight: "100px",
        boxShadow: "0px 5px 10px 10px rgba(0,0,0,0.2)",
      }}
    >
      <Container>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>
                <strong>{title}</strong>
              </Form.Label>
              <Form.Select
                style={selectStyle}
                value={value}
                onChange={onChange}
              >
                {options}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Label>
              <strong>Search a Support</strong>
            </Form.Label>
            <SearchBar
              onSearch={handleSearch}
              data={filteredData}
              onChange={onChange}
              searchSelect={searchSelect}
            />
          </Col>
        </Row>
        <Row>
          <Col>{children}</Col>
        </Row>
      </Container>
    </div>
  );
}
