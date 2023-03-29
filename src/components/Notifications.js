import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";

export default function Notifications() {

  return (
    <div>
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-container="body"
        data-bs-toggle="popover"
        data-bs-placement="bottom"
        data-bs-content="Bottom popover"
      >
        Popover on bottom
      </button>

      <FontAwesomeIcon
        icon={faBell}
        style={{
          width: "20px",
          height: "20px",
          cursor: "pointer",
        }}
      />
    </div>
  );
}
