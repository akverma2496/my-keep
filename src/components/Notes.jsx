// src/pages/Notes.jsx
import { useEffect, useState } from "react";
import { Button, Modal, Form, Card, Spinner, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchNotes, createNote, deleteNote } from "../redux/actions/noteActions";

const Notes = () => {
  const { id: categoryId } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);
  const { notes, loading } = useSelector((s) => s.note);

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (user?.idToken && user?.localId) {
      dispatch(fetchNotes(user.idToken, user.localId, categoryId));
    }
  }, [dispatch, user, categoryId]);

  const handleAddNote = (e) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      dispatch(createNote(user.idToken, user.localId, categoryId, { title, content }));
      setTitle(""); setContent(""); setShowModal(false);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this note?")) {
      dispatch(deleteNote(user.idToken, user.localId, categoryId, id));
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Notes</h3>
        <Button onClick={() => setShowModal(true)}>+ Add Note</Button>
      </div>

      {loading ? (
        <div className="text-center py-5"><Spinner animation="border" /></div>
      ) : notes.length > 0 ? (
        <Row xs={1} sm={2} md={3} lg={4} className="g-3">
          {notes.map((note) => (
            <Col key={note.id}>
              <Card className="shadow-sm p-3 h-100">
                <Card.Title>{note.title}</Card.Title>
                <Card.Text>{note.content}</Card.Text>
                <Button variant="outline-danger" size="sm" onClick={() => handleDelete(note.id)}>🗑</Button>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-center text-muted">No notes yet.</p>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton><Modal.Title>Add Note</Modal.Title></Modal.Header>
        <Form onSubmit={handleAddNote}>
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
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Add</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Notes;
