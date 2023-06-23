import { useState } from "react";
import { Button } from "react-bootstrap";
import ConfirmationRoleModal from "./ConfirmationRoleModal";

export default function RoleButton({ handleclick, name, title, disabled }) {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Button
        variant="info"
        className="mx-auto my-4"
        onClick={() => setModalShow(true)}
        disabled={disabled}
      >
        {title}
      </Button>
      <ConfirmationRoleModal
        name={name}
        handleclick={handleclick}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
