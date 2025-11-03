import { Card, Button } from "react-bootstrap";

const NoteCard = ({ note, onDelete, onEdit }) => (
  <Card className="shadow-sm p-3 h-100">
    <Card.Title>{note.title}</Card.Title>
    <Card.Text>{note.content}</Card.Text>
    <div className="d-flex justify-content-end gap-2">
      <Button
        variant="outline-primary"
        size="sm"
        onClick={() => onEdit(note)}
      >
        Edit
      </Button>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => onDelete(note.id)}
      >
        Delete
      </Button>
    </div>
  </Card>
);

export default NoteCard;
