import { useState } from "react";
import Table from "react-bootstrap/Table";
import data from "../data.json";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";

export default function IssuesTableList() {
  const [value, setValue] = useState(null);
  const [filter, setFilter] = useState();

  console.log(filter);

  return (
    <div
      className="container bg-dark"
      style={{ overflow: "auto", minHeight: "300px" }}
    >
      <div className="w-100" style={{ height: "40px" }}>
        {value && (
          <Button
            variant="secondary"
            className="position-relative"
            style={{
              top: "0",
              right: "30%",
            }}
            onClick={() => setValue(null)}
          >
            <FontAwesomeIcon icon={faRotateLeft} />
          </Button>
        )}
      </div>
      <Table striped bordered hover variant="dark" className="mb-0">
        <thead className="align-middle text-info">
          <tr>
            <th>Issue No</th>
            <th>
              <Dropdown onSelect={(selectedKey) => setValue(selectedKey)}>
                <Dropdown.Toggle variant="dark" className="text-info">
                  <strong>Status</strong>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    eventKey="Not Resolved"
                    onClick={() => {
                      setFilter("Status");
                    }}
                  >
                    Not Resolved
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="Resolved"
                    onClick={() => {
                      setFilter("Status");
                    }}
                  >
                    Resolved
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </th>
            <th>Description</th>
            <th>
              <Dropdown onSelect={(selectedKey) => setValue(selectedKey)}>
                <Dropdown.Toggle variant="dark" className="text-info">
                  <strong>Category</strong>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    eventKey="1"
                    onClick={() => {
                      setFilter("Category");
                    }}
                  >
                    1
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="2"
                    onClick={() => {
                      setFilter("Category");
                    }}
                  >
                    2
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="3"
                    onClick={() => {
                      setFilter("Category");
                    }}
                  >
                    3
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </th>
            <th>
              <Dropdown onSelect={(selectedKey) => setValue(selectedKey)}>
                <Dropdown.Toggle variant="dark" className="text-info">
                  <strong>Priority</strong>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    eventKey="Important"
                    onClick={() => {
                      setFilter("Priority");
                    }}
                  >
                    Important
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="Very Important"
                    onClick={() => {
                      setFilter("Priority");
                    }}
                  >
                    Very Important
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="Urgent"
                    onClick={() => {
                      setFilter("Priority");
                    }}
                  >
                    Urgent
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </th>
            <th>Assignee</th>
            <th>
              <Dropdown>
                <Dropdown.Toggle variant="dark" className="text-info">
                  <strong>Open</strong>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="">Newest</Dropdown.Item>
                  <Dropdown.Item eventKey="">Oldest</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </th>
            <th>
              <Dropdown>
                <Dropdown.Toggle variant="dark" className="text-info">
                  <strong>Close</strong>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="">Newest</Dropdown.Item>
                  <Dropdown.Item eventKey="">Oldest</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.IssueList && !value ? (
            data.IssueList.map((issue, index) => (
              <tr key={index}>
                <td>{issue.IssueNo}</td>
                <td>{issue.Status}</td>
                <td>{issue.Description}</td>
                <td>{issue.Category}</td>
                <td>{issue.Priority}</td>
                <td>{issue.Assignee}</td>
                <td>{issue.Open}</td>
                <td>{issue.Close}</td>
              </tr>
            ))
          ) : value ? (
            data.IssueList.filter(
              (issue) =>
                (filter === "Status" && issue.Status === value) ||
                (filter === "Category" && issue.Category === value) ||
                (filter === "Priority" && issue.Priority === value)
            ).map((issue, index) => (
              <tr key={index}>
                <td>{issue.IssueNo}</td>
                <td>{issue.Status}</td>
                <td>{issue.Description}</td>
                <td>{issue.Category}</td>
                <td>{issue.Priority}</td>
                <td>{issue.Assignee}</td>
                <td>{issue.Open}</td>
                <td>{issue.Close}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8}>
                <h3>There aren’t any open issues.</h3>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
