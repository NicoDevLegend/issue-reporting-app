import { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Table } from "react-bootstrap";
import useAxiosGet from "../services/ServiceAxiosGet";
import { useAuth0 } from "@auth0/auth0-react";
import { originalColors } from "../Utilities/originalColors";
import TBodyUser from "./TBodyUser";
import THeadAll from "./THeadAll";
import ResetTableButton from "./ResetTableButton";

export default function IssuesTableList() {
  const [filteredData, setFilteredData] = useState(null);
  const [value, setValue] = useState(null);
  const [filter, setFilter] = useState();
  const { user } = useAuth0();
  const role = user["https://my-app/roles"][0];
  const param =
    role === "User" ? "user" : role === "Support" ? "support" : "admin";

  const [data] = useAxiosGet(
    `${process.env.REACT_APP_SERVICE_API}/ticket/${user.sub}/${param}`
  );

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
      className="container bg-dark mb-3"
      style={{ overflow: "auto", minHeight: "300px" }}
    >
      <div className="w-100" style={{ height: "50px" }}>
        {value && (
          <ResetTableButton
            setFilteredData={setFilteredData}
            setValue={setValue}
            setFilterColor={setFilterColor}
          />
        )}
      </div>
      <Table bordered hover variant="dark" className="mb-2" >
        <THeadAll
          setValue={setValue}
          filterColor={filterColor}
          setFilter={setFilter}
          setFilterColor={setFilterColor}
          handleOpenSelect={handleOpenSelect}
          handleCloseSelect={handleCloseSelect}
          selectionRange={selectionRange}
        />
        <TBodyUser
          data={data}
          value={value}
          filter={filter}
          filteredData={filteredData}
        />
      </Table>
    </div>
  );
}
