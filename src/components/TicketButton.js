import { useState } from "react";
import { Button } from "react-bootstrap";
import ConfirmationModal from "./ConfirmationModal";

export default function TicketButton({ handleClick, variant, name }) {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Button
        variant={variant}
        className="mt-5"
        onClick={() => setModalShow(true)}
      >
        {name}
      </Button>
      <ConfirmationModal
        name={name}
        variant={variant}
        handleClick={handleClick}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
