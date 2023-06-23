import { useState } from "react";
import { Form } from "react-bootstrap";

export default function SearchBar({ onSearch, data, onChange, searchSelect }) {
  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setSearch(e.target.value);
    onSearch(searchTerm);
  };

  const handleClick = (index, user) => {
    searchSelect(user.userID);
    setSearch("");
    setSearchTerm("");
    if (onChange) {
      onChange(index);
    }
  };

  return (
    <div className="mx-auto d-flex justify-content-center">
      <Form>
        <Form.Control
          type="text"
          value={searchTerm}
          placeholder="Search"
          onChange={handleInputChange}
        />
        {search !== "" && (
          <div
            className="p-2 position-absolute bg-light text-dark text-start rounded-1"
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
                <div
                  key={index}
                  value={index}
                  onClick={() => handleClick(index, user)}
                  style={{ cursor: "pointer" }}
                >
                  {!user.firstName || !user.lastName
                    ? user.username
                    : `${user.username} (${user.firstName} ${user.lastName})`}
                </div>
              );
            })}
          </div>
        )}
      </Form>
    </div>
  );
}
