import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { DefinedRange } from "react-date-range";
import { originalColors } from "../Utilities/originalColors";
import TableUserHeader from "./TableUserHeader";

export default function THeadAll({
  data,
  setValue,
  filterColor,
  setFilter,
  setFilterColor,
  handleOpenSelect,
  handleClosedSelect,
  selectionRange,
  role,
  userId,
}) {
  const newDataArray = data?.reduce((acc, issue) => {
    const key = issue.Category;
    if (!acc[key]) {
      acc[key] = issue;
    }
    return acc;
  }, {});

  var categoriesArray = {};

  if (data) {
    categoriesArray = Object.values(newDataArray);
  }

  return (
    <thead className="align-middle text-info">
      <tr>
        <th className="text-info">Issue No</th>
        <th className="text-info">
          <FontAwesomeIcon
            icon={faPaperclip}
            style={{
              width: "15px",
              height: "15px",
            }}
          />
        </th>
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
                eventKey="In Progress"
                onClick={() => {
                  setFilter("Status");
                  setFilterColor({
                    ...originalColors,
                    Status: "text-warning",
                  });
                }}
              >
                In Progress
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
        <th className="text-info">Description</th>
        <th>
          <Dropdown onSelect={(selectedKey) => setValue(selectedKey)}>
            <Dropdown.Toggle variant="dark" className={filterColor.Category}>
              <strong>Category</strong>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {data &&
                categoriesArray?.map((category, index) => (
                  <Dropdown.Item
                    key={index}
                    eventKey={category.Category}
                    onClick={() => {
                      setFilter("Category");
                      setFilterColor({
                        ...originalColors,
                        Category: "text-light",
                      });
                    }}
                  >
                    {category.Category}
                  </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown>
        </th>
        <th>
          <Dropdown onSelect={(selectedKey) => setValue(selectedKey)}>
            <Dropdown.Toggle variant="dark" className={filterColor.Priority}>
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
        <TableUserHeader role={role} userId={userId} />
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
            <Dropdown.Toggle variant="dark" className={filterColor.Closed}>
              <strong>Closed</strong>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item className="p-0">
                <DefinedRange
                  onChange={handleClosedSelect}
                  inputRanges={[]}
                  ranges={selectionRange}
                />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </th>
      </tr>
    </thead>
  );
}
