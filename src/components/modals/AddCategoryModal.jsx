import { Modal, Button, Form } from "react-bootstrap";

const AddCategoryModal = ({
  show,
  onClose,
  onSubmit,
  categoryName,
  setCategoryName,
  isEdit = false,
}) => (
  <Modal show={show} onHide={onClose} centered>
    <Modal.Header closeButton>
      <Modal.Title>{isEdit ? "Edit Category" : "Add Category"}</Modal.Title>
    </Modal.Header>
    <Form onSubmit={onSubmit}>
      <Modal.Body>
        <Form.Control
          type="text"
          placeholder="Enter category name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {isEdit ? "Update" : "Add"}
        </Button>
      </Modal.Footer>
    </Form>
  </Modal>
);

export default AddCategoryModal;
