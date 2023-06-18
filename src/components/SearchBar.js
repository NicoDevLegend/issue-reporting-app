import { useState } from "react";
import { Form } from "react-bootstrap";

export default function SearchBar({ onSearch, data }) {
  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setSearch(e.target.value);
    onSearch(searchTerm);
  };

  return (
    <div className="d-flex">
      <Form.Control
        type="text"
        value={searchTerm}
        placeholder="Search"
        onChange={handleInputChange}
      />
      {search !== "" && (
        <div
          className="p-2 mt-5 position-absolute bg-light text-dark text-start rounded-1"
          style={{
            width: "25%",
            zIndex: "30",
            minHeight: "50px",
            maxHeight: "300px",
            overflowX: "auto",
            scrollbarWidth: "thin",
          }}
        >
          {data?.map((user, index) => {
            return (
              <div key={index}>
                {!user.firstName || !user.lastName
                  ? user.username
                  : `${user.username} (${user.firstName} ${user.lastName})`}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
