import Table from "react-bootstrap/Table";
import data from "../data.json";

export default function IssuesTableList() {
  return (
    <Table striped bordered hover variant="dark" responsive>
      <thead>
        <tr>
          <th>Issue No</th>
          <th>Status</th>
          <th>Description</th>
          <th>Catogory</th>
          <th>Priority</th>
          <th>Assignee</th>
          <th>Open</th>
          <th>Close</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.IssueList.map((issue, index) => 
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
          )}
      </tbody>
    </Table>
  );
}
