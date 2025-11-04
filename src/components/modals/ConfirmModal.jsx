import { Modal, Button } from "react-bootstrap";

const ConfirmModal = ({ show, onClose, onConfirm, message }) => (
  <Modal show={show} onHide={onClose} centered>
    <Modal.Body>
      <p>{message || "Are you sure you want proceed?"}</p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onClose}>
        Cancel
      </Button>
      <Button variant="danger" onClick={onConfirm}>
        Confirm
      </Button>
    </Modal.Footer>
  </Modal>
);

export default ConfirmModal;
