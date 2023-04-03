import Table from "react-bootstrap/Table";
import data from "../data.json";
import Dropdown from "react-bootstrap/Dropdown";

export default function IssuesTableList() {
  return (
    <div className="container" style={{ overflow: "auto" }}>
      <Table striped bordered hover variant="dark" className="mb-0">
        <thead className="align-middle">
          <tr>
            <th>Issue No</th>
            <th>
              <Dropdown>
                <Dropdown.Toggle
                  variant="dark"
                >
                  <strong>Status</strong>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Not Resolved</Dropdown.Item>
                  <Dropdown.Item>Resolved</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </th>
            <th>Description</th>
            <th><Dropdown>
                <Dropdown.Toggle
                  variant="dark"
                >
                  <strong>Category</strong>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>1</Dropdown.Item>
                  <Dropdown.Item>2</Dropdown.Item>
                  <Dropdown.Item>3</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown></th>
            <th><Dropdown>
                <Dropdown.Toggle
                  variant="dark"
                >
                  <strong>Priority</strong>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Important</Dropdown.Item>
                  <Dropdown.Item>Very Important</Dropdown.Item>
                  <Dropdown.Item>Urgent</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown></th>
            <th>Assignee</th>
            <th>Open</th>
            <th>Close</th>
          </tr>
        </thead>
        <tbody>
          {data.IssueList ? (
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
          ) : (
            <div className="m-5">There aren’t any open issues.</div>
          )}
        </tbody>
      </Table>
    </div>
  );
}
