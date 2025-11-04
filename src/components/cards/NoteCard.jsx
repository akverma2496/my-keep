// src/components/cards/NoteCard.jsx
import { Card, Button } from "react-bootstrap";

const NoteCard = ({ note, onDelete, onEdit, onView }) => (
  <Card className="shadow-sm p-3 h-100">
    <Card.Title>{note.title}</Card.Title>
    <div
      className="text-truncate mb-3"
      style={{ cursor: "pointer" }}
      onClick={onView}
      dangerouslySetInnerHTML={{ __html: note.content }}
    />
    <div className="d-flex justify-content-end gap-2">
      <Button variant="outline-primary" size="sm" onClick={onEdit}>
        Edit
      </Button>
      <Button variant="outline-danger" size="sm" onClick={() => onDelete(note.id)}>
        Delete
      </Button>
    </div>
  </Card>
);

export default NoteCard;
