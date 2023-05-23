import { useLocation } from "react-router-dom";
import useAxiosGet from "../services/ServiceAxiosGet";

export default function CheckTicket() {
  const location = useLocation();
  const Issue = location.state || {};
  const [dataUser] = useAxiosGet(
    `${process.env.REACT_APP_SERVICE_API}/${Issue.ReportedBy}/user`
  );

  return (
    <div className="d-grid align-content-start">
      <h1
        className="p-2 mx-auto mt-5 mb-4 bg-dark text-info border border-secondary border-opacity-25 border-3 rounded"
        style={{
          boxShadow: "0px 5px 5px 5px rgba(0,0,0,0.2)",
        }}
      >
        <strong>Check Ticket</strong>
      </h1>
      <div
        className="p-5 w-75 text-center mx-auto mt-3 mb-5 bg-dark text-light d-flex justify-content-center flex-column rounded"
        style={{
          maxWidth: "600px",
          boxShadow: "0px 5px 10px 10px rgba(0,0,0,0.2)",
        }}
      >
        <h4 className="mb-5">
          <strong>
            Issue No: <span className="text-info">{Issue.IssueNo || ""}</span>
          </strong>
        </h4>
        <h5 className="mb-4">
          <strong>
            Status:{" "}
            <span
              className={
                Issue.Status === "Not Resolved" ? "text-danger" : "text-success"
              }
            >
              {Issue.Status || ""}
            </span>
          </strong>
        </h5>
        <h5 className="mb-3">
          <strong>Description: </strong>{" "}
        </h5>
        <p className="mb-4">{Issue.Description || ""}</p>
        <h5 className="mb-4">
          <strong>
            Category: <span>{Issue.Category || ""}</span>
          </strong>
        </h5>
        <h5 className="mb-4">
          <strong>
            Priority:{" "}
            <span
              className={
                Issue.Priority === "Important"
                  ? "text-success"
                  : Issue.Priority === "Very Important"
                  ? "text-warning"
                  : "danger"
              }
            >
              {Issue.Priority || ""}
            </span>
          </strong>
        </h5>
        <h5 className="mb-3">
          <strong>
            Reported by: <span>{dataUser?.username || ""}</span>
          </strong>
        </h5>
        <h5 className="mb-3">
          <strong>Open:</strong>
        </h5>
        <p className="mb-4">{Issue.Open || ""}</p>
        <h5 className="mb-3">
          <strong>Closed:</strong>
        </h5>
        <p className="mb-4">{Issue.Closed || ""}</p>
      </div>
    </div>
  );
}
