import { Button, Form, Modal } from "react-bootstrap";

export default function ChangePictureModal(props) {
  return (
    <Modal {...props}>
      <Modal.Header closeButton>
        <Modal.Title>Change your picture</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button
          className="mb-3"
          variant="danger"
          type="submit"
          onClick={props.handlerestore}
        >
          Delete current picture
        </Button>
        <Form id="image-form">
          <Form.Group
            controlId="formFile"
            className="p-2 mb-3 border border-dark rounded"
          >
            <Form.Label>Browse a local image</Form.Label>
            <Form.Control
              type="file"
              id="file"
              onChange={props.handleselect}
              accept=".jpg"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handlecancel}>
          Cancel
        </Button>
        <Button
          variant="primary"
          form="image-form"
          type="submit"
          onClick={props.handleconfirm}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
