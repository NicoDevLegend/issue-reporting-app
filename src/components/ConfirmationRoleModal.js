import { Button, Modal } from "react-bootstrap";

export default function ConfirmationRoleModal(props) {
  const AssignAndClose = () => {
    props.onHide();
    props.handleclick();
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h4 className="color-success">Role Assignment</h4>
        <p>
          Are you sure you want to assign <strong>{props.name}</strong> role to
          this account?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="secondary">
          Close
        </Button>
        <Button onClick={AssignAndClose} variant="danger">
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
