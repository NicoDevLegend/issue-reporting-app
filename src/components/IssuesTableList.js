import Table from "react-bootstrap/Table";
import data from "../data.json";

export default function IssuesTableList() {
  return (
    <div className="mx-2 mb-auto" style={{ overflow: "auto", height: "auto", maxHeight: "15em"  }}>
      <Table striped bordered hover variant="dark" className="mb-0">
        <thead>
          <tr>
            <th>Issue No</th>
            <th>Status</th>
            <th>Description</th>
            <th>Category</th>
            <th>Priority</th>
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
