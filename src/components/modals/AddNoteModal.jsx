import { Modal, Button, Form } from "react-bootstrap";

const AddNoteModal = ({
  show,
  onClose,
  title,
  setTitle,
  content,
  setContent,
  onSubmit,
  isEdit = false,
}) => (
  <Modal show={show} onHide={onClose} centered>
    <Modal.Header closeButton>
      <Modal.Title>{isEdit ? "Edit Note" : "Add Note"}</Modal.Title>
    </Modal.Header>
    <Form onSubmit={onSubmit}>
      <Modal.Body>
        <Form.Control
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-3"
          required
        />
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button type="submit" variant="primary">
          {isEdit ? "Update" : "Add"}
        </Button>
      </Modal.Footer>
    </Form>
  </Modal>
);

export default AddNoteModal;
