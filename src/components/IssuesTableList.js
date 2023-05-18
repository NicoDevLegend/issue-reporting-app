import { useState } from "react";
import { DefinedRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Table, Dropdown, Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import useAxiosGet from "../services/ServiceAxiosGet";
import { useAuth0 } from "@auth0/auth0-react";
import { originalColors } from "../Utilities/originalColors";
import TableUserHeader from "./TableUserHeader";
import TableUserData from "./TableUserData";

export default function IssuesTableList() {
  const [filteredData, setFilteredData] = useState(null);
  const [value, setValue] = useState(null);
  const [filter, setFilter] = useState();
  const { user } = useAuth0();
  const [data] = useAxiosGet(`${process.env.REACT_APP_SERVICE_API}/ticket/${user.sub}`);
  const [filterColor, setFilterColor] = useState(originalColors);

  const handleOpenSelect = (date) => {
    let filtered = data.filter((issue) => {
      let issueOpenDate = new Date(issue.Open);
      return (
        issueOpenDate >= date.selection.startDate &&
        issueOpenDate <= date.selection.endDate
      );
    });
    setSelectionRange([date.selection]);
    setFilteredData(filtered);
    setFilterColor({
      ...originalColors,
      Open: "text-light",
    });
    setValue("Open");
  };

  const handleCloseSelect = (date) => {
    let filtered = data.filter((issue) => {
      let issueCloseDate = new Date(issue.Close);
      return (
        issueCloseDate >= date.selection.startDate &&
        issueCloseDate <= date.selection.endDate
      );
    });
    setSelectionRange([date.selection]);
    setFilteredData(filtered);
    setFilterColor({
      ...originalColors,
      Close: "text-light",
    });
    setValue("Close");
  };

  const [selectionRange, setSelectionRange] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  return (
    <div
      className="container bg-dark mb-1"
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
              setFilteredData(null);
              setValue(null);
              setFilterColor(originalColors);
            }}
          >
            <FontAwesomeIcon icon={faRotateLeft} />
          </Button>
        )}
      </div>
      <Table bordered variant="dark" className="mb-2">
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
            <TableUserHeader userSub={user.sub} />
            <th>
              <Dropdown>
                <Dropdown.Toggle variant="dark" className={filterColor.Open}>
                  <strong>Open</strong>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item className="p-0">
                    <DefinedRange
                      onChange={handleOpenSelect}
                      inputRanges={[]}
                      ranges={selectionRange}
                    />
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </th>
            <th>
              <Dropdown>
                <Dropdown.Toggle variant="dark" className={filterColor.Close}>
                  <strong>Close</strong>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item className="p-0">
                    <DefinedRange
                      onChange={handleCloseSelect}
                      inputRanges={[]}
                      ranges={selectionRange}
                    />
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </th>
          </tr>
        </thead>
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
                    <td className={originalColors.NotResolved}>
                      {issue.Status}
                    </td>
                  )}
                  <td>{issue.Description}</td>
                  <td>{issue.Category}</td>
                  {issue.Priority === "Important" ? (
                    <td className={originalColors.Important}>
                      {issue.Priority}
                    </td>
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
            data.filter(
              (issue) =>
                (filter === "Status" && issue.Status === value) ||
                (filter === "Category" && issue.Category === value) ||
                (filter === "Priority" && issue.Priority === value)
            ).map((issue, index) => {
              let dateOpen = new Date(issue.Open);
              let dateClose = new Date(issue.Close);
              return (
                <tr key={index}>
                  <td>{issue.IssueNo}</td>
                  {issue.Status === "Resolved" ? (
                    <td className={originalColors.Resolved}>{issue.Status}</td>
                  ) : (
                    <td className={originalColors.NotResolved}>
                      {issue.Status}
                    </td>
                  )}
                  <td>{issue.Description}</td>
                  <td>{issue.Category}</td>
                  {issue.Priority === "Important" ? (
                    <td className={originalColors.Important}>
                      {issue.Priority}
                    </td>
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
                    <td className={originalColors.NotResolved}>
                      {issue.Status}
                    </td>
                  )}
                  <td>{issue.Description}</td>
                  <td>{issue.Category}</td>
                  {issue.Priority === "Important" ? (
                    <td className={originalColors.Important}>
                      {issue.Priority}
                    </td>
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
                    <td className={originalColors.NotResolved}>
                      {issue.Status}
                    </td>
                  )}
                  <td>{issue.Description}</td>
                  <td>{issue.Category}</td>
                  {issue.Priority === "Important" ? (
                    <td className={originalColors.Important}>
                      {issue.Priority}
                    </td>
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
                <Spinner animation="border" variant="secondary">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
