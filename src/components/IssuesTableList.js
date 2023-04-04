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

  const originalColors = {
    Status: "text-info",
    NotResolved: "bg-danger",
    Resolved: "bg-success",
    Category: "text-info",
    Priority: "text-info",
    Important: "text-success",
    VeryImportant: "text-warning",
    Urgent: "text-danger",
    Open: "text-info",
    Close: "text-info",
  };

  const [filterColor, setFilterColor] = useState(originalColors);

  return (
    <div
      className="container bg-dark"
      style={{ overflow: "auto", minHeight: "300px" }}
    >
      <div className="w-100" style={{ height: "50px" }}>
        {value && (
          <Button
            variant="primary"
            className="position-relative"
            style={{
              top: "5px",
              right: "30%",
            }}
            onClick={() => {
              setValue(null);
              setFilterColor(originalColors);
            }}
          >
            <FontAwesomeIcon icon={faRotateLeft} />
          </Button>
        )}
      </div>
      <Table bordered variant="dark" className="mb-0">
        <thead className="align-middle text-info">
          <tr>
            <th>Issue No</th>
            <th>
              <Dropdown onSelect={(selectedKey) => setValue(selectedKey)}>
                <Dropdown.Toggle variant="dark" className={filterColor.Status}>
                  <strong>Status</strong>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    eventKey="Not Resolved"
                    onClick={() => {
                      setFilter("Status");
                      setFilterColor({
                        ...originalColors,
                        Status: "text-danger",
                      });
                    }}
                  >
                    Not Resolved
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="Resolved"
                    onClick={() => {
                      setFilter("Status");
                      setFilterColor({
                        ...originalColors,
                        Status: "text-success",
                      });
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
                <Dropdown.Toggle
                  variant="dark"
                  className={filterColor.Category}
                >
                  <strong>Category</strong>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    eventKey="1"
                    onClick={() => {
                      setFilter("Category");
                      setFilterColor({
                        ...originalColors,
                        Category: "text-light",
                      });
                    }}
                  >
                    1
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="2"
                    onClick={() => {
                      setFilter("Category");
                      setFilterColor({
                        ...originalColors,
                        Category: "text-light",
                      });
                    }}
                  >
                    2
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="3"
                    onClick={() => {
                      setFilter("Category");
                      setFilterColor({
                        ...originalColors,
                        Category: "text-light",
                      });
                    }}
                  >
                    3
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </th>
            <th>
              <Dropdown onSelect={(selectedKey) => setValue(selectedKey)}>
                <Dropdown.Toggle
                  variant="dark"
                  className={filterColor.Priority}
                >
                  <strong>Priority</strong>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    eventKey="Important"
                    onClick={() => {
                      setFilter("Priority");
                      setFilterColor({
                        ...originalColors,
                        Priority: "text-success",
                      });
                    }}
                  >
                    Important
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="Very Important"
                    onClick={() => {
                      setFilter("Priority");
                      setFilterColor({
                        ...originalColors,
                        Priority: "text-warning",
                      });
                    }}
                  >
                    Very Important
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="Urgent"
                    onClick={() => {
                      setFilter("Priority");
                      setFilterColor({
                        ...originalColors,
                        Priority: "text-danger",
                      });
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
                <Dropdown.Toggle variant="dark" className={filterColor.Open}>
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
                <Dropdown.Toggle variant="dark" className={filterColor.Close}>
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
                {issue.Status === "Resolved" ? (
                  <td className={originalColors.Resolved}>{issue.Status}</td>
                ) : (
                  <td className={originalColors.NotResolved}>{issue.Status}</td>
                )}
                <td>{issue.Description}</td>
                <td>{issue.Category}</td>
                {issue.Priority === "Important" ? (
                  <td
                    className={originalColors.Important}
                    style={{ hover: "inherit" }}
                  >
                    {issue.Priority}
                  </td>
                ) : issue.Priority === "Very Important" ? (
                  <td
                    className={originalColors.VeryImportant}
                    style={{ hover: "inherit" }}
                  >
                    {issue.Priority}
                  </td>
                ) : (
                  <td
                    className={originalColors.Urgent}
                    style={{ hover: "inherit" }}
                  >
                    {issue.Priority}
                  </td>
                )}
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
                {issue.Status === "Resolved" ? (
                  <td className={originalColors.Resolved}>{issue.Status}</td>
                ) : (
                  <td className={originalColors.NotResolved}>{issue.Status}</td>
                )}
                <td>{issue.Description}</td>
                <td>{issue.Category}</td>
                {issue.Priority === "Important" ? (
                  <td
                    className={originalColors.Important}
                    style={{ hover: "inherit" }}
                  >
                    {issue.Priority}
                  </td>
                ) : issue.Priority === "Very Important" ? (
                  <td
                    className={originalColors.VeryImportant}
                    style={{ hover: "inherit" }}
                  >
                    {issue.Priority}
                  </td>
                ) : (
                  <td
                    className={originalColors.Urgent}
                    style={{ hover: "inherit" }}
                  >
                    {issue.Priority}
                  </td>
                )}
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
