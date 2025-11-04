import { Card, Button } from "react-bootstrap";

const NoteCard = ({ note, onDelete, onEdit, onView }) => {
  // Prevent click on buttons from triggering the onView
  const handleCardClick = (event) => {
    if (event.target.closest("button")) return; // Ignore if the click is on a button
    onView(); // Trigger the view action
  };

  return (
    <Card className="shadow-sm p-3 h-100" onClick={handleCardClick}>
      <Card.Title>{note.title}</Card.Title>
      <div
        className="text-truncate mb-3"
        style={{ cursor: "pointer" }}
        dangerouslySetInnerHTML={{ __html: note.content }}
      />
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
