import { Button, Modal } from "react-bootstrap";

export default function ConfirmationModal(props) {
  let param = "";
  if (props.name === "Close Ticket") {
    param = "close";
  } else if (props.name === "Re-Open Ticket") {
    param = "re-open";
  } else if (props.name === 'Re-Open as "In Progress"') {
    param = 're-open as "In Progress"';
  } else {
    param = 'mark as "In Progress"';
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h4 className="color-success">{props.name}</h4>
        <p>{`Are you sure you want to ${param} the current ticket?`}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="secondary">
          Close
        </Button>
        <Button onClick={props.handleClick} variant={props.variant}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
