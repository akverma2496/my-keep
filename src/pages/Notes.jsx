// src/pages/Notes.jsx
import { useEffect, useState } from "react";
import { Button, Spinner, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchNotes, createNote, deleteNote, editNote } from "../redux/actions/noteActions";
import NoteCard from "../components/cards/NoteCard";
import AddNoteModal from "../components/modals/AddNoteModal";
import ViewNoteModal from "../components/modals/ViewNoteModal";

const Notes = () => {
  const { id: categoryId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((s) => s.auth);
  const { notes, loading } = useSelector((s) => s.note);

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (token && user?.localId && categoryId)
      dispatch(fetchNotes(token, user.localId, categoryId));
  }, [dispatch, token, user, categoryId]);

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    if (isEdit && selectedNote) {
      dispatch(editNote(token, user.localId, categoryId, selectedNote.id, { title, content }));
    } else {
      dispatch(createNote(token, user.localId, categoryId, { title, content }));
    }

    resetForm();
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this note?"))
      dispatch(deleteNote(token, user.localId, categoryId, id));
  };

  const handleEdit = (note) => {
    setIsEdit(true);
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
    setShowModal(true);
  };

  const handleView = (note) => {
    setSelectedNote(note);
    setShowViewModal(true);
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
    setIsEdit(false);
    setShowModal(false);
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center gap-3">
          <Button variant="outline-secondary" size="sm" onClick={() => navigate("/categories")}>
            ← Back
          </Button>
          <h3 className="m-0">Notes</h3>
        </div>
        <Button onClick={() => setShowModal(true)}>+ Add Note</Button>
      </div>

      {loading ? (
        <div className="text-center py-5"><Spinner animation="border" /></div>
      ) : notes.length > 0 ? (
        <Row xs={1} sm={2} md={3} lg={4} className="g-3">
          {notes.map((note) => (
            <Col key={note.id}>
              <NoteCard
                note={note}
                onDelete={handleDelete}
                onEdit={() => handleEdit(note)}
                onView={() => handleView(note)}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-center text-muted">No notes yet.</p>
      )}

      <AddNoteModal
        show={showModal}
        onClose={resetForm}
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        onSubmit={handleAddNote}
        isEdit={isEdit}
      />

      <ViewNoteModal
        show={showViewModal}
        onClose={() => setShowViewModal(false)}
        note={selectedNote}
      />
    </div>
  );
};

export default Notes;
