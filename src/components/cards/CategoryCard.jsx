import { Card, Button } from "react-bootstrap";

const CategoryCard = ({ category, onDelete, onEdit, onClick }) => (
  <Card
    className="shadow-sm p-3 h-100 hover-card"
    style={{ cursor: "pointer", transition: "0.2s" }}
    onClick={onClick}
  >
    <div className="d-flex justify-content-between align-items-center">
      <span className="fw-semibold">{category.name}</span>
      <div className="d-flex gap-2">
        <Button
          variant="outline-primary"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(category);
          }}
        >
          Edit
        </Button>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(category.id);
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  </Card>
);

export default CategoryCard;
