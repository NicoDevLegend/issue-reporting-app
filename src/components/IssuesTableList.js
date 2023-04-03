import { useState } from "react";
import Table from "react-bootstrap/Table";
import data from "../data.json";
import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTashUndo } from "@fortawesome/free-solid-svg-icons";

export default function IssuesTableList() {
  const [value, setValue] = useState(null);

  console.log(value);

  return (
    <div className="container" style={{ overflow: "auto" }}>
      <div className="w-100" style={{ height: "40px" }}>
        {value && (
          <FontAwesomeIcon
          icon={faTashUndo}
          className="position-relative"
          style={{
            width: "20px",
            height: "20px",
            cursor: "pointer",
            color: "gray",
            top: "0", 
            right: "30%"
          }}
            onClick={() => setValue(null)}
          />
        )}
      </div>
      <Table striped bordered hover variant="dark" className="mb-0">
        <thead className="align-middle">
          <tr>
            <th>Issue No</th>
            <th>
              <Dropdown onSelect={(selectedKey) => setValue(selectedKey)}>
                <Dropdown.Toggle variant="dark">
                  <strong>Status</strong>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="Not Resolved">
                    Not Resolved
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="Resolved">Resolved</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </th>
            <th>Description</th>
            <th>
              <Dropdown>
                <Dropdown.Toggle variant="dark">
                  <strong>Category</strong>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="1">1</Dropdown.Item>
                  <Dropdown.Item eventKey="2">2</Dropdown.Item>
                  <Dropdown.Item eventKey="3">3</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </th>
            <th>
              <Dropdown>
                <Dropdown.Toggle variant="dark">
                  <strong>Priority</strong>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="Important">Important</Dropdown.Item>
                  <Dropdown.Item eventKey="Very Important">
                    Very Important
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="Urgent">Urgent</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </th>
            <th>Assignee</th>
            <th>
              <Dropdown>
                <Dropdown.Toggle variant="dark">
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
                <Dropdown.Toggle variant="dark">
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
            data.IssueList.filter((issue) => issue.Status === value).map(
              (issue, index) => (
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
              )
            )
          ) : (
            <div className="m-5">There aren’t any open issues.</div>
          )}
        </tbody>
      </Table>
    </div>
  );
}
