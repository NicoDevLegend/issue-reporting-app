import { Spinner } from "react-bootstrap";
import { originalColors } from "../Utilities/originalColors";
import TableUserData from "./TableUserData";

export default function TBodyUser({ data, value, filter, filteredData }) {
  return (
    <tbody>
      {data && data.length !== 0 && !value ? (
        data.map((issue, index) => {
          let dateOpen = new Date(issue.Open);
          let dateClose = new Date(issue.Close);
          return (
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
                <td className={originalColors.Important}>{issue.Priority}</td>
              ) : issue.Priority === "Very Important" ? (
                <td className={originalColors.VeryImportant}>
                  {issue.Priority}
                </td>
              ) : (
                <td className={originalColors.Urgent}>{issue.Priority}</td>
              )}
              <TableUserData userID={issue.AssigneeID} />
              <td>{dateOpen.toLocaleDateString()}</td>
              <td>
                {dateClose.toLocaleDateString() === "Invalid Date"
                  ? ""
                  : dateClose.toLocaleDateString()}
              </td>
            </tr>
          );
        })
      ) : value && value !== "Open" ? (
        data
          .filter(
            (issue) =>
              (filter === "Status" && issue.Status === value) ||
              (filter === "Category" && issue.Category === value) ||
              (filter === "Priority" && issue.Priority === value)
          )
          .map((issue, index) => {
            let dateOpen = new Date(issue.Open);
            let dateClose = new Date(issue.Close);
            return (
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
                  <td className={originalColors.Important}>{issue.Priority}</td>
                ) : issue.Priority === "Very Important" ? (
                  <td className={originalColors.VeryImportant}>
                    {issue.Priority}
                  </td>
                ) : (
                  <td className={originalColors.Urgent}>{issue.Priority}</td>
                )}
                <TableUserData userID={issue.AssigneeID} />
                <td>{dateOpen.toLocaleDateString()}</td>
                <td>
                  {dateClose.toLocaleDateString() === "Invalid Date"
                    ? ""
                    : dateClose.toLocaleDateString()}
                </td>
              </tr>
            );
          })
      ) : filteredData && filteredData !== [] && value === "Open" ? (
        filteredData.map((issue, index) => {
          let dateOpen = new Date(issue.Open);
          let dateClose = new Date(issue.Close);
          return (
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
                <td className={originalColors.Important}>{issue.Priority}</td>
              ) : issue.Priority === "Very Important" ? (
                <td className={originalColors.VeryImportant}>
                  {issue.Priority}
                </td>
              ) : (
                <td className={originalColors.Urgent}>{issue.Priority}</td>
              )}
              <TableUserData userID={issue.AssigneeID} />
              <td>{dateOpen.toLocaleDateString()}</td>
              <td>
                {dateClose.toLocaleDateString() === "Invalid Date"
                  ? ""
                  : dateClose.toLocaleDateString()}
              </td>
            </tr>
          );
        })
      ) : filteredData && filteredData !== [] && value === "Close" ? (
        filteredData.map((issue, index) => {
          let dateOpen = new Date(issue.Open);
          let dateClose = new Date(issue.Close);
          return (
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
                <td className={originalColors.Important}>{issue.Priority}</td>
              ) : issue.Priority === "Very Important" ? (
                <td className={originalColors.VeryImportant}>
                  {issue.Priority}
                </td>
              ) : (
                <td className={originalColors.Urgent}>{issue.Priority}</td>
              )}
              <TableUserData userID={issue.AssigneeID} />
              <td>{dateOpen.toLocaleDateString()}</td>
              <td>
                {dateClose.toLocaleDateString() === "Invalid Date"
                  ? ""
                  : dateClose.toLocaleDateString()}
              </td>
            </tr>
          );
        })
      ) : data && data.length === 0 && !value ? (
        <tr>
          <td colSpan={8}>
            <h3>There aren’t any open issues.</h3>
          </td>
        </tr>
      ) : (
        <tr>
          <td colSpan={8}>
            <Spinner animation="border" variant="secondary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </td>
        </tr>
      )}
    </tbody>
  );
}
