import { Card, Button } from "react-bootstrap";

const NoteCard = ({ note, onDelete, onEdit, onView }) => {
  const handleCardClick = (event) => {
    if (event.target.closest("button")) return;
    onView();
  };

  return (
    <Card className="shadow-sm p-3 h-100" onClick={handleCardClick}>
      <Card.Title>{note.title}</Card.Title>

      <div
        className="text-truncate mb-2"
        style={{ cursor: "pointer" }}
        dangerouslySetInnerHTML={{ __html: note.content }}
      />

      {/* Timestamp */}
      <small className="text-muted d-block mb-2" style={{ fontSize: "0.8rem" }}>
        🕒 Created: {note.createdAt || "—"} <br />
        🔄 Updated: {note.updatedAt || note.createdAt || "—"}
      </small>

      <div className="d-flex justify-content-end gap-2">
        <Button variant="primary" size="sm" onClick={onEdit}>
          Edit
        </Button>
        <Button variant="danger" size="sm" onClick={() => onDelete(note.id)}>
          Delete
        </Button>
      </div>
    </Card>
  );
};

export default NoteCard;
